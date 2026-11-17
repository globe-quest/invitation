(function(){
"use strict";
var W=window.WEDDING, key=document.body.dataset.event, E=W.events[key], T=window.THEMES[key];
if(!E||!T){document.body.textContent="Card not found.";return}
var V=E.venue||W.venue, reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
var esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var $=function(s,r){return (r||document).querySelector(s)};

/* ---- theme ---- */
function lum(h){var n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;return (0.299*r+0.587*g+0.114*b)/255}
var st=document.documentElement.style, fonts={Shrikhand:'"Shrikhand"',Marcellus:'"Marcellus"',Pinyon:'"Pinyon"',Rozha:'"Rozha"',GreatVibes:'"GreatVibes"',CinzelDec:'"CinzelDec"',AlexBrush:'"AlexBrush"'};
var jali="url(\"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="none" stroke="#000" stroke-width="2.2"><rect x="18" y="18" width="28" height="28"/><rect x="18" y="18" width="28" height="28" transform="rotate(45 32 32)"/><circle cx="32" cy="32" r="6"/><path d="M0 0l12 12M64 0L52 12M0 64l12-12M64 64L52 52"/></g></svg>')+"\")";
var vars={bg:T.bg,paper:T.paper,ink:T.ink,mute:T.mute,a1:T.a1,a2:T.a2,a3:T.a3,d1:T.door[0],d2:T.door[1],di:T.doorInk,c1:T.cur[0],c2:T.cur[1],
  fd:fonts[T.display],fn:fonts[T.names],ns:T.nameSize,on:lum(T.a1)>0.6?"#1c1408":"#ffffff",jali:jali};
for(var k in vars)st.setProperty("--"+k,vars[k]);
var mc=document.querySelector('meta[name=theme-color]');if(mc)mc.content=T.door[0];
st.setProperty("--hk",T.dark?T.bg:T.ink);st.setProperty("--hd",T.dark?T.paper:T.a1);if(!T.dark)document.documentElement.classList.add("lite");
if(T.display==="Rozha")document.documentElement.classList.add("rz");
if(T.night)document.documentElement.classList.add("nt");
if(T.paperArt)document.documentElement.classList.add("pp");
if(T.qawwaliArt)document.documentElement.classList.add("qw","rz");
["velvet","drape","swag"].forEach(function(c){if(T[c])document.documentElement.classList.add(c)});
st.setProperty("--heart","url(\"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 96"><path d="M50 92C20 68 4 49 4 30C4 15 16 6 28 6C38 6 46 12 50 21C54 12 62 6 72 6C84 6 96 15 96 30C96 49 80 68 50 92Z"/></svg>')+"\")");

/* ---- dates ---- */
var MON=["January","February","March","April","May","June","July","August","September","October","November","December"],DAY=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var dp=E.date.split("-").map(Number), tp=E.time.split(":").map(Number);
var start=new Date(E.date+"T"+E.time+":00+05:00");                 // Pakistan time
var wd=DAY[new Date(Date.UTC(dp[0],dp[1]-1,dp[2])).getUTCDay()];
var t12=((tp[0]+11)%12+1)+":"+String(tp[1]).padStart(2,"0")+" "+(tp[0]<12?"AM":"PM");
var longDate=wd+", "+dp[2]+" "+MON[dp[1]-1]+" "+dp[0];
var g1=W.groom.split(" ")[0], b1=W.bride.split(" ")[0];

/* ---- decorations ---- */
function hangHTML(){
  var out="";
  T.hang.forEach(function(h,li){
    for(var i=0;i<h.count;i++){
      var x=(i+0.5)/h.count, edge=Math.abs(x-0.5)*2, len=Math.round(h.min+(h.max-h.min)*Math.pow(edge,1.6)+((i*37)%17)-8);
      var c=h.colors, k1=c[i%c.length], k2=c[(i+1)%c.length], dl=(-(i*0.37)%5).toFixed(2), s="left:"+(x*100).toFixed(2)+"%;height:"+len+"px;animation-delay:"+dl+"s;";
      if(h.type==="garland"){var b=h.bead||13;out+='<div class="str g" style="'+s+'width:'+b+'px;margin-left:'+(-b/2)+'px;--b:'+b+'px;--k1:'+c[0]+';--k2:'+c[c.length>1?1:0]+';--kt:'+h.tip+'"></div>'}
      else if(h.type==="fringe"){out+='<div class="str f" style="'+s+(h.w?'width:'+h.w+'px;':'')+'margin-left:-4px;--k1:'+k1+'"></div>'}
      else{var dots="";for(var y=26+((i*13)%20);y<len;y+=38)dots+='<i style="top:'+y+'px;animation-delay:'+(-(y%7)/3).toFixed(2)+'s;--k1:'+c[(i+y)%c.length]+'"></i>';
        out+='<div class="str li" style="'+s.replace("left:"+(x*100).toFixed(2),"left:"+((x*100+ (li?4:0))).toFixed(2))+'">'+dots+'</div>'}
    }
  });
  return '<div class="hang" aria-hidden="true">'+out+'</div>';
}
function decoHTML(){
  if(T.deco==="fans"){var s=T.swatch,o="";for(var i=0;i<5;i++)o+='<i style="--f1:'+s[i%s.length]+';--f2:'+s[(i+1)%s.length]+';--f3:'+s[(i+2)%s.length]+'"></i>';return '<div class="fans" aria-hidden="true">'+o+'</div>'}
  if(T.deco==="roses")return '<div class="roses" aria-hidden="true">'+[[15,25],[82,23],[84,86],[14,89]].map(function(q){return '<i style="left:'+q[0]+'%;top:'+q[1]+'%"></i>'}).join("")+'</div>';
  if(T.deco==="arches")return '<div class="arches" aria-hidden="true"><i></i><i></i><i></i></div>';
  return "";
}
function sealSVG(){var p="",n=14,R=88,a=6;for(var i=0;i<=360;i+=2){var th=i*Math.PI/180,r=R+a*Math.cos(n*th);p+=(i?"L":"M")+(95+r*Math.cos(th)).toFixed(1)+" "+(95+r*Math.sin(th)).toFixed(1)}
  return '<svg viewBox="0 0 190 190" aria-hidden="true"><path d="'+p+'Z" fill="'+T.doorInk+'"/><circle cx="95" cy="95" r="70" fill="none" stroke="'+T.door[1]+'" stroke-width="1.2" opacity=".7"/><circle cx="95" cy="95" r="65" fill="none" stroke="'+T.door[1]+'" stroke-width=".6" stroke-dasharray="2 4" opacity=".7"/></svg>'}

function plaqueSVG(){
  var R="M100 8C112 20 128 22 140 18C150 16 160 22 162 34C164 46 176 50 184 46C190 60 186 76 178 86C190 98 190 122 178 134C186 144 190 160 184 174C176 170 164 174 162 186C160 198 150 204 140 202C128 198 112 200 100 212",
      L="C88 200 72 198 60 202C50 204 40 198 38 186C36 174 24 170 16 174C10 160 14 144 22 134C10 122 10 98 22 86C14 76 10 60 16 46C24 50 36 46 38 34C40 22 50 16 60 18C72 22 88 20 100 8Z",d=R+L,
      leaf='<path d="M0 -9C4 -5 4 1 0 6C-4 1 -4 -5 0 -9Z"/><path d="M-3 4C-9 2 -12 -2 -12 -7C-7 -6 -4 -2 -3 4Z"/><path d="M3 4C9 2 12 -2 12 -7C7 -6 4 -2 3 4Z"/>';
  return '<svg viewBox="0 0 200 220" aria-hidden="true"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBEFC8"/><stop offset=".45" stop-color="#E9C777"/><stop offset="1" stop-color="#C99A3C"/></linearGradient></defs>'+
    '<path d="'+d+'" fill="url(#pg)" stroke="#8E6B1B" stroke-width="1.2"/><path d="'+d+'" fill="none" stroke="#7A5A14" stroke-width="1.6" transform="translate(100 110) scale(.86) translate(-100 -110)"/>'+
    '<path d="'+d+'" fill="none" stroke="#7A5A14" stroke-width=".8" stroke-dasharray="1.5 3.5" transform="translate(100 110) scale(.79) translate(-100 -110)"/>'+
    '<g fill="#7A5A14"><g transform="translate(100 76)">'+leaf+'</g><g transform="translate(100 146) rotate(180)">'+leaf+'</g></g>'+
    '<text x="100" y="116" text-anchor="middle" font-family="Marcellus,serif" font-size="15" letter-spacing="2.6" fill="#5C430D">TAP TO OPEN</text></svg>'}

function swagSVG(){
  function half(flip){var g='<g'+(flip?' transform="translate(400 0) scale(-1 1)"':'')+'>'+
    '<path d="M0 0H204C196 58 104 96 0 78Z" fill="'+T.cur[0]+'"/>'+
    '<path d="M204 0C176 46 96 70 0 56M204 0C160 30 84 46 0 34M204 0C150 14 70 22 0 14" fill="none" stroke="'+T.cur[1]+'" stroke-width="2.2" opacity=".75"/>'+
    '<path d="M204 0C196 58 104 96 0 78" fill="none" stroke="#FFF8DC" stroke-width="3" stroke-dasharray="1 7" stroke-linecap="round"/></g>';return g}
  return '<svg class="val sw" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">'+half(false)+half(true)+'<circle cx="200" cy="6" r="9" fill="'+T.cur[1]+'"/><circle cx="200" cy="6" r="5" fill="#FFF8DC"/></svg>'}

/* ---- page ---- */
var heroUrl=T.heroImg?"../assets/"+T.heroImg:"";
var photoUrl=E.photo?"../assets/"+E.photo.src:"";
var dressUrl=E.dressPhoto?"../assets/"+E.dressPhoto:"";
var leadP=function(t){return /[A-Za-z]/.test(t)?'<p class="lead">'+rich(t)+'</p>':'<p class="lead urd" lang="ur" dir="rtl">'+esc(t)+'</p>'};
var rich=function(t){return esc(t).replace(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF][\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\s\u200C]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]|[\u0600-\u06FF]/g,function(m){return '<bdi class="uw" lang="ur" dir="rtl">'+m+'</bdi>'})};
var SIG=E.signatureUrdu||W.signatureUrdu||"";
var mapQ=encodeURIComponent(V.mapQuery||V.address), orn='<div class="orn" aria-hidden="true"><i></i></div>';
document.title=E.title+" | "+g1+" & "+b1;
var cimg=T.coverImg?"background-image:linear-gradient(180deg,#0008 0,#0000 22%,#0000 50%,#000c 100%),url(../assets/"+T.coverImg+")":"";
$("#app").innerHTML=
 (T.coverImg?
   '<div id="cover" class="photo" role="button" tabindex="0" aria-label="Open the invitation"><div class="door l"><i style="'+cimg+'"></i></div><div class="door r"><i style="'+cimg+'"></i></div>'+
     (E.coverNames===false?'':'<div class="ctop"><div class="who">'+esc(g1)+' &amp; '+esc(b1)+'</div></div>')+
     (T.seal==="plaque"?'<div class="seal pl">'+plaqueSVG()+'</div>':'<div class="seal u"><span class="ur gold" lang="ur">'+esc(E.sealUrdu||E.urdu)+'</span>'+(E.coverNames===false?'':'<small>'+esc(g1[0])+' &amp; '+esc(b1[0])+'</small>')+'</div>')+
     '<div class="cbot">'+(E.coverTitle===false?'':'<div class="ev">'+esc(E.title)+'</div>')+(T.seal==="plaque"?'':'<span class="tap">Tap to open</span>')+'</div></div>'
  :
   '<div id="cover" role="button" tabindex="0" aria-label="Open the invitation"><div class="door l"></div><div class="door r"></div>'+
     '<div class="ctop"><div class="ur" lang="ur">'+esc(E.urdu)+'</div><div class="who">'+esc(g1)+' &amp; '+esc(b1)+'</div></div>'+
     '<div class="seal">'+sealSVG()+'<div class="mono">'+esc(g1[0])+'<i>&amp;</i>'+esc(b1[0])+'</div></div>'+
     '<div class="cbot"><div class="ev">'+esc(E.title)+'</div><span class="tap">Tap to open</span></div></div>')+
 '<header class="hero'+(T.deco==="arches"?" arch":"")+(T.heroImg?" art":"")+'"'+(T.heroImg?' style="--heroimg:url('+heroUrl+')"':'')+'>'+hangHTML()+decoHTML()+(T.curtain?'<svg class="vc" id="vc" aria-hidden="true"></svg>':'<div class="cur l"></div><div class="cur r"></div>'+(T.swag?swagSVG():'<div class="val"></div>'))+
   '<div class="in"><div class="kick">Together with their families</div><h1 class="evt">'+esc(E.title)+'</h1><div class="ur'+(T.velvet||T.goldUrdu?" gold":"")+'" lang="ur">'+esc(E.urdu)+'</div>'+orn+
   '<p class="nm"><span>'+esc(W.groom)+'</span></p>'+(E.heroNames==="groom"?'':'<div class="amp">&amp;</div><p class="nm"><span>'+esc(W.bride)+'</span></p>')+
   (E.heroDate===false?'':'<div class="dline">'+dp[2]+" "+MON[dp[1]-1]+" "+dp[0]+'</div>')+'</div><div class="cue">Scroll</div></header>'+
 '<section class="s rv">'+leadP(E.invite)+''+orn+'</section>'+
 (E.photo?'<section class="s rv ph"><figure class="arch"><div class="fr"><img src="'+photoUrl+'" alt="'+esc(E.photo.caption||"")+'" loading="lazy"></div>'+(E.photo.caption?'<figcaption>'+esc(E.photo.caption)+'</figcaption>':'')+'</figure></section>':'')+
 '<section class="s rv" id="date"><h2>Scratch to reveal</h2><p class="sub">Rub the '+(T.scratch==="heart"?"heart":"circle")+' to see the date.</p>'+
   '<div class="scr'+(T.scratch==="heart"?" heart":"")+'" id="scr"><div class="under"><span class="m">'+MON[dp[1]-1]+'</span><span class="d">'+dp[2]+'</span><span class="m">'+wd+' '+dp[0]+'</span><span class="t">'+t12+'</span></div><canvas aria-label="Scratch area"></canvas></div>'+
   '<button class="link" id="skip">or tap here to reveal</button>'+
   '<div class="acts" id="save" hidden><a class="btn" id="gcal" target="_blank" rel="noopener">Add to Google Calendar</a><button class="btn o" id="ics">Save to phone calendar</button></div></section>'+
 '<section class="s rv"><h2>Counting down</h2><div class="cd" id="cd"></div></section>'+
 '<section class="s rv"><h2>Date and time</h2><div class="when">'+longDate+'</div><div class="sub">'+t12+' onwards</div>'+
   (E.program&&E.program.length?'<ol class="tl">'+E.program.map(function(p){return '<li><b>'+esc(p[0])+'</b><span>'+esc(p[1])+'</span></li>'}).join("")+'</ol>':"")+'</section>'+
 '<section class="s rv'+(E.dressPhoto?' dp" style="--dp:url('+dressUrl+')':'')+'"><h2>Dress code</h2><div class="when'+(/[A-Za-z]/.test(E.themeName)?'':' urd" lang="ur" dir="rtl')+'">'+esc(E.themeName)+'</div><div class="sw" aria-hidden="true">'+T.swatch.map(function(c){return '<i style="background:'+c+'"></i>'}).join("")+'</div>'+leadP(E.dress)+'</section>'+
 '<section class="s rv" id="venue"><h2>Venue</h2><div class="when">'+esc(V.name)+'</div><div class="sub">'+esc(V.address)+'</div>'+
   '<div class="map"><a class="fb" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+mapQ+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/></svg><span>'+esc(V.name)+'</span><span>Tap to open the map</span></a>'+
   '<iframe id="mapf" title="Map of the venue" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q='+mapQ+'&z=15&output=embed"></iframe></div>'+
   '<a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+mapQ+'">Open in Google Maps</a></section>'+
 '<section class="s rv" id="rsvp"><h2>RSVP</h2><div class="when">'+esc(W.hosts)+'</div><p class="sub">Please let us know if you can join us.</p>'+
   '<form id="f" novalidate><label for="rn">Your name</label><input id="rn" autocomplete="name" required>'+
   '<label>Will you attend?</label><div class="seg"><button type="button" class="on" data-a="yes">Yes, happily</button><button type="button" data-a="no">Sorry, can\'t</button></div>'+
   '<div id="gw"><label>Number of guests</label><div class="step"><button type="button" data-s="-1" aria-label="Fewer guests">&minus;</button><output id="gn">1</output><button type="button" data-s="1" aria-label="More guests">+</button></div></div>'+
   '<label for="rm">Message (optional)</label><textarea id="rm"></textarea><div class="err" id="err" role="alert"></div>'+
   '<button class="btn" type="submit">Send RSVP on WhatsApp</button></form></section>'+
 '<footer class="rv">'+orn+'<div class="nm'+(SIG?' ur gold" lang="ur':'')+'">'+(SIG?esc(SIG):esc(g1)+' &amp; '+esc(b1))+'</div><p>Looking forward to celebrating with you.</p></footer>'+
 '<nav class="pill" aria-label="Sections"><a href="#date">Date</a><a href="#venue">Venue</a><a href="#rsvp">RSVP</a></nav>'+
 (E.music?'<button class="snd" id="snd" aria-label="Turn music off" aria-pressed="true"><svg class="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9.2a4 4 0 010 5.6M18 6.8a7.4 7.4 0 010 10.4"/></svg><svg class="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg></button>':"")+
 '<canvas id="fx" aria-hidden="true"></canvas>';

/* ---- shrink long names until they fit on one line ---- */
function fit(){document.querySelectorAll(".hero .nm").forEach(function(n){var sp=n.firstElementChild;n.style.fontSize="";var s=parseFloat(getComputedStyle(n).fontSize),w=n.parentNode.clientWidth-34;while(sp.offsetWidth>w&&s>20){s-=1;n.style.fontSize=s+"px"}})}
fit();addEventListener("resize",fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);

var mf=$("#mapf");if(mf)mf.addEventListener("load",function(){mf.classList.add("ok")});

/* ---- flowing velvet curtains (drawn in SVG, folds gather to tie-backs as they open) ---- */
var VC=$("#vc"),cOpen=0,cT0=0,cSway=0;
function drawCurtains(){
  if(!VC)return;var C=T.curtain,Wd=VC.clientWidth||innerWidth,Hd=VC.clientHeight||innerHeight,half=Wd/2+2,n=10,steps=34,now=performance.now()/1000;
  var e=cOpen<.5?4*cOpen*cOpen*cOpen:1-Math.pow(-2*cOpen+2,3)/2;
  var TIE=.6,sway=cSway*Math.sin(now*1.3);
  function prof(y){var u=y/Hd,o;
    if(u<TIE){var k=u/TIE;o=.34+(.115-.34)*(k*k*(3-2*k))}else{var k2=(u-TIE)/(1-TIE);o=.115+(.27-.115)*Math.sqrt(k2)}
    return 1+(o-1)*e}
  function bx(i,y){var sc=prof(y),base=i/n*half*sc,u=y/Hd,amp=(1-e*.55)*(4+3*Math.sin(i*1.7)),wave=Math.sin(u*6.3+i*1.9+now*.9*(cSway?1:0))*amp*(i===0?0:1);
    var flare=(y>Hd*TIE?(y-Hd*TIE)/(Hd*(1-TIE)):0)*e*10*(i/n);return base+wave+flare+sway*(y/Hd)*(i/n)}
  var top=Hd*.115,pt=C.fillTop?0:top,defs='<defs><linearGradient id="vf" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="'+C.dark+'"/><stop offset=".22" stop-color="'+C.base+'"/><stop offset=".5" stop-color="'+C.light+'"/><stop offset=".72" stop-color="'+C.mid+'"/><stop offset="1" stop-color="'+C.dark+'"/></linearGradient>'+
    '<linearGradient id="vs" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".25" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>'+
    '<linearGradient id="vp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="'+C.dark+'"/><stop offset=".45" stop-color="'+C.mid+'"/><stop offset=".8" stop-color="'+C.light+'"/><stop offset="1" stop-color="'+C.base+'"/></linearGradient>'+
    '<radialGradient id="tq" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FFF6CC"/><stop offset=".5" stop-color="#E3B23C"/><stop offset="1" stop-color="#8A6210"/></radialGradient></defs>';
  function panel(flip){var g="";
    for(var i=0;i<n;i++){var L="",R="";
      for(var j=0;j<=steps;j++){var y=pt+(Hd-pt)*j/steps;L+=(j?"L":"M")+bx(i,y).toFixed(1)+" "+y.toFixed(1)}
      for(var j2=steps;j2>=0;j2--){var y2=pt+(Hd-pt)*j2/steps;R+="L"+(bx(i+1,y2)+.6).toFixed(1)+" "+y2.toFixed(1)}
      g+='<path d="'+L+R+'Z" fill="url(#vf)"/>'}
    var hem="";for(var k=0;k<=n;k++)hem+=(k?"L":"M")+bx(k,Hd).toFixed(1)+" "+(Hd-1).toFixed(1);
    g+='<path d="'+hem+'" stroke="'+C.trim+'" stroke-width="3" fill="none" opacity=".75"/>';
    var tx=bx(n,Hd*TIE),ty=Hd*TIE;
    g+='<g class="tie" style="opacity:'+Math.max(0,(e-.86)/.14).toFixed(2)+'"><path d="M-4 '+(ty-6)+'Q'+(tx*.55)+' '+(ty+9)+' '+(tx+4)+' '+(ty-2)+'" stroke="#B8862A" stroke-width="5" fill="none" stroke-linecap="round"/>'+
       '<path d="M-4 '+(ty-6)+'Q'+(tx*.55)+' '+(ty+9)+' '+(tx+4)+' '+(ty-2)+'" stroke="#FFE7A0" stroke-width="1.6" fill="none" stroke-dasharray="3 4"/>'+
       '<circle cx="'+(tx+5)+'" cy="'+(ty-1)+'" r="7" fill="url(#tq)"/><path d="M'+(tx+1)+' '+(ty+5)+'L'+(tx-3)+' '+(ty+38)+'H'+(tx+13)+'L'+(tx+9)+' '+(ty+5)+'Z" fill="url(#tq)"/>'+
       '<path d="M'+(tx-2)+' '+(ty+38)+'V'+(ty+46)+'M'+(tx+2)+' '+(ty+38)+'V'+(ty+47)+'M'+(tx+6)+' '+(ty+38)+'V'+(ty+47)+'M'+(tx+10)+' '+(ty+38)+'V'+(ty+46)+'" stroke="#C99A3C" stroke-width="1.4"/></g>';
    return '<g'+(flip?' transform="translate('+Wd+' 0) scale(-1 1)"':'')+'>'+g+'<rect x="0" y="'+pt+'" width="'+(half*prof(Hd*.5)+20)+'" height="'+(Hd-pt)+'" fill="url(#vs)"/></g>'}
  var sw="",cnt=3,ww=Wd/cnt,dep=Hd*.06,py=top*(C.fillTop?.62:.42);
  for(var q=0;q<cnt;q++){var x0=q*ww,x1=x0+ww,xm=x0+ww/2;
    sw+='<path d="M'+(x0-2)+' 0H'+(x1+2)+'V'+py+'Q'+xm+' '+(py+dep*2.1)+' '+(x0-2)+' '+py+'Z" fill="url(#vp)"/>';
    for(var f=1;f<4;f++)sw+='<path d="M'+(x0+4)+' '+(py-f*6)+'Q'+xm+' '+(py+dep*2.1-f*11)+' '+(x1-4)+' '+(py-f*6)+'" stroke="'+C.dark+'" stroke-opacity=".35" stroke-width="2" fill="none"/>';
    sw+='<path d="M'+(x0-2)+' '+py+'Q'+xm+' '+(py+dep*2.1)+' '+(x1+2)+' '+py+'" stroke="#C99A3C" stroke-width="3" fill="none"/>'+
        '<path d="M'+(x0-2)+' '+(py+3)+'Q'+xm+' '+(py+dep*2.1+3)+' '+(x1+2)+' '+(py+3)+'" stroke="#FFF1B0" stroke-width="1.2" stroke-dasharray="1 4" fill="none"/>';
    if(q)sw+='<circle cx="'+x0+'" cy="'+py+'" r="7" fill="url(#tq)"/><path d="M'+(x0-4)+' '+(py+5)+'L'+(x0-7)+' '+(py+34)+'H'+(x0+7)+'L'+(x0+4)+' '+(py+5)+'Z" fill="url(#tq)"/>'}
  sw='<g style="filter:drop-shadow(0 4px 5px rgba(60,35,0,.35))"><rect x="0" y="0" width="'+Wd+'" height="'+py+'" fill="url(#vp)"/>'+sw+'<rect x="0" y="0" width="'+Wd+'" height="5" fill="#8A6210"/></g>';
  VC.setAttribute("viewBox","0 0 "+Wd+" "+Hd);
  VC.innerHTML=defs+'<g style="filter:drop-shadow(0 6px 10px rgba(60,35,0,.35))">'+panel(false)+panel(true)+'</g>'+(C.noPelmet?'':sw);
}
function openCurtains(){if(!VC)return;if(reduce){cOpen=1;drawCurtains();return}
  setTimeout(function(){cT0=performance.now();(function step(t){cOpen=Math.max(0,Math.min(1,(t-cT0)/2600));drawCurtains();if(cOpen<1)requestAnimationFrame(step);else{cSway=1.5;idle()}})(cT0)},450)}
var lastSway=0;function idle(){if(document.hidden){setTimeout(idle,800);return}var r=VC.getBoundingClientRect();
  if(r.bottom>0){var t=performance.now();if(t-lastSway>66){lastSway=t;drawCurtains()}}requestAnimationFrame(idle)}
if(VC){drawCurtains();addEventListener("resize",drawCurtains)}

/* ---- open the card ---- */
var cover=$("#cover");document.body.classList.add("locked");
function openCard(){if(cover.classList.contains("open"))return;cover.classList.add("open");document.body.classList.add("opened");
  setTimeout(function(){document.body.classList.remove("locked")},reduce?50:1500);setTimeout(function(){cover.remove()},reduce?60:(T.coverImg?2500:1700));startAmbient();playMusic();openCurtains()}
cover.addEventListener("click",openCard);cover.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openCard()}});

