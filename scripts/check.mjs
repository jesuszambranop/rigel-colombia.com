import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=resolve('dist');
const context={window:{}};
vm.createContext(context);
for(const file of ['config.js','products.js'])vm.runInContext(readFileSync(join(root,'js',file),'utf8'),context);
const products=context.window.RIGEL_PRODUCTS;
assert.deepEqual(Array.from(products,p=>p.id).sort(),['m1','rcn1','rg1','s70']);
assert.equal(products.find(p=>p.id==='m1').ink,'s70');
assert.equal(products.find(p=>p.id==='rg1').ink,'rcn1');
assert.equal(products.find(p=>p.id==='s70').printer,'m1');
assert.equal(products.find(p=>p.id==='rcn1').printer,'rg1');
for(const p of products){
  for(const field of ['name','family','summary','description']){
    assert.equal(p[field].length,2,`${p.id} ${field} needs both languages`);
    assert.ok(p[field].every(s=>typeof s==='string'&&s.trim()));
  }
  for(const path of [p.image,...p.gallery,...(p.sheet||[])])assert.ok(existsSync(join(root,path)),`Missing asset: ${path}`);
  for(const [key,value] of p.specs){assert.equal(key.length,2);assert.equal(value.length,2);}
}
const htmlFiles=readdirSync(root).filter(file=>file.endsWith('.html'));
for(const file of htmlFiles){
  const html=readFileSync(join(root,file),'utf8');
  assert.match(html,/<meta name="viewport"/);
  for(const match of html.matchAll(/(?:src|href)="([^"?#]+)[^"]*"/g)){
    const path=match[1];
    if(/^(https?:|mailto:|#)/.test(path))continue;
    assert.ok(existsSync(join(root,path)),`${file}: missing ${path}`);
  }
}
for(const file of ['app.js','products.js','config.js'])new vm.Script(readFileSync(join(root,'js',file),'utf8'),{filename:file});
for(const file of readdirSync(join(root,'css')).filter(name=>name.endsWith('.css'))){
  const css=readFileSync(join(root,'css',file),'utf8');
  for(const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)){
    if(/^(https?:|data:)/.test(match[1]))continue;
    assert.ok(existsSync(resolve(root,'css',match[1])),`Missing CSS asset: ${match[1]}`);
  }
}
assert.match(context.window.RIGEL_CONFIG.email,/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
assert.ok(context.window.RIGEL_CONFIG.whatsapp===null||/^\d{10,15}$/.test(context.window.RIGEL_CONFIG.whatsapp));
console.log(`PASS: ${products.length} products, exact Colombia pairings, bilingual content, local assets, ${htmlFiles.length} HTML pages and JavaScript syntax.`);
