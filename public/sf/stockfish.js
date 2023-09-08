/*!
 * Stockfish.js 16 (c) 2023, Chess.com, LLC
 * https://github.com/nmrugg/stockfish.js
 * License: GPLv3
 *
 * Based on stockfish.wasm (c)
 * Niklas Fiekas <niklas.fiekas@backscattering.de>
 * Hiroshi Ogawa <hi.ogawa.zz@gmail.com>
 * https://github.com/niklasf/stockfish.wasm
 * https://github.com/hi-ogawa/Stockfish
 *
 * Based on Stockfish (c) T. Romstad, M. Costalba, J. Kiiski, G. Linscott and other contributors.
 * https://github.com/official-stockfish/Stockfish
 */
(function () {
var Stockfish;
function INIT_ENGINE() {

var Stockfish = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(Stockfish) {
  Stockfish = Stockfish || {};


null;var d;d||(d=typeof Stockfish !== 'undefined' ? Stockfish : {});var aa,ba;d.ready=new Promise(function(a,b){aa=a;ba=b});"undefined"===typeof XMLHttpRequest&&(global.XMLHttpRequest=function(){var a,b={open:function(c,e){a=e},send:function(){require("fs").readFile(a,function(c,e){b.readyState=4;c?(console.error(c),b.status=404,b.onerror(c)):(b.status=200,b.response=e,b.onreadystatechange(),b.onload())})}};return b});
"undefined"!==typeof global&&"[object process]"===Object.prototype.toString.call(global.process)&&"undefined"!==typeof fetch&&(fetch=null);d.postCustomMessage=function(a){if("undefined"!==typeof l)for(var b of l.xa)b.postMessage({cmd:"custom",userData:a})};d.queue=function(){var a=[],b;return{get:async function(){return 0<a.length?a.shift():await new Promise(function(c){return b=c})},put:function(c){b?(b(c),b=null):a.push(c)}}}();d.onCustomMessage=function(a){ca?da.push(a):d.queue.put(a)};
var ca,da=[];d.pauseQueue=function(){ca=!0};d.unpauseQueue=function(){var a=da;da=[];ca=!1;a.forEach(function(b){d.queue.put(b)})};d.postMessage=d.postCustomMessage;var ea=[];d.addMessageListener=function(a){ea.push(a)};d.removeMessageListener=function(a){a=ea.indexOf(a);0<=a&&ea.splice(a,1)};d.print=d.printErr=function(a){if(0===ea.length)return console.log(a);for(var b of ea)b(a)};d.terminate=function(){"undefined"!==typeof l&&l.Ra()};var fa={},m;for(m in d)d.hasOwnProperty(m)&&(fa[m]=d[m]);
var ha=[],ia="./this.program";function ja(a,b){if(a!==0)throw b;}var ka="object"===typeof window,p="function"===typeof importScripts,r="object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node,z=d.ENVIRONMENT_IS_PTHREAD||!1,A="";function la(a){return d.locateFile?d.locateFile(a,A):A+a}var ma,na,oa,pa;
if(r){A=p?require("path").dirname(A)+"/":__dirname+"/";ma=function(a,b){oa||(oa=require("fs"));pa||(pa=require("path"));a=pa.normalize(a);return oa.readFileSync(a,b?null:"utf8")};na=function(a){a=ma(a,!0);a.buffer||(a=new Uint8Array(a));assert(a.buffer);return a};1<process.argv.length&&(ia=process.argv[1].replace(/\\/g,"/"));ha=process.argv.slice(2);process.on("uncaughtException",function(a){if(!(a instanceof qa))throw a;});process.on("unhandledRejection",B);ja=function(a,b){if(ra())throw process.exitCode=
a,b;process.exit(a)};d.inspect=function(){return"[Emscripten Module object]"};var sa;try{sa=require("worker_threads")}catch(a){throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'),a;}global.Worker=sa.Worker}else if(ka||p)p?A=self.location.href:"undefined"!==typeof document&&document.currentScript&&(A=document.currentScript.src),_scriptDir&&(A=_scriptDir),0!==A.indexOf("blob:")?A=A.substr(0,A.lastIndexOf("/")+1):A="",r?(ma=function(a,
b){oa||(oa=require("fs"));pa||(pa=require("path"));a=pa.normalize(a);return oa.readFileSync(a,b?null:"utf8")},na=function(a){a=ma(a,!0);a.buffer||(a=new Uint8Array(a));assert(a.buffer);return a}):(ma=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},p&&(na=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}));r&&"undefined"===typeof performance&&(global.performance=require("perf_hooks").performance);
var ta=d.print||console.log.bind(console),E=d.printErr||console.warn.bind(console);for(m in fa)fa.hasOwnProperty(m)&&(d[m]=fa[m]);fa=null;d.arguments&&(ha=d.arguments);d.thisProgram&&(ia=d.thisProgram);d.quit&&(ja=d.quit);var ua,wa;d.wasmBinary&&(wa=d.wasmBinary);var noExitRuntime=d.noExitRuntime||!0;"object"!==typeof WebAssembly&&B("no native wasm support detected");var F,xa,ya=!1,za;function assert(a,b){a||B("Assertion failed: "+b)}
function Aa(a){var b=new TextDecoder(a);this.decode=function(c){c.buffer instanceof SharedArrayBuffer&&(c=new Uint8Array(c));return b.decode.call(b,c)}}var Ba="undefined"!==typeof TextDecoder?new Aa("utf8"):void 0;
function Ca(a,b,c){var e=b+c;for(c=b;a[c]&&!(c>=e);)++c;if(16<c-b&&a.subarray&&Ba)return Ba.decode(a.subarray(b,c));for(e="";b<c;){var g=a[b++];if(g&128){var h=a[b++]&63;if(192==(g&224))e+=String.fromCharCode((g&31)<<6|h);else{var k=a[b++]&63;g=224==(g&240)?(g&15)<<12|h<<6|k:(g&7)<<18|h<<12|k<<6|a[b++]&63;65536>g?e+=String.fromCharCode(g):(g-=65536,e+=String.fromCharCode(55296|g>>10,56320|g&1023))}}else e+=String.fromCharCode(g)}return e}function H(a){return a?Ca(I,a,void 0):""}
function K(a,b,c,e){if(0<e){e=c+e-1;for(var g=0;g<a.length;++g){var h=a.charCodeAt(g);if(55296<=h&&57343>=h){var k=a.charCodeAt(++g);h=65536+((h&1023)<<10)|k&1023}if(127>=h){if(c>=e)break;b[c++]=h}else{if(2047>=h){if(c+1>=e)break;b[c++]=192|h>>6}else{if(65535>=h){if(c+2>=e)break;b[c++]=224|h>>12}else{if(c+3>=e)break;b[c++]=240|h>>18;b[c++]=128|h>>12&63}b[c++]=128|h>>6&63}b[c++]=128|h&63}}b[c]=0}}
function Da(a){for(var b=0,c=0;c<a.length;++c){var e=a.charCodeAt(c);55296<=e&&57343>=e&&(e=65536+((e&1023)<<10)|a.charCodeAt(++c)&1023);127>=e?++b:b=2047>=e?b+2:65535>=e?b+3:b+4}return b}"undefined"!==typeof TextDecoder&&new Aa("utf-16le");function Fa(a){var b=Da(a)+1,c=Ga(b);K(a,Ha,c,b);return c}var Ia,Ha,I,L,M,P,Ja;z&&(Ia=d.buffer);var Ka=d.INITIAL_MEMORY||536870912;
if(z)F=d.wasmMemory,Ia=d.buffer;else if(d.wasmMemory)F=d.wasmMemory;else if(F=new WebAssembly.Memory({initial:Ka/65536,maximum:Ka/65536,shared:!0}),!(F.buffer instanceof SharedArrayBuffer))throw E("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),r&&console.log("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"),
Error("bad memory");F&&(Ia=F.buffer);Ka=Ia.byteLength;var Q=Ia;Ia=Q;d.HEAP8=Ha=new Int8Array(Q);d.HEAP16=new Int16Array(Q);d.HEAP32=M=new Int32Array(Q);d.HEAPU8=I=new Uint8Array(Q);d.HEAPU16=L=new Uint16Array(Q);d.HEAPU32=P=new Uint32Array(Q);d.HEAPF32=new Float32Array(Q);d.HEAPF64=Ja=new Float64Array(Q);var La=[],Ma=[],Na=[],Oa=[],R=0;function ra(){return noExitRuntime||0<R}function Pa(){var a=d.preRun.shift();La.unshift(a)}var Qa=0,Ra=null,Sa=null;
function Ta(){Qa++;d.monitorRunDependencies&&d.monitorRunDependencies(Qa)}function Ua(){Qa--;d.monitorRunDependencies&&d.monitorRunDependencies(Qa);if(0==Qa&&(null!==Ra&&(clearInterval(Ra),Ra=null),Sa)){var a=Sa;Sa=null;a()}}d.preloadedImages={};d.preloadedAudios={};function B(a){if(z)postMessage({cmd:"onAbort",arg:a});else if(d.onAbort)d.onAbort(a);E(a);ya=!0;za=1;a=new WebAssembly.RuntimeError("abort("+a+"). Build with -s ASSERTIONS=1 for more info.");ba(a);throw a;}
function Va(){return S.startsWith("data:application/octet-stream;base64,")}var S;S="stockfish-nnue-16.wasm";Va()||(S=la(S));function Wa(){var a=S;try{if(a==S&&wa)return new Uint8Array(wa);if(na)return na(a);throw"both async and sync fetching of the wasm failed";}catch(b){B(b)}}
function Xa(){return wa||!ka&&!p||"function"!==typeof fetch?Promise.resolve().then(function(){return Wa()}):fetch(S,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+S+"'";return a.arrayBuffer()}).catch(function(){return Wa()})}var Ya={};function Za(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b(d);else{var c=b.Va;"number"===typeof c?void 0===b.Da?dynCall_v.call(null,c):dynCall_vi.apply(null,[c,b.Da]):c(void 0===b.Da?null:b.Da)}}}
function $a(a,b){if(0>=a||a>Ha.length||a&1||0>b)return-28;if(0==b)return 0;2147483647<=b&&(b=Infinity);var c=Atomics.load(M,ab>>2),e=0;if(c==a&&Atomics.compareExchange(M,ab>>2,c,0)==c&&(--b,e=1,0>=b))return 1;a=Atomics.notify(M,a>>2,b);if(0<=a)return a+e;throw"Atomics.notify returned an unexpected value "+a;}d._emscripten_futex_wake=$a;
function bb(a){if(z)throw"Internal Error! cleanupThread() can only ever be called from main application thread!";if(!a)throw"Internal Error! Null pthread_ptr in cleanupThread!";var b=l.va[a];b&&(M[a+8>>2]=0,l.Ka(b.worker))}function cb(a){db(a)}d._exit=cb;function eb(a){a instanceof qa||"unwind"==a||(E("exception thrown: "+a),ja(1,a))}
var l={ya:[],xa:[],Ta:[],xb:function(){},eb:function(){l.receiveObjectTransfer=l.hb;l.threadInit=l.Ya;l.setExitStatus=l.jb},va:{},Sa:[],jb:function(a){za=a},Ra:function(){for(var a in l.va){var b=l.va[a];b&&b.worker&&l.Ka(b.worker)}l.va={};for(a=0;a<l.ya.length;++a){var c=l.ya[a];c.terminate()}l.ya=[];for(a=0;a<l.xa.length;++a)c=l.xa[a],b=c.wa,c.terminate(),l.Pa(b);l.xa=[]},Pa:function(a){a&&(a.Ba&&fb(a.Ba),a.Ba=0,a.Oa&&a.za&&fb(a.za),a.za=0,a.worker&&(a.worker.wa=null))},Ka:function(a){l.ib(function(){delete l.va[a.wa.Ba];
l.ya.push(a);l.xa.splice(l.xa.indexOf(a),1);l.Pa(a.wa);a.wa=void 0})},ib:function(a){M[gb>>2]=0;try{a()}finally{M[gb>>2]=1}},hb:function(){},Ya:function(){for(var a in l.Ta)l.Ta[a]()},fb:function(a,b){a.onmessage=function(c){var e=c.data,g=e.cmd;a.wa&&(l.$a=a.wa.Ba);if(e.targetThread&&e.targetThread!=hb()){var h=l.va[e.Cb];h?h.worker.postMessage(c.data,e.transferList):E('Internal error! Worker sent a message "'+g+'" to target pthread '+e.targetThread+", but that thread no longer exists!")}else if("processQueuedMainThreadWork"===
g)ib();else if("spawnThread"===g)jb(c.data);else if("cleanupThread"===g)bb(e.thread);else if("killThread"===g){c=e.thread;if(z)throw"Internal Error! killThread() can only ever be called from main application thread!";if(!c)throw"Internal Error! Null pthread_ptr in killThread!";M[c+8>>2]=0;e=l.va[c];delete l.va[c];e.worker.terminate();l.Pa(e);l.xa.splice(l.xa.indexOf(e.worker),1);e.worker.wa=void 0}else if("cancelThread"===g){c=e.thread;if(z)throw"Internal Error! cancelThread() can only ever be called from main application thread!";
if(!c)throw"Internal Error! Null pthread_ptr in cancelThread!";l.va[c].worker.postMessage({cmd:"cancel"})}else if("loaded"===g)a.loaded=!0,b&&b(a),a.Ea&&(a.Ea(),delete a.Ea);else if("print"===g)ta("Thread "+e.threadId+": "+e.text);else if("printErr"===g)E("Thread "+e.threadId+": "+e.text);else if("alert"===g)alert("Thread "+e.threadId+": "+e.text);else if("detachedExit"===g)l.Ka(a);else if("exitProcess"===g)try{db(e.returnCode)}catch(k){eb(k)}else if("cancelDone"===g)l.Ka(a);else if("setimmediate"===
c.data.target)a.postMessage(c.data);else if("onAbort"===g){if(d.onAbort)d.onAbort(e.arg)}else E("worker sent an unknown command "+g);l.$a=void 0};a.onerror=function(c){E("pthread sent an error! "+c.filename+":"+c.lineno+": "+c.message);throw c;};r&&(a.on("message",function(c){a.onmessage({data:c})}),a.on("error",function(c){a.onerror(c)}),a.on("detachedExit",function(){}));a.postMessage({cmd:"load",urlOrBlob:d.mainScriptUrlOrBlob||_scriptDir,wasmMemory:F,wasmModule:xa})},Za:function(){var a=la("stockfish.worker.js");
l.ya.push(new Worker(a))},bb:function(){0==l.ya.length&&(l.Za(),l.fb(l.ya[0]));return l.ya.pop()}};d.establishStackSpace=function(a,b){kb(a,b);lb(a)};d.invokeEntryPoint=function(a,b){return mb.apply(null,[a,b])};var nb;nb=r?function(){var a=process.hrtime();return 1E3*a[0]+a[1]/1E6}:z?function(){return performance.now()-d.__performance_now_clock_drift}:function(){return performance.now()};
function jb(a){if(z)throw"Internal Error! spawnThread() can only ever be called from main application thread!";var b=l.bb();if(!b)return 6;if(void 0!==b.wa)throw"Internal error!";if(!a.Ja)throw"Internal error, no pthread ptr!";l.xa.push(b);var c=a.za+a.Aa,e=l.va[a.Ja]={worker:b,za:a.za,Aa:a.Aa,Oa:a.Oa,Ba:a.Ja},g=e.Ba>>2;Atomics.store(P,g+15,a.detached);Atomics.store(P,g+19,a.Aa);Atomics.store(P,g+18,c);Atomics.store(P,g+25,a.Aa);Atomics.store(P,g+27,c);Atomics.store(P,g+28,a.detached);b.wa=e;var h=
{cmd:"run",start_routine:a.kb,arg:a.Da,threadInfoStruct:a.Ja,stackBase:a.za,stackSize:a.Aa};b.Ea=function(){h.time=performance.now();b.postMessage(h,a.pb)};b.loaded&&(b.Ea(),delete b.Ea);return 0}
function ob(a,b,c){if(0>=a||a>Ha.length||a&1)return-28;if(ka){if(Atomics.load(M,a>>2)!=b)return-6;var e=performance.now();c=e+c;for(Atomics.exchange(M,ab>>2,a);;){e=performance.now();if(e>c)return Atomics.exchange(M,ab>>2,0),-73;e=Atomics.exchange(M,ab>>2,0);if(0==e)break;ib();if(Atomics.load(M,a>>2)!=b)return-6;Atomics.exchange(M,ab>>2,a)}return 0}a=Atomics.wait(M,a>>2,b,c);if("timed-out"===a)return-73;if("not-equal"===a)return-6;if("ok"===a)return 0;throw"Atomics.wait returned an unexpected value "+
a;}function pb(){r||p||(ua||(ua={}),ua["Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"]||(ua["Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"]=1,E("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread")))}
function qb(a,b){if(!a)return E("pthread_join attempted on a null thread pointer!"),71;if(z&&hb()==a)return E("PThread "+a+" is attempting to join to itself!"),16;if(!z&&rb()==a)return E("Main thread "+a+" is attempting to join to itself!"),16;if(M[a+8>>2]!==a)return E("pthread_join attempted on thread "+a+", which does not point to a valid thread, or does not exist anymore!"),71;if(Atomics.load(P,a+60>>2))return E("Attempted to join thread "+a+", which was already detached!"),28;for(pb();;){var c=
Atomics.load(P,a>>2);if(1==c)return b&&(c=Atomics.load(P,a+88>>2),M[b>>2]=c),Atomics.store(P,a+60>>2,1),z?postMessage({cmd:"cleanupThread",thread:a}):bb(a),0;sb();z||ib();ob(a,c,z?100:1)}}var tb=[null,[],[]],ub={};function vb(a,b,c){return z?T(2,1,a,b,c):0}function wb(a,b,c){return z?T(3,1,a,b,c):0}function xb(a,b,c){if(z)return T(4,1,a,b,c)}function yb(a){if(z)return T(5,1,a);noExitRuntime=!1;R=0;db(a)}
function T(a,b){for(var c=arguments.length-2,e=zb(),g=Ga(8*c),h=g>>3,k=0;k<c;k++)Ja[h+k]=arguments[2+k];c=Ab(a,c,g,b);lb(e);return c}var Bb=[],Cb=[0,"undefined"!==typeof document?document:0,"undefined"!==typeof window?window:0];function Db(a){a=2<a?H(a):a;return Cb[a]||("undefined"!==typeof document?document.querySelector(a):void 0)}
function Eb(a,b,c){var e=Db(a);if(!e)return-4;e.Ia&&(M[e.Ia>>2]=b,M[e.Ia+4>>2]=c);if(e.Xa||!e.sb)e.Xa&&(e=e.Xa),a=!1,e.Ha&&e.Ha.Ga&&(a=e.Ha.Ga.getParameter(2978),a=0===a[0]&&0===a[1]&&a[2]===e.width&&a[3]===e.height),e.width=b,e.height=c,a&&e.Ha.Ga.viewport(0,0,b,c);else{if(e.Ia){e=M[e.Ia+8>>2];a=a?H(a):"";var g=zb(),h=Ga(12),k=0;if(a){k=Da(a)+1;var t=U(k);K(a,I,t,k);k=t}M[h>>2]=k;M[h+4>>2]=b;M[h+8>>2]=c;Fb(0,e,657457152,0,k,h);lb(g);return 1}return-4}return 0}
function Gb(a,b,c){return z?T(6,1,a,b,c):Eb(a,b,c)}function W(a,b){if(!ya)if(b)a();else try{if(a(),z&&!ra())try{z?Hb(za):db(za)}catch(c){eb(c)}}catch(c){eb(c)}}function Ib(a,b){R+=1;setTimeout(function(){--R;W(a)},b)}var Jb=[];function X(a,b){P[a>>2]=b;P[a+4>>2]=b/4294967296|0}
function Kb(a,b){try{var c=indexedDB.open("emscripten_filesystem",1)}catch(e){b(e);return}c.onupgradeneeded=function(e){e=e.target.result;e.objectStoreNames.contains("FILES")&&e.deleteObjectStore("FILES");e.createObjectStore("FILES")};c.onsuccess=function(e){a(e.target.result)};c.onerror=function(e){b(e)}}var Lb;
function Mb(a,b,c,e,g){function h(C){var D=0,w=0;C&&(w=n.response?n.response.byteLength:0,D=U(w),I.set(new Uint8Array(n.response),D));P[a+12>>2]=D;X(a+16,w)}var k=P[a+8>>2];if(k){var t=H(k),u=a+112,v=H(u);v||(v="GET");var y=P[u+52>>2],N=P[u+56>>2],J=!!P[u+60>>2],f=P[u+68>>2],q=P[u+72>>2];k=P[u+76>>2];var x=P[u+80>>2],G=P[u+84>>2];u=P[u+88>>2];var O=!!(y&1),V=!!(y&2);y=!!(y&64);f=f?H(f):void 0;q=q?H(q):void 0;var Ea=x?H(x):void 0,n=new XMLHttpRequest;n.withCredentials=J;n.open(v,t,!y,f,q);y||(n.timeout=
N);n.qb=t;n.responseType="arraybuffer";x&&n.overrideMimeType(Ea);if(k)for(;;){v=P[k>>2];if(!v)break;t=P[k+4>>2];if(!t)break;k+=8;v=H(v);t=H(t);n.setRequestHeader(v,t)}Jb.push(n);P[a+0>>2]=Jb.length;k=G&&u?I.slice(G,G+u):null;n.onload=function(C){h(O&&!V);var D=n.response?n.response.byteLength:0;X(a+24,0);D&&X(a+32,D);L[a+40>>1]=n.readyState;L[a+42>>1]=n.status;n.statusText&&K(n.statusText,I,a+44,64);200<=n.status&&300>n.status?b&&b(a,n,C):c&&c(a,n,C)};n.onerror=function(C){h(O);var D=n.status;X(a+
24,0);X(a+32,n.response?n.response.byteLength:0);L[a+40>>1]=n.readyState;L[a+42>>1]=D;c&&c(a,n,C)};n.ontimeout=function(C){c&&c(a,n,C)};n.onprogress=function(C){var D=O&&V&&n.response?n.response.byteLength:0,w=0;O&&V&&(w=U(D),I.set(new Uint8Array(n.response),w));P[a+12>>2]=w;X(a+16,D);X(a+24,C.loaded-D);X(a+32,C.total);L[a+40>>1]=n.readyState;3<=n.readyState&&0===n.status&&0<C.loaded&&(n.status=200);L[a+42>>1]=n.status;n.statusText&&K(n.statusText,I,a+44,64);e&&e(a,n,C);w&&fb(w)};n.onreadystatechange=
function(C){L[a+40>>1]=n.readyState;2<=n.readyState&&(L[a+42>>1]=n.status);g&&g(a,n,C)};try{n.send(k)}catch(C){c&&c(a,n,C)}}else c(a,0,"no url specified!")}
function Nb(a,b,c,e){var g=Lb;if(g){var h=P[a+112+64>>2];h||(h=P[a+8>>2]);var k=H(h);try{var t=g.transaction(["FILES"],"readwrite").objectStore("FILES").put(b,k);t.onsuccess=function(){L[a+40>>1]=4;L[a+42>>1]=200;K("OK",I,a+44,64);c(a,0,k)};t.onerror=function(u){L[a+40>>1]=4;L[a+42>>1]=413;K("Payload Too Large",I,a+44,64);e(a,0,u)}}catch(u){e(a,0,u)}}else e(a,0,"IndexedDB not available!")}
function Ob(a,b,c){var e=Lb;if(e){var g=P[a+112+64>>2];g||(g=P[a+8>>2]);g=H(g);try{var h=e.transaction(["FILES"],"readonly").objectStore("FILES").get(g);h.onsuccess=function(k){if(k.target.result){k=k.target.result;var t=k.byteLength||k.length,u=U(t);I.set(new Uint8Array(k),u);P[a+12>>2]=u;X(a+16,t);X(a+24,0);X(a+32,t);L[a+40>>1]=4;L[a+42>>1]=200;K("OK",I,a+44,64);b(a,0,k)}else L[a+40>>1]=4,L[a+42>>1]=404,K("Not Found",I,a+44,64),c(a,0,"no data")};h.onerror=function(k){L[a+40>>1]=4;L[a+42>>1]=404;
K("Not Found",I,a+44,64);c(a,0,k)}}catch(k){c(a,0,k)}}else c(a,0,"IndexedDB not available!")}
function Pb(a,b,c){var e=Lb;if(e){var g=P[a+112+64>>2];g||(g=P[a+8>>2]);g=H(g);try{var h=e.transaction(["FILES"],"readwrite").objectStore("FILES").delete(g);h.onsuccess=function(k){k=k.target.result;P[a+12>>2]=0;X(a+16,0);X(a+24,0);X(a+32,0);L[a+40>>1]=4;L[a+42>>1]=200;K("OK",I,a+44,64);b(a,0,k)};h.onerror=function(k){L[a+40>>1]=4;L[a+42>>1]=404;K("Not Found",I,a+44,64);c(a,0,k)}}catch(k){c(a,0,k)}}else c(a,0,"IndexedDB not available!")}
function Qb(a){var b=a.getExtension("ANGLE_instanced_arrays");b&&(a.vertexAttribDivisor=function(c,e){b.vertexAttribDivisorANGLE(c,e)},a.drawArraysInstanced=function(c,e,g,h){b.drawArraysInstancedANGLE(c,e,g,h)},a.drawElementsInstanced=function(c,e,g,h,k){b.drawElementsInstancedANGLE(c,e,g,h,k)})}
function Rb(a){var b=a.getExtension("OES_vertex_array_object");b&&(a.createVertexArray=function(){return b.createVertexArrayOES()},a.deleteVertexArray=function(c){b.deleteVertexArrayOES(c)},a.bindVertexArray=function(c){b.bindVertexArrayOES(c)},a.isVertexArray=function(c){return b.isVertexArrayOES(c)})}function Sb(a){var b=a.getExtension("WEBGL_draw_buffers");b&&(a.drawBuffers=function(c,e){b.drawBuffersWEBGL(c,e)})}
function Tb(a,b){a.Wa||(a.Wa=a.getContext,a.getContext=function(e,g){g=a.Wa(e,g);return"webgl"==e==g instanceof WebGLRenderingContext?g:null});var c=a.getContext("webgl",b);return c?Ub(c,b):0}function Ub(a,b){var c=U(8);M[c+4>>2]=hb();var e={wb:c,attributes:b,version:b.gb,Ga:a};a.canvas&&(a.canvas.Ha=e);("undefined"===typeof b.Ua||b.Ua)&&Vb(e);return c}
function Vb(a){a||(a=Wb);if(!a.cb){a.cb=!0;var b=a.Ga;Qb(b);Rb(b);Sb(b);b.tb=b.getExtension("EXT_disjoint_timer_query");b.zb=b.getExtension("WEBGL_multi_draw");(b.getSupportedExtensions()||[]).forEach(function(c){c.includes("lose_context")||c.includes("debug")||b.getExtension(c)})}}var Wb,Xb=["default","low-power","high-performance"],Yb={};
function Zb(){if(!$b){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"===typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:ia||"./this.program"},b;for(b in Yb)void 0===Yb[b]?delete a[b]:a[b]=Yb[b];var c=[];for(b in a)c.push(b+"="+a[b]);$b=c}return $b}var $b;
function ac(a,b){if(z)return T(7,1,a,b);var c=0;Zb().forEach(function(e,g){var h=b+c;g=M[a+4*g>>2]=h;for(h=0;h<e.length;++h)Ha[g++>>0]=e.charCodeAt(h);Ha[g>>0]=0;c+=e.length+1});return 0}function bc(a,b){if(z)return T(8,1,a,b);var c=Zb();M[a>>2]=c.length;var e=0;c.forEach(function(g){e+=g.length+1});M[b>>2]=e;return 0}function cc(a){return z?T(9,1,a):0}function dc(a,b,c,e){if(z)return T(10,1,a,b,c,e);a=ub.vb(a);b=ub.ub(a,b,c);M[e>>2]=b;return 0}
function ec(a,b,c,e,g){if(z)return T(11,1,a,b,c,e,g)}function fc(a,b,c,e){if(z)return T(12,1,a,b,c,e);for(var g=0,h=0;h<c;h++){for(var k=M[b+8*h>>2],t=M[b+(8*h+4)>>2],u=0;u<t;u++){var v=I[k+u],y=tb[a];0===v||10===v?((1===a?ta:E)(Ca(y,0)),y.length=0):y.push(v)}g+=t}M[e>>2]=g;return 0}function gc(a){return 0===a%4&&(0!==a%100||0===a%400)}function hc(a,b){for(var c=0,e=0;e<=b;c+=a[e++]);return c}var ic=[31,29,31,30,31,30,31,31,30,31,30,31],jc=[31,28,31,30,31,30,31,31,30,31,30,31];
function kc(a,b){for(a=new Date(a.getTime());0<b;){var c=a.getMonth(),e=(gc(a.getFullYear())?ic:jc)[c];if(b>e-a.getDate())b-=e-a.getDate()+1,a.setDate(1),11>c?a.setMonth(c+1):(a.setMonth(0),a.setFullYear(a.getFullYear()+1));else{a.setDate(a.getDate()+b);break}}return a}
function lc(a,b,c,e){function g(f,q,x){for(f="number"===typeof f?f.toString():f||"";f.length<q;)f=x[0]+f;return f}function h(f,q){return g(f,q,"0")}function k(f,q){function x(O){return 0>O?-1:0<O?1:0}var G;0===(G=x(f.getFullYear()-q.getFullYear()))&&0===(G=x(f.getMonth()-q.getMonth()))&&(G=x(f.getDate()-q.getDate()));return G}function t(f){switch(f.getDay()){case 0:return new Date(f.getFullYear()-1,11,29);case 1:return f;case 2:return new Date(f.getFullYear(),0,3);case 3:return new Date(f.getFullYear(),
0,2);case 4:return new Date(f.getFullYear(),0,1);case 5:return new Date(f.getFullYear()-1,11,31);case 6:return new Date(f.getFullYear()-1,11,30)}}function u(f){f=kc(new Date(f.W+1900,0,1),f.Na);var q=new Date(f.getFullYear()+1,0,4),x=t(new Date(f.getFullYear(),0,4));q=t(q);return 0>=k(x,f)?0>=k(q,f)?f.getFullYear()+1:f.getFullYear():f.getFullYear()-1}var v=M[e+40>>2];e={nb:M[e>>2],mb:M[e+4>>2],La:M[e+8>>2],Fa:M[e+12>>2],Ca:M[e+16>>2],W:M[e+20>>2],Ma:M[e+24>>2],Na:M[e+28>>2],Db:M[e+32>>2],lb:M[e+36>>
2],ob:v?H(v):""};c=H(c);v={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var y in v)c=c.replace(new RegExp(y,"g"),v[y]);var N="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
J="January February March April May June July August September October November December".split(" ");v={"%a":function(f){return N[f.Ma].substring(0,3)},"%A":function(f){return N[f.Ma]},"%b":function(f){return J[f.Ca].substring(0,3)},"%B":function(f){return J[f.Ca]},"%C":function(f){return h((f.W+1900)/100|0,2)},"%d":function(f){return h(f.Fa,2)},"%e":function(f){return g(f.Fa,2," ")},"%g":function(f){return u(f).toString().substring(2)},"%G":function(f){return u(f)},"%H":function(f){return h(f.La,
2)},"%I":function(f){f=f.La;0==f?f=12:12<f&&(f-=12);return h(f,2)},"%j":function(f){return h(f.Fa+hc(gc(f.W+1900)?ic:jc,f.Ca-1),3)},"%m":function(f){return h(f.Ca+1,2)},"%M":function(f){return h(f.mb,2)},"%n":function(){return"\n"},"%p":function(f){return 0<=f.La&&12>f.La?"AM":"PM"},"%S":function(f){return h(f.nb,2)},"%t":function(){return"\t"},"%u":function(f){return f.Ma||7},"%U":function(f){var q=new Date(f.W+1900,0,1),x=0===q.getDay()?q:kc(q,7-q.getDay());f=new Date(f.W+1900,f.Ca,f.Fa);return 0>
k(x,f)?h(Math.ceil((31-x.getDate()+(hc(gc(f.getFullYear())?ic:jc,f.getMonth()-1)-31)+f.getDate())/7),2):0===k(x,q)?"01":"00"},"%V":function(f){var q=new Date(f.W+1901,0,4),x=t(new Date(f.W+1900,0,4));q=t(q);var G=kc(new Date(f.W+1900,0,1),f.Na);return 0>k(G,x)?"53":0>=k(q,G)?"01":h(Math.ceil((x.getFullYear()<f.W+1900?f.Na+32-x.getDate():f.Na+1-x.getDate())/7),2)},"%w":function(f){return f.Ma},"%W":function(f){var q=new Date(f.W,0,1),x=1===q.getDay()?q:kc(q,0===q.getDay()?1:7-q.getDay()+1);f=new Date(f.W+
1900,f.Ca,f.Fa);return 0>k(x,f)?h(Math.ceil((31-x.getDate()+(hc(gc(f.getFullYear())?ic:jc,f.getMonth()-1)-31)+f.getDate())/7),2):0===k(x,q)?"01":"00"},"%y":function(f){return(f.W+1900).toString().substring(2)},"%Y":function(f){return f.W+1900},"%z":function(f){f=f.lb;var q=0<=f;f=Math.abs(f)/60;return(q?"+":"-")+String("0000"+(f/60*100+f%60)).slice(-4)},"%Z":function(f){return f.ob},"%%":function(){return"%"}};for(y in v)c.includes(y)&&(c=c.replace(new RegExp(y,"g"),v[y](e)));y=mc(c);if(y.length>
b)return 0;Ha.set(y,a);return y.length-1}function nc(a){try{a()}catch(b){B(b)}}var Y=0,Z=null,oc=0,pc=[],qc={},rc={},sc=0,tc=null,uc=[];function vc(a){var b={},c;for(c in a)(function(e){var g=a[e];b[e]="function"===typeof g?function(){pc.push(e);try{return g.apply(null,arguments)}catch(e){if(e.message.indexOf("unreachable")===-1)throw e}finally{if(!ya){var h=pc.pop();assert(h===e);Z&&1===Y&&0===pc.length&&(R+=1,Y=0,nc(d._asyncify_stop_unwind),"undefined"!==typeof Fibers&&Fibers.Eb())}}}:g})(c);return b}
function wc(){var a=U(4108),b=a+12;M[a>>2]=b;M[a+4>>2]=b+4096;b=pc[0];var c=qc[b];void 0===c&&(c=sc++,qc[b]=c,rc[c]=b);M[a+8>>2]=c;return a}function xc(){var a=d.asm[rc[M[Z+8>>2]]];--R;return a()}
function yc(a){if(!ya){if(0===Y){var b=!1,c=!1;a(function(e){if(!ya&&(oc=e||0,b=!0,c)){Y=2;nc(function(){d._asyncify_start_rewind(Z)});"undefined"!==typeof Browser&&Browser.Qa.Va&&Browser.Qa.resume();e=!1;try{var g=xc()}catch(t){g=t,e=!0}var h=!1;if(!Z){var k=tc;k&&(tc=null,(e?k.reject:k.resolve)(g),h=!0)}if(e&&!h)throw g;}});c=!0;b||(Y=1,Z=wc(),nc(function(){d._asyncify_start_unwind(Z)}),"undefined"!==typeof Browser&&Browser.Qa.Va&&Browser.Qa.pause())}else 2===Y?(Y=0,nc(d._asyncify_stop_rewind),
fb(Z),Z=null,uc.forEach(function(e){W(e)})):B("invalid state: "+Y);return oc}}function zc(a){return yc(function(b){a().then(b)})}z||(Kb(function(a){Lb=a;Ua()},function(){Lb=!1;Ua()}),"undefined"!==typeof ENVIRONMENT_IS_FETCH_WORKER&&ENVIRONMENT_IS_FETCH_WORKER||Ta());var Ac=[null,function(a,b){if(z)return T(1,1,a,b)},vb,wb,xb,yb,Gb,ac,bc,cc,dc,ec,fc];function mc(a){var b=Array(Da(a)+1);K(a,b,0,b.length);return b}
var Gc={c:function(a,b,c,e){B("Assertion failed: "+H(a)+", at: "+[b?H(b):"unknown filename",c,e?H(e):"unknown function"])},s:function(a,b){Bc(a,b)},o:function(a,b){l.Sa.push(function(){dynCall_vi.apply(null,[a,b])})},N:function(a){Cc(a,!p,1);l.Ya()},m:function(a,b,c,e){if("undefined"===typeof SharedArrayBuffer)return E("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var g=[];if(z&&0===g.length)return Dc(687865856,a,b,c,e);var h=0,k=0;if(b&&-1!=b){var t=M[b>>
2];t+=81920;h=M[b+8>>2];k=0!==M[b+12>>2]}else t=2097152;(b=0==h)?h=Ec(16,t):(h-=t,assert(0<h));a={za:h,Aa:t,Oa:b,detached:k,kb:c,Ja:a,Da:e,pb:g};return z?(a.rb="spawnThread",postMessage(a,g),0):jb(a)},J:function(){postMessage({cmd:"detachedExit"})},Q:function(){for(;0<l.Sa.length;)l.Sa.pop()()},H:function(a,b){return qb(a,b)},h:vb,y:wb,z:xb,R:function(a){delete Jb[a-1]},P:function(a,b){if(a==b)postMessage({cmd:"processQueuedMainThreadWork"});else if(z)postMessage({targetThread:a,cmd:"processThreadQueue"});
else{a=(a=l.va[a])&&a.worker;if(!a)return;a.postMessage({cmd:"processThreadQueue"})}return 1},b:function(){B()},x:function(a,b){if(0===a)a=Date.now();else if(1===a||4===a)a=nb();else return M[Fc()>>2]=28,-1;M[b>>2]=a/1E3|0;M[b+4>>2]=a%1E3*1E6|0;return 0},A:pb,l:function(){},p:yb,e:ob,d:$a,g:nb,v:function(a,b,c){I.copyWithin(a,b,b+c)},K:function(a,b,c){Bb.length=b;c>>=3;for(var e=0;e<b;e++)Bb[e]=Ja[c+e];return(0>a?Ya[-a-1]:Ac[a]).apply(null,Bb)},w:function(){B("OOM")},L:function(a,b,c){return Db(a)?
Eb(a,b,c):Gb(a,b,c)},k:function(){},t:function(){},O:function(a,b,c){R+=1;return setTimeout(function(){--R;W(function(){dynCall_vi.apply(null,[a,c])})},b)},q:function(a){yc(function(b){Ib(b,a)})},n:function(a,b,c,e,g){function h(w){Mb(w,k,v,y,u)}function k(w,Jc){Nb(w,Jc.response,function(va){--R;W(function(){q?dynCall_vi.apply(null,[q,va]):b&&b(va)},D)},function(va){--R;W(function(){q?dynCall_vi.apply(null,[q,va]):b&&b(va)},D)})}function t(w){Mb(w,N,v,y,u)}function u(w){W(function(){O?dynCall_vi.apply(null,
[O,w]):g&&g(w)},D)}function v(w){--R;W(function(){x?dynCall_vi.apply(null,[x,w]):c&&c(w)},D)}function y(w){W(function(){G?dynCall_vi.apply(null,[G,w]):e&&e(w)},D)}function N(w){--R;W(function(){q?dynCall_vi.apply(null,[q,w]):b&&b(w)},D)}R+=1;var J=a+112,f=H(J),q=P[J+36>>2],x=P[J+40>>2],G=P[J+44>>2],O=P[J+48>>2],V=P[J+52>>2],Ea=!!(V&4),n=!!(V&32),C=!!(V&16),D=!!(V&64);if("EM_IDB_STORE"===f)f=P[J+84>>2],Nb(a,I.slice(f,f+P[J+88>>2]),N,v);else if("EM_IDB_DELETE"===f)Pb(a,N,v);else if(C){if(n)return 0;
Mb(a,Ea?k:N,v,y,u)}else Ob(a,N,n?v:Ea?h:t);return a},I:function(){throw"unwind";},u:function(){return zc(async()=>{var a=await d.queue.get();const b=Da(a)+1,c=U(b);K(a,I,c,b);return c})},M:function(a,b){b>>=2;b={alpha:!!M[b],depth:!!M[b+1],stencil:!!M[b+2],antialias:!!M[b+3],premultipliedAlpha:!!M[b+4],preserveDrawingBuffer:!!M[b+5],powerPreference:Xb[M[b+6]],failIfMajorPerformanceCaveat:!!M[b+7],gb:M[b+8],yb:M[b+9],Ua:M[b+10],ab:M[b+11],Ab:M[b+12],Bb:M[b+13]};a=Db(a);return!a||b.ab?0:Tb(a,b)},F:ac,
G:bc,f:cb,i:cc,C:dc,r:ec,B:fc,a:F||d.wasmMemory,D:function(){d.pauseQueue()},E:function(a,b,c,e){return lc(a,b,c,e)},j:function(){d.unpauseQueue()}};
(function(){function a(h,k){h=h.exports;h=vc(h);d.asm=h;Ma.unshift(d.asm.S);l.Ta.push(d.asm.V);xa=k;z||Ua()}function b(h){a(h.instance,h.module)}function c(h){return Xa().then(function(k){return WebAssembly.instantiate(k,e)}).then(function(k){return k}).then(h,function(k){E("failed to asynchronously prepare wasm: "+k);B(k)})}var e={a:Gc};z||Ta();if(d.instantiateWasm)try{var g=d.instantiateWasm(e,a);return g=vc(g)}catch(h){return E("Module.instantiateWasm callback failed with error: "+h),!1}(function(){return wa||
"function"!==typeof WebAssembly.instantiateStreaming||Va()||"function"!==typeof fetch?c(b):fetch(S,{credentials:"same-origin"}).then(function(h){return WebAssembly.instantiateStreaming(h,e).then(b,function(k){E("wasm streaming compile failed: "+k);E("falling back to ArrayBuffer instantiation");return c(b)})})})().catch(ba);return{}})();d.___wasm_call_ctors=function(){return(d.___wasm_call_ctors=d.asm.S).apply(null,arguments)};
var Bc=d._main=function(){return(Bc=d._main=d.asm.T).apply(null,arguments)},fb=d._free=function(){return(fb=d._free=d.asm.U).apply(null,arguments)};d._emscripten_tls_init=function(){return(d._emscripten_tls_init=d.asm.V).apply(null,arguments)};var U=d._malloc=function(){return(U=d._malloc=d.asm.X).apply(null,arguments)};d._emscripten_current_thread_process_queued_calls=function(){return(d._emscripten_current_thread_process_queued_calls=d.asm.Y).apply(null,arguments)};
var rb=d._emscripten_main_browser_thread_id=function(){return(rb=d._emscripten_main_browser_thread_id=d.asm.Z).apply(null,arguments)},Dc=d._emscripten_sync_run_in_main_thread_4=function(){return(Dc=d._emscripten_sync_run_in_main_thread_4=d.asm._).apply(null,arguments)},ib=d._emscripten_main_thread_process_queued_calls=function(){return(ib=d._emscripten_main_thread_process_queued_calls=d.asm.$).apply(null,arguments)},Ab=d._emscripten_run_in_main_runtime_thread_js=function(){return(Ab=d._emscripten_run_in_main_runtime_thread_js=
d.asm.aa).apply(null,arguments)},Fb=d.__emscripten_call_on_thread=function(){return(Fb=d.__emscripten_call_on_thread=d.asm.ba).apply(null,arguments)},Hb=d.__emscripten_thread_exit=function(){return(Hb=d.__emscripten_thread_exit=d.asm.ca).apply(null,arguments)};d.___pthread_tsd_run_dtors=function(){return(d.___pthread_tsd_run_dtors=d.asm.da).apply(null,arguments)};
var hb=d._pthread_self=function(){return(hb=d._pthread_self=d.asm.ea).apply(null,arguments)},Cc=d.__emscripten_thread_init=function(){return(Cc=d.__emscripten_thread_init=d.asm.fa).apply(null,arguments)},sb=d._pthread_testcancel=function(){return(sb=d._pthread_testcancel=d.asm.ga).apply(null,arguments)};d._emscripten_proxy_main=function(){return(d._emscripten_proxy_main=d.asm.ha).apply(null,arguments)};
var Fc=d.___errno_location=function(){return(Fc=d.___errno_location=d.asm.ia).apply(null,arguments)},zb=d.stackSave=function(){return(zb=d.stackSave=d.asm.ja).apply(null,arguments)},lb=d.stackRestore=function(){return(lb=d.stackRestore=d.asm.ka).apply(null,arguments)},Ga=d.stackAlloc=function(){return(Ga=d.stackAlloc=d.asm.la).apply(null,arguments)},kb=d._emscripten_stack_set_limits=function(){return(kb=d._emscripten_stack_set_limits=d.asm.ma).apply(null,arguments)},Ec=d._memalign=function(){return(Ec=
d._memalign=d.asm.na).apply(null,arguments)},dynCall_vi=d.dynCall_vi=function(){return(dynCall_vi=d.dynCall_vi=d.asm.oa).apply(null,arguments)},mb=d.dynCall_ii=function(){return(mb=d.dynCall_ii=d.asm.pa).apply(null,arguments)},dynCall_v=d.dynCall_v=function(){return(dynCall_v=d.dynCall_v=d.asm.qa).apply(null,arguments)};d._asyncify_start_unwind=function(){return(d._asyncify_start_unwind=d.asm.ra).apply(null,arguments)};
d._asyncify_stop_unwind=function(){return(d._asyncify_stop_unwind=d.asm.sa).apply(null,arguments)};d._asyncify_start_rewind=function(){return(d._asyncify_start_rewind=d.asm.ta).apply(null,arguments)};d._asyncify_stop_rewind=function(){return(d._asyncify_stop_rewind=d.asm.ua).apply(null,arguments)};var gb=d.__emscripten_allow_main_runtime_queued_calls=29976,ab=d.__emscripten_main_thread_futex=1247036;d.keepRuntimeAlive=ra;d.PThread=l;d.PThread=l;d.wasmMemory=F;d.ExitStatus=qa;var Hc;
function qa(a){this.name="ExitStatus";this.message="Program terminated with exit("+a+")";this.status=a}Sa=function Ic(){Hc||Kc();Hc||(Sa=Ic)};
function Kc(a){function b(){if(!Hc&&(Hc=!0,d.calledRun=!0,!ya)){z||Za(Ma);z||Za(Na);aa(d);if(d.onRuntimeInitialized)d.onRuntimeInitialized();if(Lc){var c=a,e=d._emscripten_proxy_main;c=c||[];var g=c.length+1,h=Ga(4*(g+1));M[h>>2]=Fa(ia);for(var k=1;k<g;k++)M[(h>>2)+k]=Fa(c[k-1]);M[(h>>2)+g]=0;e(g,h)}if(!z){if(d.postRun)for("function"==typeof d.postRun&&(d.postRun=[d.postRun]);d.postRun.length;)c=d.postRun.shift(),Oa.unshift(c);Za(Oa)}}}a=a||ha;if(!(0<Qa))if(z)aa(d),z||Za(Ma),postMessage({cmd:"loaded"});
else{if(!z){if(d.preRun)for("function"==typeof d.preRun&&(d.preRun=[d.preRun]);d.preRun.length;)Pa();Za(La)}0<Qa||(d.setStatus?(d.setStatus("Running..."),setTimeout(function(){setTimeout(function(){d.setStatus("")},1);b()},1)):b())}}d.run=Kc;function db(a){za=a;if(z)throw postMessage({cmd:"exitProcess",returnCode:a}),new qa(a);ra()||l.Ra();za=a;if(!ra()){l.Ra();if(d.onExit)d.onExit(a);ya=!0}ja(a,new qa(a))}if(d.preInit)for("function"==typeof d.preInit&&(d.preInit=[d.preInit]);0<d.preInit.length;)d.preInit.pop()();
var Lc=!0;d.noInitialRun&&(Lc=!1);z&&(noExitRuntime=!1,l.eb());Kc();


  return Stockfish.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Stockfish;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return Stockfish; });
