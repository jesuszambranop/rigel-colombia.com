import {readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,join,relative,posix} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const digest = content => createHash('sha256').update(content).digest('hex').slice(0,16);
async function filesAt(directory) {
  const entries = await readdir(directory,{withFileTypes:true});
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? filesAt(join(directory,entry.name)) : [join(directory,entry.name)]))).flat().sort();
}
export async function prepare(root = resolve('dist')) {
  const assets = {};
  for (const file of await filesAt(join(root,'assets'))) assets[relative(root,file).replaceAll('\\','/')] = digest(await readFile(file));
  await writeFile(join(root,'js/asset-versions.js'),`window.RIGEL_ASSET_VERSIONS=${JSON.stringify(assets)};\n`);
  for (const file of await filesAt(join(root,'css'))) {
    const css = (await readFile(file,'utf8')).replace(/url\((['"]?)(\.\.\/assets\/[^)'"?]+)(?:\?v=[^)'"\s]+)?\1\)/g,(match,quote,path) => {
      const version = assets[path.slice(3)];
      return version ? `url(${quote}${path}?v=${version}${quote})` : match;
    });
    await writeFile(file,css);
  }
  const htmlFiles = (await readdir(root)).filter(name=>name.endsWith('.html'));
  for (const name of htmlFiles) {
    const file = join(root,name);
    let html = await readFile(file,'utf8');
    if (!html.includes('name="rigel-version"')) html = html.replace('<meta name="viewport"', '<meta name="rigel-version" content="0000000000000000"><meta name="viewport"');
    if (!html.includes('js/freshness.js')) html = html.includes('</head>') ? html.replace('</head>', '<script defer src="js/freshness.js"></script>\n</head>') : html+'\n<script defer src="js/freshness.js"></script>\n';
    if (html.includes('js/app.js') && !html.includes('js/asset-versions.js')) html = html.replace(/(<script defer src="js\/app\.js[^>]*><\/script>)/, '<script defer src="js/asset-versions.js"></script>\n  $1');
    html = await replaceReferences(html, root);
    await writeFile(file,html);
  }
  const releaseHash = createHash('sha256');
  for (const file of await filesAt(root)) {
    if (file === join(root,'site-version.json')) continue;
    let content = await readFile(file);
    if (file.endsWith('.html')) content = Buffer.from(content.toString().replace(/(name="rigel-version" content=")[^"]+/, '$1VERSION'));
    releaseHash.update(relative(root,file).replaceAll('\\','/')).update('\0').update(content).update('\0');
  }
  const version = releaseHash.digest('hex').slice(0,16);
  for (const name of htmlFiles) {
    const file = join(root,name);
    await writeFile(file,(await readFile(file,'utf8')).replace(/(name="rigel-version" content=")[^"]+/, '$1'+version));
  }
  await writeFile(join(root,'site-version.json'),JSON.stringify({version})+'\n');
  return version;
}
async function replaceReferences(html,root) {
  const matches = [...html.matchAll(/(?:src|href)="((?:assets|js|css)\/[^"?#]+)(?:\?[^"#]*)?"/g)];
  for (const match of matches) {
    const version = digest(await readFile(join(root,...posix.normalize(match[1]).split('/'))));
    html = html.replace(match[0],match[0].split('=')[0]+`="${match[1]}?v=${version}"`);
  }
  return html;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log('Release prepared:',await prepare());
