import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdtemp,cp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,join,dirname,basename} from 'node:path';
import vm from 'node:vm';
import {prepare} from './prepare.mjs';

test('a repeated build is stable; replacing an image changes its URL and the release',async()=>{
  const temp=await mkdtemp(join(tmpdir(),'rigel-cache-'));
  try {
    const dist=join(temp,'dist');await cp(resolve('dist'),dist,{recursive:true});
    const before=await prepare(dist);
    assert.equal(await prepare(dist),before);
    const getAssets=async()=>{const context={window:{}};vm.runInNewContext(await readFile(join(dist,'js/asset-versions.js'),'utf8'),context);return context.window.RIGEL_ASSET_VERSIONS;};
    const oldAssets=await getAssets();
    const image=join(dist,'assets/slides/banner-rg1.webp');
    await writeFile(image,Buffer.concat([await readFile(image),Buffer.from('changed')]));
    const after=await prepare(dist);const newAssets=await getAssets();
    assert.notEqual(after,before);
    assert.notEqual(newAssets['assets/slides/banner-rg1.webp'],oldAssets['assets/slides/banner-rg1.webp']);
    assert.ok(oldAssets['assets/slides/m1-acetaminofen.webp']);
    assert.equal(newAssets['assets/slides/m1-acetaminofen.webp'],oldAssets['assets/slides/m1-acetaminofen.webp']);
    const html=await readFile(join(dist,'index.html'),'utf8');
    assert.match(html,new RegExp(`rigel-version" content="${after}`));
    assert.match(html,/js\/asset-versions\.js\?v=[a-f0-9]{16}/);
    assert.equal(await prepare(dist),after);
  } finally {
    if(dirname(temp)===tmpdir()&&basename(temp).startsWith('rigel-cache-'))await rm(temp,{recursive:true,force:true});
  }
});

const freshness=await readFile(resolve('dist/js/freshness.js'),'utf8');
async function checkRelease({current='1111111111111111',latest='2222222222222222',query='',offline=false}={}){
  let request,redirect;const timers=new Map();
  const context={window:{fetch:true},URL,AbortController,Date,document:{querySelector:()=>({content:current})},location:{href:`https://example.test/rigel-colombia.com/producto.html?slug=rg1&lang=en${query}#galeria`,replace:url=>{redirect=url;}},setTimeout:cb=>{timers.set(1,cb);return 1;},clearTimeout:id=>timers.delete(id),fetch:async(url,options)=>{request={url,options};if(offline)throw Error('offline');return {ok:true,json:async()=>({version:latest})};}};
  vm.runInNewContext(freshness,context);await new Promise(resolve=>setImmediate(resolve));
  return {request,redirect,timers};
}
test('reload checks bypass cache and a new release preserves page, language and anchor',async()=>{
  const {request,redirect,timers}=await checkRelease();
  assert.equal(request.options.cache,'no-store');
  assert.equal(new URL(request.url).pathname,'/rigel-colombia.com/site-version.json');
  assert.ok(new URL(request.url).searchParams.get('check'));
  const next=new URL(redirect);
  assert.equal(next.searchParams.get('lang'),'en');assert.equal(next.searchParams.get('slug'),'rg1');
  assert.equal(next.hash,'#galeria');assert.equal(next.searchParams.get('_v'),'2222222222222222');
  assert.equal(timers.size,0);
});
test('no reload loop, no reload when unchanged, offline, or an invalid manifest',async()=>{
  for(const options of [{latest:'1111111111111111'},{query:'&_v=2222222222222222'},{offline:true},{latest:'invalid'}]){
    const result=await checkRelease(options);assert.equal(result.redirect,undefined);assert.equal(result.timers.size,0);
  }
});