/* ---- music: starts with the tap that opens the card, with a button to turn it off ---- */
var audio=null,wantMusic=true,snd=$("#snd");
function setBtn(){if(!snd)return;snd.classList.toggle("muted",!wantMusic);snd.setAttribute("aria-pressed",wantMusic?"true":"false");snd.setAttribute("aria-label",wantMusic?"Turn music off":"Turn music on")}
function playMusic(){if(!E.music)return;if(!audio){audio=new Audio("../assets/"+E.music);audio.loop=true;audio.volume=.5}
  var p=audio.play();if(p&&p.catch)p.catch(function(){wantMusic=false;setBtn()})}
if(snd)snd.addEventListener("click",function(){wantMusic=!wantMusic;setBtn();if(wantMusic)playMusic();else if(audio)audio.pause()});
document.addEventListener("visibilitychange",function(){if(!audio)return;if(document.hidden)audio.pause();else if(wantMusic&&document.body.classList.contains("opened"))playMusic()});

/* ---- reveal on scroll ---- */
if("IntersectionObserver" in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.18});
  document.querySelectorAll(".rv").forEach(function(n){io.observe(n)})}else document.querySelectorAll(".rv").forEach(function(n){n.classList.add("in")});

/* ---- effects canvas: gentle falling pieces plus a burst ---- */
var fx=$("#fx"),cx=fx.getContext("2d"),parts=[],FW=0,FH=0,raf=0,cols=T.fallColors||T.swatch;
function size(){var d=Math.min(devicePixelRatio||1,2);FW=innerWidth;FH=innerHeight;fx.width=FW*d;fx.height=FH*d;cx.setTransform(d,0,0,d,0,0)}
size();addEventListener("resize",size);
function mk(burst,x,y){var up=T.fall==="embers"&&!burst,a=Math.random()*Math.PI*2,sp=burst?4+Math.random()*9:0;
  return{x:burst?x:Math.random()*FW,y:burst?y:(up?FH+10:-10-Math.random()*FH*.3),vx:burst?Math.cos(a)*sp:(Math.random()-.5)*.5,vy:burst?Math.sin(a)*sp-4:(up?-(.3+Math.random()*.6):.5+Math.random()*.9),
    r:burst?(T.burst==="sparkle"?1.2+Math.random()*2.4:4+Math.random()*5):(T.fall==="embers"||T.fall==="sparkle"?1.5+Math.random()*2.5:5+Math.random()*5),rot:Math.random()*6,vr:(Math.random()-.5)*.12,c:cols[Math.floor(Math.random()*cols.length)],b:burst,life:burst?160:1e9,ph:Math.random()*6}}
