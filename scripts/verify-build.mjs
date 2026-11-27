import {readFile,readdir,stat} from 'node:fs/promises';
import {join,resolve,relative} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('dist');
const required=['/','/portal/docs/','/portal/learn/','/portal/tools/','/portal/architecture/','/portal/projects/','/portal/blog/','/portal/search/',...['csharp','wpf','plc','network','architecture','database'].map(x=>'/portal/docs/'+x+'/')];
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]))).flat()}
async function locate(pathname){const local=resolve(root,'.'+decodeURIComponent(pathname));if(local!==root&&!local.startsWith(root+'/'))throw Error('Path outside dist');for(const candidate of [local,join(local,'index.html'),local+'.html']){try{if((await stat(candidate)).isFile())return candidate}catch{}}throw Error('Missing route '+pathname)}
for(const route of required)await locate(route);
const pages=(await walk(root)).filter(file=>file.endsWith('.html'));
const errors=[];
for(const file of pages){const html=await readFile(file,'utf8');for(const [,href] of html.matchAll(/\bhref="([^"]+)"/g)){if(!href.startsWith('/')||href.startsWith('//'))continue;const url=new URL(href,'https://evanhan-dev.github.io');try{const target=await locate(url.pathname);if(url.hash&&target.endsWith('.html')){const anchor=decodeURIComponent(url.hash.slice(1));const body=await readFile(target,'utf8');if(![...body.matchAll(/\bid="([^"]+)"/g)].some(m=>m[1]===anchor))throw Error('Missing anchor '+url.hash)}}catch(e){errors.push(relative(root,file)+' → '+href+' : '+e.message)}}}
assert.equal(errors.length,0,errors.join('\n'));
console.log('Verified '+required.length+' required routes, '+pages.length+' HTML pages and root-relative links.');
