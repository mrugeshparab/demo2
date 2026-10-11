(function(){
var $=function(s){return document.querySelector(s)},P=PROJECTS,N=P.length;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var esc=function(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var safe=function(u){return /^(https?:\/\/|mailto:|assets\/|\.\.?\/)/.test(u||'')?u:''};
var okMail=/^[^\s@\[\]]+@[^\s@\[\]]+\.[^\s@\[\]]+$/.test(SITE.email);

/* ---------- fill page from config ---------- */
document.title=SITE.title;var md=document.querySelector('meta[name=description]');if(md)md.setAttribute('content',SITE.description);
$('#siteName').textContent=SITE.name;$('#role').textContent=SITE.role;$('#aboutT').textContent=SITE.about;
var icGit='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z"/></svg>',
icIn='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.82-2.06 3.75-2.06 4 0 4.75 2.63 4.75 6.05V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V21h-4z"/></svg>';
var soc='';
if(safe(SITE.github))soc+='<a href="'+esc(SITE.github)+'" aria-label="GitHub (opens in a new tab)" target="_blank" rel="noopener noreferrer">'+icGit+'</a>';
if(safe(SITE.linkedin))soc+='<a href="'+esc(SITE.linkedin)+'" aria-label="LinkedIn (opens in a new tab)" target="_blank" rel="noopener noreferrer">'+icIn+'</a>';
if(okMail)soc+='<a href="mailto:'+esc(SITE.email)+'" aria-label="Email"><span class="ms" aria-hidden="true">mail</span></a>';
$('#soc').innerHTML=soc;
$('#facts').innerHTML='<li><b>Email</b> '+esc(SITE.email)+'</li><li><b>Place</b> '+esc(SITE.location)+'</li>';
var rs=safe(SITE.resume);if(rs){var r=$('#res');r.href=rs;r.hidden=false;r.setAttribute('target','_blank');r.setAttribute('rel','noopener')}
$('#skList').innerHTML=SKILLS.map(function(s){return'<li>'+esc(s)+'</li>'}).join('');
function list(a){return a.map(function(e,i){return'<li class="row"><span class="n">0'+(i+1)+'</span><h3 class="serif rt">'+esc(e.title)+'</h3><span class="ct">'+esc(e.dates)+'</span><p>'+esc(e.org)+(e.desc?' &mdash; '+esc(e.desc):'')+'</p></li>'}).join('')}
$('#expList').innerHTML=list(EXPERIENCE);$('#eduList').innerHTML=list(EDUCATION);
var ml=$('#mailL');ml.textContent=SITE.email;if(okMail)ml.href='mailto:'+SITE.email+'?subject='+encodeURIComponent('Hello from your portfolio');else ml.removeAttribute('href');
$('#cp').innerHTML='<p>'+esc(SITE.location)+'</p>'+(SITE.phone?'<p>'+esc(SITE.phone)+'</p>':'');
$('#fName').textContent=SITE.name+"'s Portfolio";$('#fLoc').textContent=SITE.location+' \u00b7 Sketchbook';
$('#fCopy').innerHTML='&copy; '+new Date().getFullYear()+' '+esc(SITE.copyrightHolder)+'. All rights reserved.';

/* ---------- header, menu, theme ---------- */
var top=$('#top'),nav=$('#nav'),mt=$('#mt');
var sen=document.createElement('div');sen.setAttribute('aria-hidden','true');sen.style.cssText='position:absolute;top:0;left:0;width:1px;height:60px;pointer-events:none';document.body.insertBefore(sen,document.body.firstChild);
if('IntersectionObserver' in window)new IntersectionObserver(function(e){var off=!e[0].isIntersecting,b=$('#stt');top.classList.toggle('sc',off);if(b)b.classList.toggle('on',off)}).observe(sen);

/* ---------- smooth in-page navigation (no library, no wheel hijacking) ---------- */
var sraf=0;
function stopScroll(){if(sraf){cancelAnimationFrame(sraf);sraf=0}}
['wheel','touchstart','mousedown','keydown'].forEach(function(ev){addEventListener(ev,stopScroll,{passive:true})});
function scrollToY(y,done){
 stopScroll();var max=document.documentElement.scrollHeight-innerHeight;y=Math.max(0,Math.min(y,max));
 var y0=scrollY,d=y-y0;
 if(reduce||Math.abs(d)<2){scrollTo(0,y);if(done)done();return}
 var dur=Math.min(1100,Math.max(450,Math.abs(d)*.35+300)),t0=performance.now();
 function step(now){var p=Math.min(1,(now-t0)/dur),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;scrollTo(0,y0+d*e);if(p<1)sraf=requestAnimationFrame(step);else{sraf=0;if(done)done()}}
 sraf=requestAnimationFrame(step);
}
function goTo(t,push){
 var y=t.id==='journal'?0:t.getBoundingClientRect().top+scrollY-top.offsetHeight-8;
 scrollToY(y,function(){if(!t.hasAttribute('tabindex'))t.setAttribute('tabindex','-1');t.focus({preventScroll:true})});
 if(push)try{history.replaceState(null,'','#'+t.id)}catch(e){}
}
document.addEventListener('click',function(e){
 if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 var a=e.target.closest('a[href^="#"]');if(!a)return;
 var id=a.getAttribute('href').slice(1),t=id&&document.getElementById(id);if(!t)return;
 e.preventDefault();goTo(t,true);
});
function menu(o){nav.classList.toggle('open',o);mt.setAttribute('aria-expanded',o);mt.setAttribute('aria-label',o?'Close menu':'Open menu');mt.firstChild.textContent=o?'close':'menu'}
mt.onclick=function(){menu(!nav.classList.contains('open'))};
nav.addEventListener('click',function(e){if(e.target.closest('a'))menu(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){menu(false);mt.focus()}});
var th=$('#theme'),root=document.documentElement;
function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
th.setAttribute('aria-pressed',isDark());
th.onclick=function(){var d=!isDark();root.setAttribute('data-theme',d?'dark':'light');th.setAttribute('aria-pressed',d);try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}};

/* ---------- plate images: real file if it loads, labelled placeholder otherwise ---------- */
var idx=0,dir=1,busy=false,state={},cache={},phc={};
var PAL=[['#c9a86a','#8aa6a3'],['#9bb59a','#d7a07a'],['#7fa3b8','#d9b48a'],['#c98f6b','#a9b88a'],['#b5a07a','#8fa8c4'],['#d1b07e','#9a8fb0']];
function src(i){var p=P[i];return(innerWidth<700&&p.imgSm)||p.img||''}
function probe(i){
 if(state[i])return;var u=src(i);if(!safe(u)){state[i]='ph';return}
 state[i]='load';var im=new Image();im.decoding='async';
 im.onload=function(){state[i]='ok';cache[i]='url("'+u+'")';repaint()};
 im.onerror=function(){state[i]='ph';repaint()};im.src=u;
}
function placeholder(i){
 if(phc[i])return phc[i];
 var s=i*7919+13,r=function(){s=s*16807%2147483647;return s/2147483647},p=PAL[i%6],o='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 612"><rect width="1200" height="612" fill="#f6f1e6"/><g stroke="#6b6355" stroke-width="2" fill="'+p[i%2]+'" fill-opacity=".22">';
 for(var k=0;k<9;k++){var x=90+k*120+r()*30,w=70+r()*40,h=110+r()*150;o+='<rect x="'+x+'" y="'+(440-h)+'" width="'+w+'" height="'+h+'"/>'}
 o+='</g><path d="M40 442H1160" stroke="#6b6355" stroke-width="2"/><rect x="580" width="40" height="612" fill="#4a3f30" opacity=".07"/><text x="300" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="30" fill="#4a3f30">Placeholder image</text><text x="300" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#6b6355">Add '+esc(P[i].img||'assets/plate-'+(i+1)+'.webp')+'</text></svg>';
 return phc[i]='url("data:image/svg+xml;utf8,'+encodeURIComponent(o)+'")';
}
function img(i){return state[i]==='ok'?cache[i]:placeholder(i)}

/* ---------- flipbook ---------- */
var L=$('#pl'),R=$('#pr'),leaf=$('#leaf'),F=$('#ff'),B=$('#fb'),book=$('#book');
function put(el,i,pos){el.style.backgroundImage=img(i);el.style.backgroundPosition=pos}
function layout(d){
 dir=d;var c=idx,n=(idx+1)%N,p=(idx-1+N)%N;probe(c);probe(n);probe(p);
 if(d===1){put(L,c,'0 0');put(R,n,'100% 0');put(F,c,'100% 0');put(B,n,'0 0');leaf.style.left='50%';leaf.style.transformOrigin='0 50%'}
 else{put(L,p,'0 0');put(R,c,'100% 0');put(F,c,'0 0');put(B,p,'100% 0');leaf.style.left='0';leaf.style.transformOrigin='100% 50%'}
}
function repaint(){layout(dir);note()}
function rot(a){leaf.style.transform='rotateY('+(dir===1?-a:a)+'deg)'}
function turn(d,commit){
 busy=true;leaf.style.willChange='transform';leaf.classList.remove('nt');
 if(!commit){rot(0);setTimeout(function(){busy=false;leaf.classList.add('nt');leaf.style.willChange=''},reduce?0:760);return}
 rot(180);
 setTimeout(function(){leaf.classList.add('nt');idx=(idx+d+N)%N;layout(1);rot(0);busy=false;leaf.style.willChange='';refresh()},reduce?0:780);
}
function go(d){if(busy||N<2)return;layout(d);leaf.classList.add('nt');rot(0);void leaf.offsetWidth;turn(d,true)}
function note(){$('#hint').textContent=state[idx]==='ph'?'Placeholder artwork. Add your image at '+(P[idx].img||'assets/plate-'+(idx+1)+'.webp')+'.':(N<2?'':'Drag the page, or use the arrows, to turn it')}
function refresh(){
 var p=P[idx];$('#ptitle').textContent=p.title;$('#cnt').textContent=(idx+1)+' / '+N;
 $('#pdesc').textContent='Plate '+(idx+1)+' of '+N+': '+p.title+'. '+(p.category||'')+'. '+(p.alt||'');
 [].forEach.call(document.querySelectorAll('.row[data-i]'),function(r){var on=+r.getAttribute('data-i')===idx;r.classList.toggle('on',on);if(on)r.setAttribute('aria-current','true');else r.removeAttribute('aria-current')});
 note();
}
if(N<2){book.classList.add('one');[].forEach.call(document.querySelectorAll('.arr,.pager'),function(e){e.style.display='none'})}
['#prev','.pv'].forEach(function(s){$(s).onclick=function(){go(-1)}});['#next','.nx'].forEach(function(s){$(s).onclick=function(){go(1)}});
book.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
var sx=0,st=0,drag=false,ang=0,dd=1;
var pr=0;
book.addEventListener('pointerdown',function(e){if(busy||N<2)return;leaf.style.willChange='transform';drag=true;sx=e.clientX;st=e.timeStamp;ang=0;book.setPointerCapture(e.pointerId);leaf.classList.add('nt')});
book.addEventListener('pointermove',function(e){
 if(!drag)return;var dx=e.clientX-sx;if(Math.abs(dx)<4)return;
 var d=dx<0?1:-1;if(d!==dd||d!==dir){dd=d;layout(d)}
 ang=Math.min(180,Math.abs(dx)/(book.clientWidth*.6)*180);
 if(!pr)pr=requestAnimationFrame(function(){pr=0;rot(ang)});
});
function end(e){if(!drag)return;drag=false;if(pr){cancelAnimationFrame(pr);pr=0}if(ang===0){leaf.style.willChange='';return}rot(ang);var v=Math.abs(e.clientX-sx)/Math.max(1,e.timeStamp-st);turn(dd,ang>70||(v>.5&&ang>15))}
book.addEventListener('pointerup',end);book.addEventListener('pointercancel',end);

/* ---------- projects index (stays in sync with the book) ---------- */
var rows=$('#rows');
rows.innerHTML=P.map(function(p,i){
 var v=safe(p.view),c=safe(p.code),lk=(v?'<a href="'+esc(v)+'" target="_blank" rel="noopener noreferrer">View<span class="vh"> '+esc(p.title)+' (opens in a new tab)</span></a>':'')+(c?'<a href="'+esc(c)+'" target="_blank" rel="noopener noreferrer">Code<span class="vh"> for '+esc(p.title)+' (opens in a new tab)</span></a>':'');
 return'<li class="row" data-i="'+i+'"><span class="n">0'+(i+1)+'</span><button class="tt" type="button" aria-label="Show '+esc(p.title)+' in the sketchbook">'+esc(p.title)+'</button><span class="ct">'+esc(p.category)+'</span><p>'+esc(p.desc)+'</p>'+(lk?'<div class="lk">'+lk+'</div>':'')+'</li>';
}).join('');
rows.addEventListener('click',function(e){
 var b=e.target.closest('.tt');if(!b||busy)return;
 idx=+b.parentNode.getAttribute('data-i');layout(1);rot(0);refresh();
 scrollToY(0,function(){book.focus({preventScroll:true})});
});
layout(1);rot(0);leaf.classList.add('nt');refresh();
if(location.hash.length>1){var ht=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(ht)scrollTo(0,ht.id==='journal'?0:ht.getBoundingClientRect().top+scrollY-top.offsetHeight-8)}

/* ---------- reference-style animation layer ---------- */
function addScript(u,cb){var x=document.createElement('script');x.src=u;x.async=true;x.onload=cb;document.head.appendChild(x)}
/* scroll spy: highlights the current section in the nav */
var links={};[].forEach.call(document.querySelectorAll('.nav a[href^="#"]'),function(a){links[a.getAttribute('href').slice(1)]=a});
if('IntersectionObserver' in window){
 var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
  for(var k in links){links[k].classList.remove('active');links[k].removeAttribute('aria-current')}
  var a=links[e.target.id];if(a){a.classList.add('active');a.setAttribute('aria-current','true')}})},{rootMargin:'-15% 0px -74% 0px'});
 [].forEach.call(document.querySelectorAll('main section[id]'),function(x){spy.observe(x)});
}
/* third-party effects load AFTER the page is interactive (they used to block rendering) */
var LIBS=['https://cdnjs.cloudflare.com/ajax/libs/scrollReveal.js/4.0.9/scrollreveal.min.js','https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js','https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js'];
function loadLibs(cb){var n=LIBS.length;LIBS.forEach(function(u){var x=document.createElement('script');x.src=u;x.async=true;x.onload=x.onerror=function(){if(--n===0)cb()};document.head.appendChild(x)})}
function fx(){
/* optional typing line (Typed.js): set SITE.interests to enable */
if(SITE.interests&&SITE.interests.length){
 var cap=$('#role'),tl=document.createElement('span');tl.className='typedline';tl.setAttribute('aria-hidden','true');tl.innerHTML="I'm into <span id=\"typed\"></span>";
 var sr1=document.createElement('span');sr1.className='vh';sr1.textContent=" I'm into "+SITE.interests.join(', ')+'.';cap.appendChild(sr1);cap.appendChild(tl);
 if(window.Typed&&!reduce)new Typed('#typed',{strings:SITE.interests,loop:true,typeSpeed:50,backSpeed:25,backDelay:500});else $('#typed').textContent=SITE.interests[0];
}
/* reveal on scroll (ScrollReveal): slides in from the top, 80px, 1s, staggered like the reference */
if(window.ScrollReveal&&!reduce){
 var sr=ScrollReveal({origin:'top',distance:'80px',duration:1000,reset:false,cleanup:true});
 sr.reveal('.cap',{delay:200});sr.reveal('.stage',{delay:400});sr.reveal('.ptitle, .pager',{delay:500});sr.reveal('.hint',{delay:600});
 sr.reveal('h2.lab',{delay:200});
 sr.reveal('#aboutT, .facts, .res',{delay:200});sr.reveal('.bot',{delay:400});
 sr.reveal('.sk li',{interval:100});
 sr.reveal('#expList .row, #eduList .row',{interval:200});
 sr.reveal('#contact .big, #contact .mail, #contact .cp',{delay:400});
 sr.reveal('#rows .row',{interval:200,reset:false,cleanup:true});
}
/* 3D tilt on project rows (Vanilla-Tilt), fine pointers only */
if(window.VanillaTilt&&!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches)VanillaTilt.init([].slice.call(document.querySelectorAll('#rows .row')),{max:4,speed:400,perspective:1200});
}
var idle=window.requestIdleCallback||function(f){setTimeout(f,200)};
function startFx(){if(navigator.connection&&navigator.connection.saveData){fx();return}loadLibs(fx)}
if(document.readyState==='complete')idle(startFx);else addEventListener('load',function(){idle(startFx)});
/* warm the other plate images once the browser is idle so page turns never wait */
idle(function(){for(var i=0;i<N;i++)probe(i)});
/* hero particle web (tsParticles): desktop only, paused when off-screen */
var pc=null;
function particles(){
 if(!window.tsParticles)return;var ink=getComputedStyle(root).getPropertyValue('--ink').trim()||'#2b2721';
 if(pc){pc.destroy();pc=null}
 tsParticles.load('tsp',{fullScreen:{enable:false},fpsLimit:60,detectRetina:true,particles:{number:{value:70,density:{enable:true,area:900}},color:{value:ink},opacity:{value:.3},size:{value:{min:1,max:4}},links:{enable:true,distance:150,color:ink,opacity:.18,width:1},move:{enable:true,speed:2,outModes:'bounce'}},interactivity:{detectsOn:'window',events:{onHover:{enable:true,mode:'repulse'},onClick:{enable:true,mode:'push'}},modes:{repulse:{distance:140,duration:.4},push:{quantity:3}}}}).then(function(c){pc=c});
}
if(!reduce&&matchMedia('(min-width:821px) and (hover:hover)').matches&&!(navigator.connection&&navigator.connection.saveData)){
 addScript('https://cdn.jsdelivr.net/npm/tsparticles-slim@2.12.0/tsparticles.slim.bundle.min.js',function(){
  particles();
  if('IntersectionObserver' in window)new IntersectionObserver(function(e){if(!pc)return;if(e[0].isIntersecting)pc.play();else pc.pause()}).observe($('#journal'));
  th.addEventListener('click',function(){setTimeout(particles,0)});
  document.addEventListener('visibilitychange',function(){if(!pc)return;if(document.hidden)pc.pause();else pc.play()});
 });
}
})();