function tick(){cx.clearRect(0,0,FW,FH);
  for(var i=parts.length-1;i>=0;i--){var p=parts[i];p.x+=p.vx+Math.sin(p.ph+=.02)*.4;p.y+=p.vy;p.rot+=p.vr;if(p.b){p.vy+=.22;p.vx*=.985;p.life--}
    var dead=p.b?(p.life<=0||p.y>FH+20):(p.y>FH+20||p.y<-FH*.4-20);if(dead){if(p.b)parts.splice(i,1);else parts[i]=mk(false);continue}
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.globalAlpha=p.b?Math.min(1,p.life/40):(T.fall==="embers"||T.fall==="sparkle"?.35+.5*Math.abs(Math.sin(p.ph*2)):.8);cx.fillStyle=p.c;
    var kind=p.b?(T.burst||"confetti"):T.fall;
    if(kind==="confetti"){cx.fillRect(-p.r,-p.r*.45,p.r*2,p.r*.9)}
    else if(kind==="petals"){cx.beginPath();cx.ellipse(0,0,p.r,p.r*.55,0,0,7);cx.fill()}
    else{cx.shadowColor=p.c;cx.shadowBlur=8;cx.beginPath();cx.arc(0,0,p.r,0,7);cx.fill()}
    cx.restore()}
  raf=parts.length?requestAnimationFrame(tick):0}
