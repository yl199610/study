function sdnClick(a,b){if(b=b||!0)try{setTimeout(function(){(new Image).src="http://sdn.kugou.com/link.aspx?id="+a+"&url=&t="+Math.random()},0)}catch(c){}else try{(new Image).src="http://sdn.kugou.com/link.aspx?id="+a+"&url=&t="+Math.random()}catch(c){}}function logClick(a,b){if(b=b||!0)try{setTimeout(function(){(new Image).src="http://log.kugou.com/get/?t=2&v=1&sub=&ex=&md5=&id="+a+"&d="+Math.random()},0)}catch(c){}else try{(new Image).src="http://log.kugou.com/get/?t=2&v=1&sub=&ex=&md5=&id="+a+"&d="+Math.random()}catch(c){}}function phpLogClick(a,b){if(b=b||!0)try{setTimeout(function(){(new Image).src="http://tj.kugou.com/front/link.php?id="+a+"&d="+Math.random()},0)}catch(c){}else try{(new Image).src="http://tj.kugou.com/front/link.php?id="+a+"&d="+Math.random()}catch(c){}}function kgStatistics(a){var b="http://log.stat.kugou.com/statistics/statistics.html?",c="";if(a.p1&&(c+="&p1="+encodeURIComponent(a.p1)),a.p2&&(c+="&p2="+encodeURIComponent(a.p2)),a.p3&&(c+="&p3="+encodeURIComponent(a.p3)),a.p4&&(c+="&p4="+encodeURIComponent(a.p4)),a.name&&(c+="&name="+encodeURIComponent(a.name)),c+="&type="+(a.type||1),c+="&t="+(new Date).getTime(),c=c.substr(1,c.length),b+=c,a.isreturn)return b;try{setTimeout(function(){(new Image).src=b},0)}catch(d){}}try{document.execCommand("BackgroundImageCache",!1,!0)}catch(e){}String.prototype.getBytes=function(){for(var a=0,b=0,c=this.length;c>b;b++)a+=this.charCodeAt(b)>256?2:1;return a},String.prototype.replaceChar=function(){return this.replace(/&nbsp;/g,"&amp;nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},String.prototype.trim=function(){return this.replace(/^(\s|\u3000)*|(\s|\u3000)*$/g,"")},String.prototype.intercept=function(a,b){var c=this;if(c=c.trim(),c.getBytes()<a)return c;var d=0,e=0;b.length>0&&(a-=b.length);for(var f=0;f<c.length&&(d+=this.charCodeAt(f)>256?2:1,!(d>a));f++)e++;return c.substr(0,e)+b},String.prototype.encode=function(){return encodeURIComponent(encodeURIComponent(this))},Array.prototype.find&&delete Array.prototype.find;var Kg=Kg||{Ver:2,UA:{Ie:!!("ActiveXObject"in window),Ie6:!!("ActiveXObject"in window)&&/msie 6.0/gi.test(window.navigator.appVersion),Ie7:!!("ActiveXObject"in window)&&/msie 7.0/gi.test(window.navigator.appVersion),Ie8:!!("ActiveXObject"in window)&&/msie 8.0/gi.test(window.navigator.appVersion),Ie9:!!("ActiveXObject"in window)&&/msie 9.0/gi.test(window.navigator.appVersion),Ie10:!!("ActiveXObject"in window)&&/msie 10.0/gi.test(window.navigator.appVersion),FF:/firefox/gi.test(window.navigator.userAgent),Opera:/opera/gi.test(window.navigator.userAgent),Chrom:/Chrom/gi.test(window.navigator.userAgent),Maxthon:/Maxthon/gi.test(window.navigator.userAgent)},$:function(a){var b=[];if("string"==typeof a){a=a.trim();for(var c=a.split(","),d=0,e=c.length;e>d;d++)b=b.concat(Kg.$S(c[d]));Kg.extend(b,Kg,!0)}else a instanceof Array||"object"==typeof a&&a.length?(b=a,Kg.extend(b,Kg,!0)):(b.push(a),Kg.extend(b,Kg,!0));return b},$S:function(a,b){for(var c=a.split(/\s+/g),b=b||[],d=0,e=c.length;e>d;d++){var f=[];if(/^\*$/.test(c[d])){if(b.length>0)for(var g=0,h=b.length;h>g;g++)f=f.concat(this.$T("*",b[g]));else f=this.$T("*");b=f}else if(/#/.test(c[d])){var i=c[d].split("#");Kg.$I(i[1])&&f.push(Kg.$I(i[1])),b=f}else if(/\./.test(c[d])){var j=c[d].split("."),k=j[1],i=j[0];if(b.length>0)for(var g=0,h=b.length;h>g;g++)f=f.concat(this.$C(k,b[g]));else f=this.$C(k);if(i.length>0){for(var l=[],g=0,h=f.length;h>g;g++)f[g].tagName.toLowerCase()==i&&l.push(f[g]);b=l}else b=f}else{var i=c[d];if(b.length>0){for(var g=0,h=b.length;h>g;g++)f=f.concat(this.$T(i,b[g]));b=f}else b=this.$T(i)}}return b},$I:function(){for(var a=[],b=0,c=arguments.length;c>b;b++){var d=arguments[b];if("string"==typeof d&&(d=document.getElementById(d)),1==c)return d;a.push(d)}return a},$T:function(a,b){var c=(this.$I(b)||document).getElementsByTagName(a||"*");return this.$A(c)},$C:function(a,b,c){var d=[],e=0;if(document.getElementsByClassName){var f=this.$I(b||document).getElementsByClassName(a);if(f=this.$A(f),c&&"*"!==c)for(var g=f.length;g>e;e++)f[e].tagName.toLowerCase()===c.toLowerCase()&&d.push(f[e]);else d=f}else for(var f=this.$T(c,b),g=f.length;g>e;e++)new RegExp("\\b"+a+"\\b","g").test(f[e].className)&&d.push(f[e]);return d},$A:function(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c]);return b},index:function(){var a=-1;if(this.length>0){for(var b=this[0],c=[],d=b.parentNode.childNodes,e=0,f=d.length;f>e;e++)d[e].tagName==b.tagName&&c.push(d[e]);a=Kg.indexOf(c,b)}return a},attr:function(a,b){if(this.UA.Ie&&(a={"for":"htmlFor","class":"className"}[a]||a),void 0!=b){for(var c=0,d=this.length;d>c;c++)"checked"==a?this[c][a]=b:this[c].setAttribute(a,b);return this}return this[0].getAttribute(a)},addClass:function(a,b){if(b)b.className+=" "+a;else for(var c=0,d=this.length;d>c;c++)this[c].className+=" "+a;return this},removeClass:function(a,b){if(b)b.className=b.className.replace(new RegExp("\\b"+a+"\\b","g"),"");else for(var c=0,d=this.length;d>c;c++)this[c].className=this[c].className.replace(new RegExp("\\b"+a+"\\b","g"),"");return this},toggleClass:function(a){for(var b=0,c=this.length;c>b;b++){var d=this[b];this.hasClass(a,d)?this.removeClass(a,d):this.addClass(a,d)}return Kg},hasClass:function(a,b){return new RegExp("\\b"+a+"\\b").test((b||this[0]).className)},html:function(a){if(null==a)return this[0].innerHTML;for(var b=0,c=this.length;c>b;b++)this[b].innerHTML=a;return this},val:function(a){if(null==a)return this[0].value;for(var b=0,c=this.length;c>b;b++)this[b].value=a;return this},eq:function(a){var b=this[a];return this.length=0,this.push(b),this},parent:function(){for(var a=0,b=this.length;b>a;a++){var c=this[a];this[a]=c.parentNode}return this},next:function(){for(var a=0;a<this.length;a++){for(var b=this[a],c=b.nextSibling;c&&1!=c.nodeType;)c=c.nextSibling;c&&1==c.nodeType?this[a]=c:(this.splice(a,1),a--)}return this},prev:function(){for(var a=0;a<this.length;a++){for(var b=this[a],c=b.previousSibling;c&&1!=c.nodeType;)c=c.previousSibling;c&&1==c.nodeType?this[a]=c:(this.splice(a,1),a--)}return this},find:function(a){var b=Kg.$S(a,this);return Kg.extend(b,Kg),b},remove:function(){for(var a=0,b=this.length;b>a;a++){var c=this[a];c.parentNode.removeChild(c)}return this.length=0,Kg},css:function(a,b){if("string"==typeof a){if(null==b)return this.getStyle(this[0],a);for(var c=0,d=this.length;d>c;c++){var e=a.replace(/-(\w)/,function(a,b){return b.toUpperCase()});"float"===e?Kg.UA.Ie?this[c].style.styleFloat=b:this[c].style.cssFloat=b:this[c].style[e]=b}}else for(var f in a)for(var c=0,d=this.length;d>c;c++){var e=f.replace(/-(\w)/,function(a,b){return b.toUpperCase()});"float"===e?Kg.UA.Ie?this[c].style.styleFloat=a[f]:this[c].style.cssFloat=a[f]:this[c].style[e]=a[f]}return this},show:function(){return this.css("display","block"),this},hide:function(){return this.css("display","none"),this},each:function(a,b){var c=func=null;1==arguments.length?(c=this,func=a):2==arguments.length&&(c=a,func=b);for(var d=0,e=c.length;e>d;d++)func.call(c[d],d,c[d]);return this},append:function(a,b){b=b||"last";var c=null;if("string"==typeof a){var d=document.getElementById("kg_dom_tpl"),c=document.createDocumentFragment();if(!d){var d=document.createElement("div");d.id="kg_dom_tpl",d.style.cssText="position:absolute;left:-9999px",document.body.appendChild(d)}d.innerHTML=a;for(var e=d.childNodes,f=0;f<e.length;f++)(1==e[f].nodeType||3==e[f].nodeType)&&(c.appendChild(e[f]),f--)}else c=a;for(var f=0,g=this.length;g>f;f++){var h=this[f];if("last"==b)h.appendChild(c);else if("first"==b){var i=h.childNodes[0];h.insertBefore(c,i)}else if("before"==b){var j=h.parentNode;j.insertBefore(c,h)}}return this},prepend:function(a){return this.append(a,"first")},insertBefore:function(a){return this.append(a,"before")},extend:function(a,b,c){for(var d in b)c?a[d]=b[d]:a[d]||(a[d]=b[d]);return a},getStyle:function(a,b){return a=this.$I(a),"float"===b&&(b=Kg.UA.Ie?"styleFloat":"cssFloat"),b=b.replace(/-(\w)/,function(a,b){return b.toUpperCase()}),Kg.UA.Ie?a.currentStyle[b]:window.getComputedStyle(a,null)[b]},getBodySize:function(){if("BackCompat"==document.compatMode)var a=document.body.clientHeight,b=document.body.clientWidth,c=document.body.scrollHeight,d=document.body.scrollWidth,e=document.body.scrollTop,f=document.body.scrollLeft;else if("CSS1Compat"==document.compatMode)var a=document.documentElement.clientHeight,b=document.documentElement.clientWidth,c=document.documentElement.scrollHeight,d=document.documentElement.scrollWidth,e=document.body.scrollTop||document.documentElement.scrollTop,f=document.body.scrollLeft||document.documentElement.scrollLeft;return{cH:a,cW:b,sH:c,sW:d,sT:e,sL:f}},getXY:function(a){a=a?this.$I(a):this[0];var b=this.getBodySize(),c=a.getBoundingClientRect();return{left:b.sL+c.left,right:b.sL+c.right,top:b.sT+c.top,bottom:b.sT+c.bottom}},isFather:function(a,b,c){if(a=this.$I(a),b=this.$I(b),c&&a==b)return!0;if(a.compareDocumentPosition)return 20==a.compareDocumentPosition(b);for(;b&&b.parentNode;)if(b=b.parentNode,b==a)return!0;return!1},addEvent:function(a,b,c){if(3==arguments.length)a=this.$I(a),a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c;else for(var d=0,e=this.length;e>d;d++){var f=this[d];this.addEvent(f,arguments[0],Kg.bind(arguments[1],f))}return this},removeEvent:function(a,b,c){if(3==arguments.length)a=this.$I(a),a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent("on"+b,c):a["on"+b]=null;else for(var d=0,e=this.length;e>d;d++){var f=this[d];this.removeEvent(f,arguments[0],Kg.bind(arguments[1],f))}return this},bind:function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){a.apply(b,c.concat(Array.prototype.slice.call(arguments)))}},stopEvent:function(a){return a=window.event||a,a.stopPropagation?a.stopPropagation():a.cancelBubble=!0,Kg},preventDefault:function(a){return a=window.event||a,a.preventDefault?a.preventDefault():a.returnValue=!1,Kg},inArray:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return!0;return!1},indexOf:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},setOpacity:function(a,b){return a=this.$I(a),a.style.opacity=b/100,a.style.filter="Alpha(Opacity="+b+")",a},fadein:function(a,b,c,d){b=b||1,c=c||1,a=this.$I(a);var e=0,f=Kg,g=setInterval(function(){f.setOpacity(a,e+=c),e>=100&&(clearInterval(g),d&&d(a))},b);return g},fadeout:function(a,b,c,d){b=b||1,c=c||1,a=this.$I(a);var e=100,f=Kg,g=setInterval(function(){f.setOpacity(a,e-=c),0>=e&&(clearInterval(g),d&&d(a))},b);return g},slide:function(a,b,c,d,e,f,g){a=this.$I(a),e=e||.1;var h="",i=a;("height"===b||"width"===b||"top"===b||"bottom"===b||"left"===b||"right"===b)&&(a=a.style,h="px");var j=setInterval(function(){c>d?(c-=Math.ceil((c-d)*e),a[b]=c+h,g&&g(i),d>=c&&(clearInterval(j),f&&f(i))):(c+=Math.ceil((d-c)*e),a[b]=c+h,g&&g(i),c>=d&&(clearInterval(j),f&&f(i)))},1);return j},JSON:function(){function f(a){return 10>a?"0"+a:a}function stringify(a,b){var c,d,e,f,g,h=/["\\\x00-\x1f\x7f-\x9f]/g;switch(typeof a){case"string":return h.test(a)?'"'+a.replace(h,function(a){var b=m[a];return b?b:(b=a.charCodeAt(),"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16))})+'"':'"'+a+'"';case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";if("function"==typeof a.toJSON)return stringify(a.toJSON());if(c=[],"number"==typeof a.length&&!a.propertyIsEnumerable("length")){for(f=a.length,d=0;f>d;d+=1)c.push(stringify(a[d],b)||"null");return"["+c.join(",")+"]"}if(b)for(f=b.length,d=0;f>d;d+=1)e=b[d],"string"==typeof e&&(g=stringify(a[e],b),g&&c.push(stringify(e)+":"+g));else for(e in a)"string"==typeof e&&(g=stringify(a[e],b),g&&c.push(stringify(e)+":"+g));return"{"+c.join(",")+"}"}}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};var m={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return{stringify:stringify,parse:function(text,filter){function walk(a,b){var c,d;if(b&&"object"==typeof b)for(c in b)Object.prototype.hasOwnProperty.apply(b,[c])&&(d=walk(c,b[c]),void 0!==d?b[c]=d:delete b[c]);return filter(a,b)}var j;if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof filter?walk("",j):j;throw new SyntaxError("parseJSON")}}}(),Cookie:{write:function(a,b,c,d,e,f){/^\w*$/.test(a)||alert("cookie格式不正确"),/; /.test(b)&&alert("cookie格式不正确");var g=a+"="+b;if(c){var h=new Date;h.setTime(h.getTime()+1e3*c),g+="; expires="+h.toGMTString()}d&&(g+="; path="+d),e&&(g+="; domain="+e),f&&(g+="; secure"),document.cookie=g},rewriteKey:function(a,b,c,d,e,f,g){var h=b;if(c){var i=this.read(a),j=new RegExp("\\b"+b+"=([^&]*)\\b","g");h=i.replace(j,function(a,b){return a.replace(b,c)})}/^\d+(s|m|h|d)$/i.test(d)?(/^\d+s$/i.test(d)&&this.setSec(a,h,d.replace(/s$/i,""),e,f,g),/^\d+m$/i.test(d)&&this.setMin(a,h,d.replace(/m$/i,""),e,f,g),/^\d+h$/i.test(d)&&this.setHour(a,h,d.replace(/h$/i,""),e,f,g),/^\d+d$/i.test(d)&&this.setDay(a,h,d.replace(/d$/i,""),e,f,g)):this.write(a,h,d,e,f,g)},setDay:function(a,b,c,d,e,f){this.write(a,b,24*c*60*60,d,e,f)},setHour:function(a,b,c,d,e,f){this.write(a,b,60*c*60,d,e,f)},setMin:function(a,b,c,d,e,f){this.write(a,b,60*c,d,e,f)},setSec:function(a,b,c,d,e,f){this.write(a,b,c,d,e,f)},read:function(a,b,c){for(var d="",e=document.cookie.split("; "),f=0;f<e.length;f++){var g=e[f].match(/^(\w+)=(.+)$/);if(g&&g.length>1&&g[1]==a){d=g[2];break}}return b?c?Kg.JSON.parse(d)[b]:(new Kg.Param).parse(d)[b]:d},remove:function(a,b,c){var d=a+"=";b&&(d+="; path="+b),c&&(d+=";domain="+c),d+="; expires=Fri, 02-Jan-1970 00:00:00 GMT",document.cookie=d}},Param:function(){var a=[],b={};this.parse=function(a){for(var c=a.split("&"),d=0,e=c.length;e>d;d++){var f=c[d].split("=");b[f[0]]=f[1]}return b},this.toString=function(b){return b=b||"&",a.join(b)},this.add=function(b,c){var d=b+"="+c;return a.push(d),this}},Ajax:function(a,b,c,d,e,f,g){if(1==arguments.length)var h=arguments[0],a=h.method,b=h.url,c=h.async,d=h.args||"",e=h.callback,i=h.callbackName||"callback",j=h.callbackFuncName,f=h.error,g=h.docType,k=h.flashUrl;var l=d||"";if(c=null==c?!0:c,d&&"object"==typeof d){var m="";for(var n in d)m+=n+"="+d[n]+"&";l=m.substr(0,m.length-1)}if(a=a?a.toUpperCase():"POST",g=g?g.toLowerCase():"text","jsonp"==g){var o="";return o=j?j:"kgJSONP"+Math.random().toString().substr(2,9),window[o]=e,l=l.length>0?l+"&"+i+"="+o:"",l.length<=0&&(b+="&"+i+"="+o),void this.loadScript(b,l)}if("swf"!=g){var p=null;if(window.XMLHttpRequest&&!window.ActiveXObject)p=new XMLHttpRequest;else if(window.ActiveXObject)try{p=new ActiveXObject("Microsoft.XMLHTTP")}catch(q){try{p=new ActiveXObject("Msxml2.XMLHTTP")}catch(r){p=null}}return p.onreadystatechange=function(){if(4==p.readyState)if(200==p.status||0==p.status){var a=null;switch(g){case"xml":a=p.responseXML;break;case"json":a=Kg.JSON.parse(p.responseText);break;default:a=p.responseText}e&&e(a,p),p=null}else f&&f()},"GET"==a?(-1!=b.indexOf("?")?p.open(a,b+(l?"&"+l:""),c):p.open(a,b+(l?"?"+l:""),c),p.send(null)):(p.open(a,b,c),p.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),p.send(l)),p}if(window.kgAjaxCallbackFunc=e,Kg.flash.getObj("KugouAjaxFlash"))Kg.flash.getObj("KugouAjaxFlash").sendData(a,b,d);else{var s="kgAjaxFlashInit"+Math.random().toString().substr(2,9),t=document.createElement("div"),u=Kg.flash.getStr("KugouAjaxFlash",k||"http://static.kgimg.com/common/swf/ajaxFlash.swf?n="+Math.random(),1,1,{flashvars:"initFun="+s+"&callbackFun=kgAjaxCallbackFunc"});t.style.cssText="position:absolute; left:-9999px; width:1px; height:1px;",t.innerHTML=u,window[s]=function(){return setTimeout(function(){Kg.flash.getObj("KugouAjaxFlash").sendData(a,b,d)},100),1},document.body.appendChild(t)}},get:function(a,b,c,d,e){return this.Ajax("get",a,e,b,c,d)},post:function(a,b,c,d,e){return this.Ajax("post",a,e,b,c,d)},getJSON:function(a,b,c,d,e){return this.Ajax("get",a,e,b,c,d,"json")},postJSON:function(a,b,c,d,e){return this.Ajax("post",a,e,b,c,d,"json")},loadScript:function(a,b,c){var d=b||"";if(b&&"object"==typeof b){var e="";for(var f in b)e+=f+"="+b[f]+"&";d=e.substr(0,e.length-1)}d=d.trim();var g=document.createElement("script");g.type="text/javascript",g.readyState?g.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&(c&&c(),g.onreadystatechange=g=c=null)}:g.onload=function(){c&&c(),g.onload=g=c=null},g.src=a+(d?"?"+d:""),document.getElementsByTagName("head")[0].appendChild(g)},flash:{ready:!1,hasFlash:!1,version:0,init:function(){try{if(window.ActiveXObject){var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(a){this.hasFlash=!0;var b=a.GetVariable("$version"),c=b.split(" ")[1].split(",");this.version=parseFloat(c[0]+"."+c[1])}}else if(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]&&(this.hasFlash=!0,navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin.description))for(var d=navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin.description.split(" "),e=0;e<d.length;e++)isNaN(parseFloat(d[e]))||(this.version=parseFloat(d[e]));this.ready=!0}catch(f){}},getStr:function(a,b,c,d,e){this.init();var f="",g=!1,h={flashvars:"",wmode:"",allowFullScreen:!1,version:null};return e=e||{},Kg.extend(h,e,!0),-1!=navigator.appName.indexOf("Microsoft")&&(g=!0),this.hasFlash&&!h.version&&this.version>=h.version?(f+='<object id="'+(g?a:"")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10.0.32" width="'+c+'" height="'+d+'">',f+='<param name="bgColor" value="#666666" />',f+='<param name="movie" value="'+b+'" />',f+='<param name="flashvars" value="'+h.flashvars+'" />',f+='<param name="quality" value="high" />',f+='<param name="allowScriptAccess" value="always" />',f+='<param name="WMODE" value="'+h.wmode+'"/>',f+='<param name="allowFullScreen" value="'+h.allowFullScreen+'">',f+='<embed id="'+(g?"":a)+'" name="'+a+'" src="'+b+'" width="'+c+'"  height="'+d+'" allowScriptAccess="always" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+h.flashvars+'" type="application/x-shockwave-flash" wmode="'+h.wmode+'" allowFullScreen="'+h.allowFullScreen+'"></embed>',f+="</object>"):f+='您没有安装flash或者您的flash版本不足，请先<a href="http://get.adobe.com/cn/flashplayer/?promoid=JZEFT" target="_blank">安装</a>。',f},write:function(a,b,c,d,e){document.write(this.getStr(a,b,c,d,e))},getObj:function(a){if(-1==navigator.appName.indexOf("Microsoft"))return document[a];try{return document[a]}catch(b){return window[a]}}},request:{hash:function(a){var b=location.hash.replace("#","");if(a){var c=(new Kg.Param).parse(b);return c[a]}return b},search:function(a){var b=location.search.replace("?","");if(a){var c=(new Kg.Param).parse(b);return c[a]}return b}},bubbleSort:function(a,b,c){for(var a=[].concat(a),d=[],e=0;e<a.length;e++){for(var f=e+1;f<a.length;f++){if(b){if(parseInt(a[e][b])>parseInt(a[f][b]))break}else if(a[e]>a[f])break;f==a.length-1&&(d.push(a[e]),a.splice(e,1),e=-1)}e==a.length-1&&(d.push(a[e]),a.splice(e,1),e=-1)}return c?d.reverse():d},placeholder:function(a,b,c){a=this.$I(a),a.onfocus=function(){a.value==a.defaultValue&&(a.value="",a.style.color=b)},a.onblur=function(){""==a.value&&(a.value=a.defaultValue,a.style.color=c)}}};!function(d,w){function hijackedInit(){for(var a=document.getElementsByTagName("script"),b={},c=!1,d=0;d<a.length;d++){var e=a[d].src;if(e)if(e=e.split("?").shift(),b[e]){var f,g,h=a[d].src.indexOf(b[e].src)>-1,i=b[e].src.indexOf(a[d].src)>-1;b[e].src!=a[d].src&&(h||i)&&c===!1&&(c=!0,f=h?b[e].src:a[d].src,g=h?a[d].src:b[e].src,hijackedRes(function(a){a===!0&&hijackedDataOP(f,g)},function(){hijackedDataOP(f,g)}))}else b[e]=a[d]}c===!1&&hijackedRes(function(a){a!==!0||0!=hijackedResObj.length||resendHijacked?a===!0&&0!=hijackedResObj.length&&sendhijackedData():(resendHijacked=resend=!0,setTimeout(hijackedInit,monitorTime))},function(){0!=hijackedResObj.length&&sendhijackedData()})}function hijackedRes(a,b){for(var c=hijackedCur.type,e=hijackedCur.whiteList.join("|").replace(/\./gi,"\\.").replace(/\//gi,"\\/"),f=[],g=0;g<c.length;g++)for(var h=d.getElementsByTagName(c[g]),i=0;i<h.length;i++)f.push(h[i]);monitor(f,function(b,c){for(var d=0,f=b.length;f>d;d++){var g=b[d],h=g.tagName.toLowerCase(),i=("link"==h?g.href:g.src)||g.getAttribute("data-src");if(!g.read&&(b[d].read=!0,"iframe"!=h||"jackedHiddenIframe"!=g.id)){var j=i&&i.match("^(http|https)://(.*?)/"),k=!1,l=0;if("iframe"==h&&(l=-1),j&&j.length>1)k=!j[0].match(e),"iframe"==h&&(l=k?1:11);else if("iframe"==h)try{g.contentWindow.location.href,l=11}catch(j){}if(k||"iframe"!=h||(j=i&&i.match(/^javascript:(.*?)$/),k=j&&j.length>1&&";"!=j[1],k&&(l=2)),!k&&"iframe"==h&&!g.getAttribute("src"))try{g.contentWindow.location.href}catch(j){var m=g.parentNode;m&&"fixed"==m.style.position&&(k=!0,l=3)}k&&(hijackedInfo||(hijackedInfo=document.documentElement.innerHTML||document.body.innerHTML),hijackedResObj&&hijackedResObj.push({type:h,src:i,htype:l}),hijackedCur.open&&0==/\bstyle\b|\bscript\b|\blink\b/.test(h)&&removeRes(g))}}b=null,a&&a(c)},b)}function hijackedOther(a,b){if(a){var c=a.tagName.toLowerCase(),d=hijackedCur.type,e=arguments.callee,f=a.src||a.href,g=[];if(-1!=d.indexOf(c))return[];if(a.style.backgroundImage&&a.style.backgroundImage.toString().match(/url\([\"|\']?(\/\/|http)/)){var h=a.style.backgroundImage.toString().match(/url\([\"|\']?(.*[^'"])[\"|\']?\)/);a.setAttribute("data-src","/"==h[1][0]?location.protocol+h[1]:h[1]),g.push(a)}else if(f&&f.toString().match(/http/))a.setAttribute("data-src",f),g.push(a);else if(a.children&&0!=a.children.length)for(var i=0;i<a.children.length;i++){var j=e.apply(e,[a.children[i],!0]);if(j.length>0&&(g=g.concat(j)),!b&&j.length>0)for(var k=0;k<j.length;k++)hijackedDomObj.push({key:a,value:j[k]})}return g}}function monitor(a,b,c){var e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;if(!e)return b&&b(a,!0),!1;b&&b(a),monEles&&monEles.res&&(b&&b(monEles.res),monEles.res=null),monEles&&(monEles.fn=function(a){a&&a.tagName&&b&&b(checkElement(a))});var f=new e(function(a){var c=[];a.forEach(function(a){var d,e,f=a.type,g=a.addedNodes,h=hijackedCur.type;if("childList"==f&&g)for(var i=0;i<g.length;i++)d=g[i],1==d.nodeType&&(c=c.concat(checkElement(d,!0)));else"attributes"==f&&(d=a.target,1==d.nodeType&&(e=d.tagName.toLowerCase(),-1!=h.indexOf(e)&&c.push(d)));b&&b(c)})});f.observe(d,{subtree:!0,childList:!0,attributes:!0,attributesFilter:["src","href"]}),setTimeout(function(){c&&c()},monitorTime),setTimeout(function(){f.disconnect(),monEles&&(monEles.fn=null),hijackedDomObj=null,hijackedResObj=null},3e4)}function monitorElement(){if("undefined"!=typeof HTMLElement){var a=arguments.callee,b=HTMLElement.prototype.appendChild,c=HTMLElement.prototype.insertBefore;return HTMLElement.prototype.appendChild=HTMLElement.prototype.insertBefore=function(d,e){return d?(setTimeout(function(){a.fn&&a.fn(d,e)},0),e?c.call(this,d,e):b.call(this,d)):void 0},a}}function checkElement(a,b){if(a){var c=a.tagName.toLowerCase(),d=[],e=hijackedCur.type;if(-1!=e.indexOf(c))d.push(a);else{for(var f=0;f<e.length;f++)for(var g=a.getElementsByTagName(e[f]),h=0;h<g.length;h++)d.push(g[h]),b||hijackedDomObj.push({key:a,value:g[h]});d=d.concat(hijackedOther(a,b))}return d}}function removeRes(a){setTimeout(function(){if(a.parentNode)try{a.parentNode.removeChild(a);for(var b=0;b<hijackedDomObj.length;b++){var c=hijackedDomObj[b];if(c.value==a){if(c.key&&c.key.parentNode){var d=c.key.tagName.toLowerCase();"body"!=d&&"html"!=d&&"head"!=d&&c.key.parentNode.removeChild(c.key)}break}}}catch(e){}},500)}function getUserInfo(a){function b(a){var b="KGSupercall_GetTempUserInfo"+Math.random().toString().substr(2,9),c=null;window[b]=function(c){a&&a(c),window[b]=null};try{c=external.SuperCall(519,'{"callback":"'+b+'"}')}catch(d){}return void 0!==c&&a?void window[b](c):a?void 0:(window[b]=null,c)}function c(a){if(w.KgMobileCall.chkAndroidApp())try{a&&a(external.superCall(101))}catch(b){}else if(w.KgMobileCall.isIOS){var c="kgmobilecall"+Math.random().toString().substr(2,9);window[c]=function(b){"undefined"!=typeof b&&("[object String]"===Object.prototype.toString.call(b)?a&&a(d.parse(b)):a&&a(b))},location.href='kugouurl://start.music/?{"cmd":101, "callback":"'+c+'"}'}}var d=w.JSON||w.Kg&&Kg.JSON||null;try{w.KgMobileCall.isInClient()?c(function(b){a&&a(b.kugouID)}):b(function(b){a&&a(d.parse(b).uid)})}catch(e){a&&a(0)}}function postData(){try{var a="KGSupercall_PostData"+Math.random().toString().substr(2,9),b=arguments[0],c=arguments[1];b=b.substr(0,b.length-1)+',"callback":"'+a+'"}',external.SuperCall(813,b),top.window[a]=function(){c&&c(arguments[0]),top.window[a]=null}}catch(d){}}function getData(){try{var a="KGSupercall_GetData"+Math.random().toString().substr(2,9),b=arguments[0],c=arguments[1];b=b.substr(0,b.length-1)+',"callback":"'+a+'"}',external.SuperCall(855,b),top.window[a]=function(){c&&c(arguments[0]),top.window[a]=null}}catch(d){c&&c("")}}function hijackedDataOP(a,b){var c=new RegExp(document.domain);if(c.test(a)&&w.Kg)Kg.Ajax("get",a,!0,{},function(c){sendhijackedData(a,b,c)},null,"script");else{var d=w.JSON||w.Kg&&Kg.JSON||null;d&&getData(d.stringify({url:a}),function(c){sendhijackedData(a,b,c)})}}function gethijackedResObj(){for(var a=[],b=[],c=[],d=!1,e=0;e<hijackedResObj.length;e++){var f=hijackedResObj[e];a.push(f.src),0!=f.htype&&11!=f.htype&&c.push(f.htype),"iframe"==f.type&&b.push(f.src),-1==f.htype&&(d=!0)}return{iframe:b.join(","),src:a.join(","),htype:c.join(","),hc:d}}function sendhijackedData(a,b,c){getUserInfo(function(d){var e=0;try{e=external.GetVersion()}catch(f){}var g=gethijackedResObj(),h="";if(g.hc&&8==parseInt(10*Math.random())&&(h=hijackedInfo+(c?'\n<script id="hijacked">'+c+"</script>":"")),e>=7700){var i=w.JSON||w.Kg&&Kg.JSON||null;if(i){var j={url:"http://stat.www2.kugou.com/inject/i.php",param:i.stringify({pageurl:location.href,jsurl:a||"",jsurl2:b||"",ifameurl:g.iframe,uid:d,resurls:g.src,resend:1==resend?3:2,htype:g.htype,content:escape(h)})};postData(i.stringify(j),function(){}),callbackOP||(callbackOP=!0,KgAntiHijack=w.KgAntiHijack||{callback:null},KgAntiHijack.callback&&KgAntiHijack.callback())}}else{var k=['<iframe  id="jackedHiddenIframe" name="jackedHiddenIframe" width=0 height=0 style="display:none" frameborder=0 src="about:blank"></iframe>','<form id="hijacked" target="jackedHiddenIframe" action="http://stat.www2.kugou.com/inject/i.php" name="hijacked_form" method="post" >','<input type="hidden" name="pageurl" value="'+location.href+'">','<input type="hidden" name="jsurl" value="'+(a||"")+'">','<input type="hidden" name="jsurl2" value="'+(b||"")+'">','<input type="hidden" name="ifameurl" value="'+g.iframe+'">','<input type="hidden" name="uid" value="'+d+'">','<input type="hidden" name="resurls" value="'+g.src+'">','<input type="hidden" name="htype" value="'+g.htype+'">',1==resend?'<input type="hidden" name="resend" value="3">':'<input type="hidden" name="resend" value="2">','<textarea name="content">'+escape(h)+"</textarea>","</form>"].join(""),l=document.createElement("div");l.style.display="none",l.innerHTML=k,document.getElementsByTagName("body")[0].appendChild(l)&&(hijacked_form.submit(),callbackOP||(callbackOP=!0,KgAntiHijack=w.KgAntiHijack||{callback:null},KgAntiHijack.callback&&KgAntiHijack.callback()))}hijackedResObj=null})}if(1==w.HIJACKED)return!1;w.HIJACKED=1;var hijackConfig={"fanxing.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["cnzz.com/","360.cn/","360.com/","trust.baidu.com/","mapi.alipay.com/"],open:!0},"fanxing2.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["cnzz.com/","360.cn/","360.com/","trust.baidu.com/","mapi.alipay.com/"],open:!0},"fxwork.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["cnzz.com/","360.cn/","360.com/","trust.baidu.com/","mapi.alipay.com/"],open:!0},"ads.service.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["jd.com/","10.13.0.19:805/"],open:!0},"p.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["jd.com/"],open:!0},"m.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["res.wx.qq.com/"],open:!0},"mfanxing.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["res.wx.qq.com/"],open:!0},"m.www2.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:[],open:!0},"activity.mobile.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["res.wx.qq.com/"],open:!0},"topic.mobile.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["res.wx.qq.com/"],open:!0},"zhuanji.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["res.wx.qq.com/"],open:!0},"www2.kugou.kugou.com/window":{type:["img","link","embed","iframe","script"],whiteList:["cnzz.com/","linezing.com/"],open:!0},"www2.kugou.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["42.62.20.165/","42.62.20.164/"],open:!0},"www4.kugou.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["42.62.20.165/","42.62.20.164/"],open:!0},"huodong.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:[],open:!0},"acsing.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["res.wx.qq.com/","q.qlogo.cn/"],open:!0},"www.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["share.baidu.com/","nsclick.baidu.com/","linezing.com/"],open:!0},"tui.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:[],open:!0},"vip.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:[],open:!0},"wallet.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:[],open:!0},"imusic.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["gtimg.com/"],open:!0},"download.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["qhimg.com/","google-analytics.com/","wandoujia.com/","zhushou.360.cn/","25pp.com/","tongbu.com/"],open:!0},"www2.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:["cnzz.com/","linezing.com/"],open:!0},"ktv.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:[],open:!0},"n.ktv.kugou.com":{type:["img","link","embed","iframe","script"],whiteList:[],open:!0},"default":{type:["img","link","embed","iframe","script"],whiteList:["42.62.20.165/","42.62.20.164/"],open:!0},common:{type:[],whiteList:["kugoo.com/","fanxing.com/","kugou.com/","kgimg.com/","hm.baidu.com/","netadreg.gzaic.gov.cn/","qq.com/","alipay.com/"]}};!w.Kg&&(w.Kg={}),!w.Kg.Ajax&&(w.Kg.Ajax=function(a,b,c,d,e,f,g){if(1==arguments.length)var h=arguments[0],a=h.method,b=h.url,c=h.async,d=h.args||"",e=h.callback,i=h.callbackName||"callback",j=h.callbackFuncName,f=h.error,g=h.docType,k=h.flashUrl;var l=d||"";if(c=null==c?!0:c,d&&"object"==typeof d){var m="";for(var n in d)m+=n+"="+d[n]+"&";l=m.substr(0,m.length-1)}if(a=a?a.toUpperCase():"POST",g=g?g.toLowerCase():"text","jsonp"==g){var o="";return o=j?j:"kgJSONP"+Math.random().toString().substr(2,9),window[o]=e,l=l.length>0?l+"&"+i+"="+o:"",l.length<=0&&(b+="&"+i+"="+o),void this.loadScript(b,l)}if("swf"!=g){var p=null;if(window.XMLHttpRequest&&!window.ActiveXObject)p=new XMLHttpRequest;else if(window.ActiveXObject)try{p=new ActiveXObject("Microsoft.XMLHTTP")}catch(q){try{p=new ActiveXObject("Msxml2.XMLHTTP")}catch(r){p=null}}return p.onreadystatechange=function(){if(4==p.readyState)if(200==p.status||0==p.status){var a=null;switch(g){case"xml":a=p.responseXML;
break;case"json":a=Kg.JSON.parse(p.responseText);break;default:a=p.responseText}e&&e(a,p),p=null}else f&&f()},"GET"==a?(-1!=b.indexOf("?")?p.open(a,b+(l?"&"+l:""),c):p.open(a,b+(l?"?"+l:""),c),p.send(null)):(p.open(a,b,c),p.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),p.send(l)),p}if(window.kgAjaxCallbackFunc=e,Kg.flash.getObj("KugouAjaxFlash"))Kg.flash.getObj("KugouAjaxFlash").sendData(a,b,d);else{var s="kgAjaxFlashInit"+Math.random().toString().substr(2,9),t=document.createElement("div"),u=Kg.flash.getStr("KugouAjaxFlash",k||"http://static.kgimg.com/common/swf/ajaxFlash.swf?n="+Math.random(),1,1,{flashvars:"initFun="+s+"&callbackFun=kgAjaxCallbackFunc"});t.style.cssText="position:absolute; left:-9999px; width:1px; height:1px;",t.innerHTML=u,window[s]=function(){return setTimeout(function(){Kg.flash.getObj("KugouAjaxFlash").sendData(a,b,d)},100),1},document.body.appendChild(t)}}),!w.Kg.JSON&&(w.Kg.JSON=function(){function f(a){return 10>a?"0"+a:a}function stringify(a,b){var c,d,e,f,g,h=/["\\\x00-\x1f\x7f-\x9f]/g;switch(typeof a){case"string":return h.test(a)?'"'+a.replace(h,function(a){var b=m[a];return b?b:(b=a.charCodeAt(),"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16))})+'"':'"'+a+'"';case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";if("function"==typeof a.toJSON)return stringify(a.toJSON());if(c=[],"number"==typeof a.length&&!a.propertyIsEnumerable("length")){for(f=a.length,d=0;f>d;d+=1)c.push(stringify(a[d],b)||"null");return"["+c.join(",")+"]"}if(b)for(f=b.length,d=0;f>d;d+=1)e=b[d],"string"==typeof e&&(g=stringify(a[e],b),g&&c.push(stringify(e)+":"+g));else for(e in a)"string"==typeof e&&(g=stringify(a[e],b),g&&c.push(stringify(e)+":"+g));return"{"+c.join(",")+"}"}}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};var m={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return{stringify:stringify,parse:function(text,filter){function walk(a,b){var c,d;if(b&&"object"==typeof b)for(c in b)Object.prototype.hasOwnProperty.apply(b,[c])&&(d=walk(c,b[c]),void 0!==d?b[c]=d:delete b[c]);return filter(a,b)}var j;if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof filter?walk("",j):j;throw new SyntaxError("parseJSON")}}}()),!w.KgMobileCall&&(w.KgMobileCall={}),!w.KgMobileCall.chkAndroidApp&&(w.KgMobileCall.chkAndroidApp=function(){try{if(external.superCall(122))return!0}catch(a){return!1}}),"undefined"==typeof w.KgMobileCall.isIOS?w.KgMobileCall.isIOS=navigator.userAgent.match(/KGBrowser/gi)?!0:!1:"",!w.KgMobileCall.isInClient&&(w.KgMobileCall.isInClient=function(){return w.KgMobileCall.chkAndroidApp()?w.KgMobileCall.chkAndroidApp():w.KgMobileCall.isIOS?w.KgMobileCall.isIOS:!1});var callbackOP=!1,hijackedResObj=[],hijackedDomObj=[],resendHijacked=!1,resend=!1,monitorTime=1e4,hijackedInfo="",hijackedCur=function(){var a=hijackConfig["default"];for(var b in hijackConfig)if("default"!=b&&"common"!=b){var c=new RegExp("\\b"+b+"\\b","g");if(c.test(location.href)){a=hijackConfig[b];break}}w.HIJACKED_LIST&&w.HIJACKED_LIST instanceof Array&&(a.whiteList=a.whiteList.concat(w.HIJACKED_LIST));var d=hijackConfig.common;return a.type=a.type.concat(d.type),a.whiteList=a.whiteList.concat(d.whiteList),a}();setTimeout(hijackedInit,3e3);var monEles=monitorElement();monEles&&(monEles.fn=function(a){a&&a.tagName&&("undefined"==typeof monEles.res&&(monEles.res=[]),monEles.res=monEles.res.concat(checkElement(a)))})}(document,window);