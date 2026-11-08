const input=document.getElementById('fileInput'), library=document.getElementById('library'), toast=document.getElementById('toast');
const DB='raiden-ipa-library-v1';
function notify(s){toast.textContent=s;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400)}
function openPicker(){input.click()}
document.getElementById('importHero').onclick=openPicker;document.getElementById('importBtn').onclick=openPicker;
function dbOpen(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore('apps',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function allApps(){const db=await dbOpen();return new Promise((res,rej)=>{const r=db.transaction('apps').objectStore('apps').getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function saveApp(a){const db=await dbOpen();return new Promise((res,rej)=>{const r=db.transaction('apps','readwrite').objectStore('apps').put(a);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
async function deleteApp(id){const db=await dbOpen();return new Promise((res,rej)=>{const r=db.transaction('apps','readwrite').objectStore('apps').delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
function fmt(n){return n<1024*1024?(n/1024).toFixed(0)+' KB':(n/1024/1024).toFixed(1)+' MB'}
async function render(){const apps=await allApps();document.getElementById('appCount').textContent=apps.length;document.getElementById('totalSize').textContent=fmt(apps.reduce((s,a)=>s+a.size,0));if(!apps.length){library.innerHTML='<div class="empty"><div class="empty-icon">⇧</div><b>Noch keine Apps</b><p>Importiere eine IPA-Datei aus der Dateien-App. Sie bleibt in dieser Web-App-Bibliothek auf diesem Gerät.</p></div>';return}
library.innerHTML='';apps.sort((a,b)=>b.added-a.added).forEach(a=>{const el=document.createElement('div');el.className='app-item';el.innerHTML='<div class="app-icon">▣</div><div class="app-meta"><b></b><small></small></div><div class="app-actions"><button>Teilen</button></div>';el.querySelector('b').textContent=a.name;el.querySelector('small').textContent=fmt(a.size)+' · IPA-Datei';el.querySelector('button').onclick=()=>shareApp(a);library.appendChild(el)})}
async function shareApp(a){try{const file=new File([a.blob],a.name,{type:'application/octet-stream'});if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:a.name});}else{const u=URL.createObjectURL(a.blob);const link=document.createElement('a');link.href=u;link.download=a.name;link.click();setTimeout(()=>URL.revokeObjectURL(u),30000);notify('Datei wird bereitgestellt.')}}catch(e){if(e.name!=='AbortError')notify('Teilen auf diesem Gerät nicht verfügbar.')}}
input.addEventListener('change',async e=>{for(const f of [...e.target.files]){if(!/\.(ipa|tipa)$/i.test(f.name)){notify('Bitte eine .ipa- oder .tipa-Datei wählen.');continue}try{await saveApp({id:crypto.randomUUID(),name:f.name,size:f.size,blob:f,added:Date.now()})}catch(err){notify('Speicher voll oder Datei zu groß.');break}}input.value='';await render();notify('Import abgeschlossen.')});
document.getElementById('libraryTab').onclick=()=>document.querySelector('.section-head:nth-of-type(3)').scrollIntoView({behavior:'smooth'});
document.getElementById('signTab').onclick=()=>document.querySelector('.sign-card').scrollIntoView({behavior:'smooth'});
document.getElementById('settingsBtn').onclick=()=>notify('Setup: Safari → Teilen → Zum Home-Bildschirm.');
document.getElementById('settingsTab').onclick=()=>notify('Setup: Safari → Teilen → Zum Home-Bildschirm.');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