function run(){if(!raf&&!document.hidden)raf=requestAnimationFrame(tick)}
function startAmbient(){if(reduce)return;for(var i=0;i<11;i++){var p=mk(false);p.y=Math.random()*FH;parts.push(p)}run()}
function burst(x,y){if(reduce)return;for(var i=0;i<(T.burst==="sparkle"?190:130);i++)parts.push(mk(true,x,y));run()}
document.addEventListener("visibilitychange",function(){if(document.hidden){cancelAnimationFrame(raf);raf=0}else if(parts.length)run()});

/* ---- scratch to reveal ---- */
var scr=$("#scr"),cv=$("canvas",scr),c2=cv.getContext("2d"),S=250,d=Math.min(devicePixelRatio||1,2),moves=0,doneScr=false;
cv.width=cv.height=S*d;c2.scale(d,d);
(function paint(){var g=c2.createLinearGradient(0,0,S,S);g.addColorStop(0,T.a3);g.addColorStop(.5,T.a1);g.addColorStop(1,T.a3);c2.fillStyle=g;c2.fillRect(0,0,S,S);
  if(T.scratch==="heart"){for(var j=0;j<1400;j++){c2.fillStyle=j%3?"rgba(255,255,255,"+(.25+((j*7)%10)/18)+")":"rgba(60,50,0,.28)";c2.fillRect((j*131.7)%S,(j*89.3+j*j*.013)%S,1.3,1.3)}}
  c2.fillStyle="#ffffff55";for(var i=0;i<90;i++){c2.beginPath();c2.arc((i*97)%S,(i*53+i*i*7)%S,1+(i%3),0,7);c2.fill()}
  c2.fillStyle=lum(T.a1)>0.6?"#1c1408":"#fff";c2.textAlign="center";c2.font='22px "Marcellus",serif';c2.fillText("Scratch here",S/2,S/2+7)})();