else if (typeof exports === 'object')
  exports["Stockfish"] = Stockfish;
return Stockfish;
}

if (typeof self !== "undefined" && self.location.hash.split(",")[1] === "worker" || typeof global !== "undefined" && Object.prototype.toString.call(global.process) === "[object process]" && !require("worker_threads").isMainThread) {
    (function() {
        "use strict";var Module={};if(typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string"){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",function(data){onmessage({data:data})});var nodeFS=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(f){(0,eval)(nodeFS.readFileSync(f,"utf8"))},postMessage:function(msg){parentPort.postMessage(msg)},performance:global.performance||{now:function(){return Date.now()}}})}function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=function(info,receiveInstance){var instance=new WebAssembly.Instance(Module["wasmModule"],info);receiveInstance(instance);Module["wasmModule"]=null;return instance.exports};self.onmessage=function(e){try{if(e.data.cmd==="load"){Module["wasmModule"]=e.data.wasmModule;Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;Stockfish=INIT_ENGINE();Stockfish(Module).then(function(instance){Module=instance})}else if(e.data.cmd==="run"){Module["__performance_now_clock_drift"]=performance.now()-e.data.time;Module["__emscripten_thread_init"](e.data.threadInfoStruct,/*isMainBrowserThread=*/0,/*isMainRuntimeThread=*/0);var max=e.data.stackBase;var top=e.data.stackBase+e.data.stackSize;Module["establishStackSpace"](top,max);Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInit();try{var result=Module["invokeEntryPoint"](e.data.start_routine,e.data.arg);if(Module["keepRuntimeAlive"]()){Module["PThread"].setExitStatus(result)}else{Module["__emscripten_thread_exit"](result)}}catch(ex){if(ex!="unwind"){if(ex instanceof Module["ExitStatus"]){if(Module["keepRuntimeAlive"]()){}else{Module["__emscripten_thread_exit"](ex.status)}}else{Module["__emscripten_thread_exit"](-2);throw ex}}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}/*PTHREAD_CANCELED*/postMessage({"cmd":"cancelDone"})}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="processThreadQueue"){if(Module["_pthread_self"]()){Module["_emscripten_current_thread_process_queued_calls"]()}}else{err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){err("worker.js onmessage() captured an uncaught exception: "+ex);if(ex&&ex.stack)err(ex.stack);throw ex}};
