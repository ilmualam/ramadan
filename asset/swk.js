(function(){'use strict';
const Z=[
{id:'SWK01',n:'Kuching',d:'Cat City - Ibu negeri Sarawak!',o:0},
{id:'SWK02',n:'Sibu',d:'Rajang River - Foochow Muslim communities',o:1},
{id:'SWK03',n:'Miri',d:'Oil &amp; Gas city - offshore workers 4,000+!',o:2},
{id:'SWK04',n:'Bintulu',d:'LNG capital - Shell largest LNG complex world!',o:3},
{id:'SWK05',n:'Sri Aman',d:'Longhouse Muslim - Melanau &amp; Iban communities',o:4},
{id:'SWK06',n:'Limbang',d:'Brunei border - cross-border workers!',o:5}
];
const B=[
{d:'Khamis',r:1,dt:'19 Feb',im:'05:17',bk:'18:53'},
{d:'Jumaat',r:2,dt:'20 Feb',im:'05:17',bk:'18:53'},
{d:'Sabtu',r:3,dt:'21 Feb',im:'05:17',bk:'18:53'},
{d:'Ahad',r:4,dt:'22 Feb',im:'05:17',bk:'18:53'},
{d:'Isnin',r:5,dt:'23 Feb',im:'05:17',bk:'18:53'},
{d:'Selasa',r:6,dt:'24 Feb',im:'05:16',bk:'18:52'},
{d:'Rabu',r:7,dt:'25 Feb',im:'05:16',bk:'18:52'},
{d:'Khamis',r:8,dt:'26 Feb',im:'05:16',bk:'18:52'},
{d:'Jumaat',r:9,dt:'27 Feb',im:'05:16',bk:'18:52'},
{d:'Sabtu',r:10,dt:'28 Feb',im:'05:16',bk:'18:52'},
{d:'Ahad',r:11,dt:'1 Mac',im:'05:16',bk:'18:51'},
{d:'Isnin',r:12,dt:'2 Mac',im:'05:16',bk:'18:51'},
{d:'Selasa',r:13,dt:'3 Mac',im:'05:15',bk:'18:51'},
{d:'Rabu',r:14,dt:'4 Mac',im:'05:15',bk:'18:51'},
{d:'Khamis',r:15,dt:'5 Mac',im:'05:15',bk:'18:51'},
{d:'Jumaat',r:16,dt:'6 Mac',im:'05:15',bk:'18:50'},
{d:'Sabtu',r:17,dt:'7 Mac',im:'05:15',bk:'18:50'},
{d:'Ahad',r:18,dt:'8 Mac',im:'05:14',bk:'18:50'},
{d:'Isnin',r:19,dt:'9 Mac',im:'05:14',bk:'18:50'},
{d:'Selasa',r:20,dt:'10 Mac',im:'05:14',bk:'18:50'},
{d:'Rabu',r:21,dt:'11 Mac',im:'05:14',bk:'18:49'},
{d:'Khamis',r:22,dt:'12 Mac',im:'05:14',bk:'18:49'},
{d:'Jumaat',r:23,dt:'13 Mac',im:'05:13',bk:'18:49'},
{d:'Sabtu',r:24,dt:'14 Mac',im:'05:13',bk:'18:49'},
{d:'Ahad',r:25,dt:'15 Mac',im:'05:13',bk:'18:49'},
{d:'Isnin',r:26,dt:'16 Mac',im:'05:13',bk:'18:48'},
{d:'Selasa',r:27,dt:'17 Mac',im:'05:13',bk:'18:48'},
{d:'Rabu',r:28,dt:'18 Mac',im:'05:12',bk:'18:48'},
{d:'Khamis',r:29,dt:'19 Mac',im:'05:12',bk:'18:48'},
{d:'Jumaat',r:30,dt:'20 Mac',im:'05:12',bk:'18:47'}
];
let cz=0,ct=null;
function am(t,m){const p=t.split(':');let h=parseInt(p[0]),mn=parseInt(p[1]);mn+=m;if(mn>=60){h+=Math.floor(mn/60);mn%=60;}if(mn<0){h--;mn+=60;}return String(h).padStart(2,'0')+':'+String(mn).padStart(2,'0');}
function gd(zi){const o=Z[zi].o;return B.map(r=>({...r,im:am(r.im,-Math.floor(o*0.4)),bk:am(r.bk,o)}));}
function rt(){
const tb=document.getElementById('ilmxSwkTbody'),data=gd(cz),today=new Date();
document.getElementById('ilmxSwkTh2').textContent='Imsak '+Z[cz].id;
document.getElementById('ilmxSwkTH2').textContent='Berbuka '+Z[cz].id;
let h='';
data.forEach((r,i)=>{const d=new Date(2026,1,19+i),isT=d.toDateString()===today.toDateString();h+=`<tr${isT?' class="today"':''}><td>${r.d}</td><td>${r.r} Ramadan</td><td>${r.dt} 2026</td><td class="tc">${r.im}</td><td class="tc">${r.bk}</td></tr>`;});
tb.innerHTML=h;
}
function uc(){
const today=new Date(),rs=new Date(2026,1,19),diff=Math.floor((today-rs)/864e5);
if(diff<0||diff>=30){document.getElementById('ilmxSwkToday').innerHTML='<strong>Ramadan 2026 bermula 19 Feb!</strong>';ct=null;return;}
const data=gd(cz),row=data[diff],bp=row.bk.split(':');
ct=new Date(today.getFullYear(),today.getMonth(),today.getDate(),parseInt(bp[0]),parseInt(bp[1]),0);
document.getElementById('ilmxSwkToday').innerHTML='<strong>Hari ini ('+row.r+' Ramadan) - '+Z[cz].id+':</strong> Imsak '+row.im+' | Berbuka '+row.bk;
}
function tick(){
if(!ct)return;
const d=ct-new Date();
if(d<0){document.getElementById('ilmxSwkH').textContent=document.getElementById('ilmxSwkM').textContent=document.getElementById('ilmxSwkS').textContent='00';return;}
document.getElementById('ilmxSwkH').textContent=String(Math.floor(d/36e5)).padStart(2,'0');
document.getElementById('ilmxSwkM').textContent=String(Math.floor(d%36e5/6e4)).padStart(2,'0');
document.getElementById('ilmxSwkS').textContent=String(Math.floor(d%6e4/1e3)).padStart(2,'0');
}
window.ilmxSwk=function(idx){
cz=idx;
document.querySelectorAll('.ilmx-swk-zone-btn').forEach((b,i)=>b.classList.toggle('active',i===idx));
const z=Z[idx];
document.getElementById('ilmxSwkZN').textContent=z.id+' '+z.n;
document.getElementById('ilmxSwkInfo').innerHTML='✅ <strong>'+z.id+':</strong> '+z.d;
rt();uc();
};
document.addEventListener('DOMContentLoaded',()=>{rt();uc();setInterval(tick,1000);});
})();