function reveal(){if(doneScr)return;doneScr=true;scr.classList.add("done");$("#skip").hidden=true;$("#save").hidden=false;var r=scr.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)}
function scratch(e){var r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*S/r.width,y=(e.clientY-r.top)*S/r.height;c2.globalCompositeOperation="destination-out";c2.beginPath();c2.arc(x,y,26,0,7);c2.fill();
  if(++moves%6===0){var im=c2.getImageData(0,0,cv.width,cv.height).data,clr=0,n=0;for(var i=3;i<im.length;i+=4*40){n++;if(im[i]<40)clr++}if(clr/n>(T.scratch==="heart"?.3:.42))reveal()}}
var down=false;cv.addEventListener("pointerdown",function(e){down=true;cv.setPointerCapture(e.pointerId);scratch(e)});
cv.addEventListener("pointermove",function(e){if(down)scratch(e)});["pointerup","pointercancel"].forEach(function(n){cv.addEventListener(n,function(){down=false})});
$("#skip").addEventListener("click",reveal);

/* ---- calendar ---- */
function z(dt){return dt.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z"}
var end=new Date(start.getTime()+4*3600e3),calT=E.title+" of "+g1+" & "+b1,loc=V.name+", "+V.address;
$("#gcal").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(calT)+"&dates="+z(start)+"/"+z(end)+"&location="+encodeURIComponent(loc);
$("#ics").addEventListener("click",function(){var ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Wedding//Invite//EN","BEGIN:VEVENT","UID:"+key+"-"+E.date+"@wedding","DTSTAMP:"+z(new Date()),"DTSTART:"+z(start),"DTEND:"+z(end),"SUMMARY:"+calT,"LOCATION:"+loc.replace(/,/g,"\\,"),"END:VEVENT","END:VCALENDAR"].join("\r\n");
  var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar"}));a.download=key+".ics";document.body.appendChild(a);a.click();setTimeout(function(){a.remove()},500)});

/* ---- countdown ---- */
var cd=$("#cd");function count(){var ms=start-Date.now();if(ms<=0){cd.outerHTML='<p class="lead">'+(Date.now()<end?"The celebration has begun.":"Thank you for celebrating with us.")+'</p>';clearInterval(ci);return}
  var s=Math.floor(ms/1e3),v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60],l=["Days","Hours","Minutes","Seconds"];
  cd.innerHTML=v.map(function(n,i){return "<div><b>"+String(n).padStart(2,"0")+"</b><small>"+l[i]+"</small></div>"}).join("")}
var ci=setInterval(count,1000);count();

/* ---- RSVP ---- */
var att="yes",guests=1,f=$("#f");
f.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
  if(b.dataset.a){att=b.dataset.a;f.querySelectorAll(".seg button").forEach(function(x){x.classList.toggle("on",x===b)});$("#gw").hidden=att==="no"}
  if(b.dataset.s){guests=Math.max(1,Math.min(20,guests+(+b.dataset.s)));$("#gn").textContent=guests}});
f.addEventListener("submit",function(e){e.preventDefault();var n=$("#rn").value.trim();if(!n){$("#err").textContent="Please write your name first.";$("#rn").focus();return}$("#err").textContent="";
  var msg="RSVP for "+E.title+" of "+g1+" & "+b1+" ("+longDate+")\nName: "+n+"\nAttending: "+(att==="yes"?"Yes":"No")+(att==="yes"?"\nGuests: "+guests:"")+($("#rm").value.trim()?"\nMessage: "+$("#rm").value.trim():"");
  window.open("https://wa.me/"+(W.rsvpWhatsApp||"")+"?text="+encodeURIComponent(msg),"_blank","noopener")});
window.__card={audio:function(){return audio},start:start,longDate:longDate,t12:t12,reveal:reveal};
})();