//
// Patch `onmessage` to support custom message
//
const old_onmessage = self.onmessage;

const new_onmessage = (e) => {
  if (e.data.cmd === 'custom') {
    if (typeof Module['onCustomMessage'] === 'function') {
      Module['onCustomMessage'](e.data.userData);
    }
  } else {
    old_onmessage(e);
  }
}

onmessage = self.onmessage = new_onmessage;
    })();
/// Is it a web worker?
} else if (typeof onmessage !== "undefined" && (typeof window === "undefined" || typeof window.document === "undefined") || typeof global !== "undefined" && Object.prototype.toString.call(global.process) === "[object process]") {
    (function ()
    {
        var isNode = typeof global !== "undefined" && Object.prototype.toString.call(global.process) === "[object process]";
        var mod;
        var myEngine;
        var queue = [];
        var args;
        var wasmPath;
        
        function completer(line)
        {
            var completions = [
                "compiler",
                "d",
                "eval",
                "exit",
                "flip",
                "go ",
                "isready ",
                "ponderhit ",
                "position fen ",
                "position startpos",
                "position startpos moves",
                "quit",
                "setoption name Clear Hash value true",
                "setoption name Contempt value ",
                "setoption name Hash value ",
                "setoption name Minimum Thinking Time value ",
                "setoption name Move Overhead value ",
                "setoption name MultiPV value ",
                "setoption name Ponder value ",
                //"setoption name Skill Level Maximum Error value ",
                //"setoption name Skill Level Probability value ",
                "setoption name Skill Level value ",
                "setoption name Slow Mover value ",
                "setoption name Threads value ",
                "setoption name UCI_Chess960 value false",
                "setoption name UCI_Chess960 value true",
                "setoption name UCI_AnalyseMode value true",
                "setoption name UCI_AnalyseMode value false",
                "setoption name UCI_LimitStrength value true",
                "setoption name UCI_LimitStrength value false",
                "setoption name UCI_Elo value ",
                "setoption name UCI_ShowWDL value true",
                "setoption name UCI_ShowWDL value false",
                "setoption name Use NNUE value true",
                "setoption name Use NNUE value false",
                "setoption name nodestime value ",
                "setoption name EvalFile value ",
                "stop",
                "uci",
                "ucinewgame"
            ];
            var completionsMid = [
                "binc ",
                "btime ",
                "confidence ",
                "depth ",
                "infinite ",
                "mate ",
                "maxdepth ",
                "maxtime ",
                "mindepth ",
                "mintime ",
                "moves ", /// for position fen ... moves
                "movestogo ",
                "movetime ",
                "ponder ",
                "searchmoves ",
                "shallow ",
                "winc ",
                "wtime "
            ];
            
            function filter(c)
            {
                return c.indexOf(line) === 0;
            }
            
            /// This looks for completions starting at the very beginning of the line.
            /// If the user has typed nothing, it will match everything.
            var hits = completions.filter(filter);
            
            if (!hits.length) {
                /// Just get the last word.
                line = line.replace(/^.*\s/, "");
                if (line) {
                    /// Find completion mid line too.
                    hits = completionsMid.filter(filter);
                } else {
                    /// If no word has been typed, show all options.
                    hits = completionsMid;
                }
            }
            
            return [hits, line];
        }
        
        if (isNode) {
            ///NOTE: Node.js v14+ needs --experimental-wasm-threads --experimental-wasm-simd
            /// Was it called directly?
            if (require.main === module) {
                wasmPath = require("path").join(__dirname, "stockfish-nnue-16.wasm");
                mod = {
                    locateFile: function (path)
                    {
                        if (path.indexOf(".wasm") > -1) {
                            /// Set the path to the wasm binary.
                            return wasmPath;
                        } else {
                            /// Set path to worker (self + the worker hash)
                            return __filename;
                        }
                    },
                };
                Stockfish = INIT_ENGINE();
                Stockfish(mod).then(function (sf)
                {
                    myEngine = sf;
                    sf.addMessageListener(function (line)
                    {
                        console.log(line);
                    });
                    
                    if (queue.length) {
                        queue.forEach(function (line)
                        {
                            sf.postMessage(line, true);
                        });
                    }
                    queue = null;
                });
                
                require("readline").createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    completer: completer,
                    historySize: 100,
                }).on("line", function online(line)
                {
                    if (line) {
                        if (line === "quit" || line === "exit") {
                            process.exit();
                        }
                        if (myEngine) {
                            myEngine.postMessage(line, true);
                        } else {
                            queue.push(line);
                        }
                    }
                }).on("close", function onend()
                {
                    process.exit();
                }).setPrompt("");
                
            /// Is this a node module?
            } else {
                module.exports = INIT_ENGINE;
            }
        } else {
            args = self.location.hash.substr(1).split(",");
            wasmPath = decodeURIComponent(args[0] || "stockfish-nnue-16.wasm");
            mod = {
                locateFile: function (path)
                {
                    if (path.indexOf(".wasm") > -1) {
                        /// Set the path to the wasm binary.
                        return wasmPath;
                    } else {
                        /// Set path to worker (self + the worker hash)
                        return self.location.origin + self.location.pathname + "#" + wasmPath + ",worker";
                    }
                }
            };
            Stockfish = INIT_ENGINE();
            Stockfish(mod).then(function onCreate(sf)
            {
                myEngine = sf;
                sf.addMessageListener(function onMessage(line)
                {
                    postMessage(line);
                });
                
                if (queue.length) {
                    queue.forEach(function (line)
                    {
                        sf.postMessage(line, true);
                    });
                }
                queue = null;
            }).catch(function (e)
            {
                /// Sadly, Web Workers will not trigger the error event when errors occur in promises, so we need to create a new context and throw an error there.
                setTimeout(function throwError()
                {
                    throw e;
                }, 1);
            });
            
            /// Make sure that this is only added once.
            if (!onmessage) {
                onmessage = function (event)
                {
                    if (myEngine) {
                        myEngine.postMessage(event.data, true);
                    } else {
                        queue.push(event.data);
                    }
                };
            }
        }
    }());
} else {
    ///NOTE: If it's a normal browser, the client can use the engine without polluting the global scope.
    if (typeof document === "object" && document.currentScript) {
        document.currentScript._exports = INIT_ENGINE();
    } else {
        Stockfish = INIT_ENGINE();
    }
}
}());