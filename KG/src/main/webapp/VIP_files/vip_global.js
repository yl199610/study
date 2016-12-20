/*
 * Copyright 2014, kugou.com
 * Creator: jackNEss Lau
 * $Author: zhanghailong $
 * $Date: 2013-08-07 19:37:30 +0800 (周三, 2013-08-07) $
 * ModifiedTime: 2015年4月17日0:19:00
 */
var console = window.console || {log:function(txt){}};	
var vipdomain = "http://vip.kugou.com/";
var URL = window.location.href,
	fromUrl = "",
	IsVip = "1";
var payInfo = {
	autoChargeType : "",
	aliPay : ""
}

/*此处判断版本号，如果版本号小于   的时候默认设置为开通VIP(设置from=vip,不能进入音乐包),隐藏产品选择*/
function getUrlFn(){ 
    var querystr = URL.split("?"),
    	GETs = [],
    	GET = [];

    if(querystr[1]){
        GETs = querystr[1].split("&");
        for(i=0;i<GETs.length;i++){
              tmp_arr = GETs[i].split("=");
              key=tmp_arr[0];
              GET[key] = tmp_arr[1];
        }
    }else{
    	GETs = querystr[0].split("&");
        for(i=0;i<GETs.length;i++){
              tmp_arr = GETs[i].split("=");
              key=tmp_arr[0];
              GET[key] = tmp_arr[1];
        }
    }

    return GET;
}
var urlData = getUrlFn(),
$rechargeTypeArea = Kg.$("#rechargeTypeArea");
if(urlData["from"] != undefined){
	fromUrl = urlData["from"];
}else{
	fromUrl = "vip";
	$rechargeTypeArea.hide();
}
if(urlData["version"] != undefined){
	var version = urlData["version"];
	if(Number(version) < 7700){
		fromUrl = "vip";
		$rechargeTypeArea.hide();
	}else{
		$rechargeTypeArea.show();
	}
}else{
	var version = 0;
	fromUrl = "vip";
	$rechargeTypeArea.hide();
}
if(urlData["action"] != undefined){
	var action = urlData["action"];
}else{
	var action = "";
}


Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	};
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

Kg.trigger = function(target, type) {
	var dc = document;
	if (dc.createEvent) {
		var evt = dc.createEvent("HTMLEvents");
		evt.initEvent(type, false, true);
		target.dispatchEvent(evt);
	} else if (dc.createEventObject) {
		target.fireEvent("on" + type);
	}
};

/**
 * 获取下一个邻近对象
 *
 * @id nextEl
 * @return {Array} 返回Temp对象
 */

Kg.nextEl = function() {
	var nextEl = [];

	for (var i = 0; i < this.length; i++) {
		var el = this[i];
		var next = el.nextSibling;

		while (next && next.nodeType != 1) {
			next = next.nextSibling;
		}

		if (!next || next.nodeType != 1) {
			this.splice(i, 1);
			i--;
			continue;
		}
		nextEl = Kg.$(next);
		break;
	}
	return nextEl;
};


/* 通用弹出层函数 */
function popupShow(title, innerHTML, callback) {
	
	// 退订业务第四个为回调函数
	if(arguments.lenght=4){
		buildreadyCallBck = arguments[3]
	}
	
	var dc = document,
		callback = callback || function(){},
		popId = 'vipGeneralPopup',
		pop = dc.getElementById(popId),
		popBg = dc.getElementById(popId + "bg"),
		closeBtn,
		/* 背景重构 */
		bgRebuild = function() {
			if (popBg) {
				return;
			}
			popBg = dc.createElement("div");
			popBg.id = popId + "bg";
			popBg.style.cssText = [
				"position:absolute",
				"display:block",
				"left:0",
				"top:0",
				"width:" + dc.body.scrollWidth + "px",
				"background:#000",
				"filter:Alpha(opacity=" + 60 + ")",
				"opacity:" + 0.6,
				"z-index:90000"
			].join(";");
			dc.body.appendChild(popBg);
			popBg.style.height = (dc.body.offsetHeight > dc.documentElement.clientHeight ? dc.body.offsetHeight : dc.documentElement.clientHeight) + "px";
		},
		/* 弹出层背景调整 */
		popBgFix = function() {
			popBg.style.width = dc.body.scrollWidth + "px";
			popBg.style.height = (dc.body.offsetHeight > dc.documentElement.clientHeight ? dc.body.offsetHeight : dc.documentElement.clientHeight) + "px";
		},
		popupFix = function(elm) {
			elm.style.cssText = [
				"position:" + (Kg.UA.Ie6 ? "absolute" : "fixed"),
				"top:50%",
				"left:50%",
				"margin-left:" + -elm.offsetWidth / 2 + "px",
				"margin-top:" + -elm.offsetHeight / 2 + "px",
				"z-index:90001"
			].join(";");
			
			if (Kg.UA.Ie6) {
				
				elm.style.marginTop = 0;
				
				ie6Fix();
				
				var scrollTimer = null,
					resizeTimer = null;
				
				window.onscroll = function(){
					if (scrollTimer) {
			            clearTimeout(scrollTimer)
			        }
					scrollTimer = setTimeout(function(){
							ie6Fix();
					},400)
				}
				
				window.onresize = function(){
					if (resizeTimer) {
			            clearTimeout(resizeTimer)
			        }
					resizeTimer = setTimeout(function(){
							ie6Fix();
							popBgFix();
					},400)
				}

			}
			
		},
		ie6Fix = function() {

			var dc = document,
				scrollTop = dc.documentElement.scrollTop || dc.body.scrollTop,
				boxHeight = pop.offsetHeight,
				screenHeight = dc.documentElement.clientHeight;
				
					pop.style.top = scrollTop + (screenHeight - boxHeight) / 2 + "px";	


		},
		closeHandle = function() {
			try {
				if (popBg) {
					dc.body.removeChild(popBg);
				}
				if (pop) {
					dc.body.removeChild(pop);
				}
			} catch (e) {

			} finally {
				callback&&callback();
			}
		};

	if (pop) {
		dc.body.removeChild(pop);
	}
	var titleContent,
		closeContent,
		innerHTMLContent;
	pop = dc.createElement("div");
	pop.id = "vipGeneralPopup";
	if(title !=  "微信支付"){		
		pop.className = "vip_popup";
		titleContent = '<div class="vip_popup_hd"><h3 class="h_tl">' + title + '</h3></div>';
		closeContent = '<a href="javascript:;" class="vip_popup_close callbackClass" id="vip_popup_close" title="关闭">close</a>';
		innerHTMLContent = '<div class="vip_popup_bd">' + innerHTML + '</div>';
		
	}else{
		pop.className = "weixinDialog";
		closeContent = ""; 
		titleContent ="";
		innerHTMLContent = innerHTML;
	}

	pop.innerHTML = [
		closeContent,
		titleContent,
		innerHTMLContent,
	].join("");

	pop.hide = closeHandle;
	if(title !=  "微信支付"){
		closeBtn = pop.children[0];
		closeBtn.onclick = closeHandle;
		
	}
	
	dc.body.appendChild(pop);
	
	bgRebuild();

	popupFix(pop);
	
	buildreadyCallBck&&buildreadyCallBck();

}

function popup(msg) {
	popupShow("提示", [
		'<p align="center">' + msg + '</p>',
	].join(""));
}



function getvalue(str) {
		var obj = document.getElementsByName("" + str);

		var obj_value = "";
		for (var i = 0; i < obj.length; i++) {
			if (obj[i].checked) {
				obj_value = obj[i].value;
				break;
			}
		}
		return obj_value;
	}
	/**
	 * 通用统计
	 * @param { Number || Array }
	 * @param { String }
	 */
function sdnClick(key, type) {
	if (!key) {
		return;
	}
	var src = (new Date()).getTime();

	//判断是否为数组
	if (Object.prototype.toString.call(key) === '[object Array]') {
		for (var i = 0, l = key.length; i < l; i++) {
			src = (new Date()).getTime();
			switch (type) {
				case "aspx":
					src = 'http://sdn.kugou.com/link.aspx?id=' + key[i] + '&url=&t=' + src;
					break;
				case "php":
				default:
					src = 'http://tj.kugou.com/front/link.php?id=' + key[i] + '&url=&t=' + src;
					break;
			}
			(new Image()).src = src;
		}
	} else {
		switch (type) {
			case "aspx":
				src = 'http://sdn.kugou.com/link.aspx?id=' + key + '&url=&t=' + src;
				break;
			case "php":
			default:
				src = 'http://tj.kugou.com/front/link.php?id=' + key + '&url=&t=' + src;
				break;
		}
		(new Image()).src = src;
	}
}

/**
 * @classDescription  TIPS构造函数
 * @type {Object}
 * @param {Dom | DomCellection} 需要显示TIPS的对象
 */
function Tips(o) {
	var el = (o instanceof Array) ? o : [].concat(o);
	for (var i = 0, l = el.length; i < l; i++) {
		Kg.addEvent(el[i], "mousemove", Kg.bind(function(e) {
			e = e || window.event;
			Tips.showLayer(this, (e.clientX || e.pageX), (e.clientY || e.pageY));
		}, el[i]));

		Kg.addEvent(el[i], "mouseout", Kg.bind(function() {
			var layer = Kg.$C("tip")[0];
			layer.style.display = "none";
		}, el[i]));
	}
}
Tips.showLayer = function(_this, evtX, evtY) {
	var el = Kg.$C("tip")[0];
	var size = Kg.getBodySize();
	el.innerHTML = _this.getAttribute("tip");
	el.style.display = "block";
	el.style.left = evtX + size.sL + 5 + "px";
	el.style.top = evtY + size.sT - 5 + "px";
};



//侧栏浮动
function initSideFloat() {
	var dc = document,
		//距离底部的高度
		bottomDistance = 100,
		isIE6 = (function() {
			if (window.XMLHttpRequest) {
				return false;
			} else {
				return true;
			}
		})(),
		sidefloat = dc.createElement("div");
	sidefloat.className = "side_float";
	sidefloat.innerHTML = [
		'<a href="javascript:;" class="s1" title="">回到顶部</a>',
		'<a href="http://www.kugou.com/kf/user/app/" target="_blank" class="s2" title="意见反馈">意见反馈</a>'
	].join("");
	dc.body.appendChild(sidefloat);
	if (isIE6) {
		sidefloat.style.bottom = "auto";
		fixHandle();
		window.onscroll = function() {
			fixHandle();
		};
		window.onresize = function() {
			fixHandle();
		};

		function fixHandle() {
			sidefloat.style.top = (dc.body.scrollTop || dc.documentElement.scrollTop) + dc.documentElement.clientHeight - bottomDistance + "px";
		}
	} else {
		sidefloat.style.bottom = bottomDistance + "px";
	}
	//回到顶部
	function scrollToTop() {
			var scrollTop = dc.documentElement.scrollTop || dc.body.scrollTop;
			var iSpeed = Math.floor((-scrollTop) / 2);
			if (scrollTop <= 0) {
				return;
			}
			document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
			setTimeout(arguments.callee, 50);
		}
		//绑定事件
	sidefloat.children[0].onclick = scrollToTop;
}

/**
 * 屏蔽特权页的开通酷VIP
 */
function rePriviBtnOpen() {
	if (privi_kg_domain) {
		Kg.getJSON(privi_kg_domain + "index.php?r=ajax/getdata", {
			"cmid": 1,
			n: Math.random()
		}, function(res) {
			if (res && res.IsVip) {
				if (Kg.$(".btn_open")[0]) {
					Kg.$(".btn_open")[0].style.display = "none";
				}
			}
		});
	}
}

/**
 * 模拟勾选框
 * @param { String } 点击元素
 * @param { Number } 父层级别
 */
function btnSelected(dom, index) {
	var el = Kg.$(dom);
	Kg.$('#bank_select i').removeClass("selected");
	Kg.$('#bank_list i').removeClass("selected");
	el.find("i").addClass("selected");
	el.find("i").removeClass("mouse_hoversion");
	window.payInfo.bankId = el[0].getElementsByTagName('i')[0].getAttribute('data-value');
	window.payInfo.payway = el[0].getElementsByTagName('span')[0].innerText || el[0].getElementsByTagName('span')[0].textContent;
}



/**
 * 显示浮动提示
 * @param { Objcet } 容器对象
 * @param { String }  内容
 */
function popLayerTips(o) {
	if (o) {
		var _el = Kg.$("#pay_tips2");
		var size = Kg.getBodySize();
		var domsize = Kg.getXY(o.dom);

		if (typeof o.top == "undefined") {
			o.top = 0;
		}
		_el.find(".tips_con").html(o.str);
		_el[0].style.display = "block";
		_el[0].style.left = domsize.right + 24 + "px";
		if (Kg.UA.Ie6 || Kg.UA.Ie7) {
			_el[0].style.top = domsize.top - o.top - 8 + "px";
		} else {
			_el[0].style.top = domsize.top - o.top - 4 + "px";
		}
	}
}

/**
 * 显示浮动提示
 * @param { Objcet } 容器对象
 * @param { String }  内容
 */
function popUpTips(o) {
	if (o) {
		var _el = Kg.$("#pay_tips3");
		var size = Kg.getBodySize();
		var domsize = Kg.getXY(o.dom);

		if (typeof o.top == "undefined") {
			o.top = 0;
		}
		_el.find(".tips_con").html(o.str);
		_el[0].style.display = "block";
		_el[0].style.left = domsize.right + 24 + "px";
		if (Kg.UA.Ie6 || Kg.UA.Ie7) {
			_el[0].style.top = domsize.top - o.top - 4 + "px";
		} else {
			_el[0].style.top = domsize.top - o.top + "px";
		}
	}
}
popUpTips.close = function() {
	var _el = Kg.$("#pay_tips3");
	_el.find(".tips_con").html("");
	_el[0].style.display = "none";
}


/**
 * 关闭弹窗
 */
function closePop() {
	var dc = document,
		pop = dc.getElementById('vipGeneralPopup'),
		popBg = dc.getElementById("vipGeneralPopupbg");
	if (popBg) {
		dc.body.removeChild(popBg);
	}
	if (pop) {
		dc.body.removeChild(pop);
	}
}



/**
 * 来源统计，充值付款和跳转银行 SourceStat
 * @name SourceStat
 * @function
 * @param { Object } {cmd:1统计付款按钮|2统计银行按钮}
 */
function sourceStat(o) {
	var reg_num = /^\d+/g;
	if (o && o.name) {
		var statid = parseInt(Kg.request.search(o.name), 10);
		if (statid && reg_num.test(statid)) {
			sdnClick(statid);
		}
	}
}

function dateTrans(type, date) {

	var now = new Date();
	now.setHours(0);
	now.setSeconds(0);
	now.setMinutes(0);

	if (!date || date < 0) {
		return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	}
	switch (type) {
		case 'add':
			now.setDate(now.getDate() + date);
			return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	}
}

/**
 *漏斗统计
 *rawVipEndTime 判断是否为首次充值
 *enter_id 判断url中是否带有入口号，如果没有入口号用按钮自身的入口号
 */
function funnelFn(rawVipEndTime,space,orderNumber){
	var user_id = unescape(Kg.Cookie.read("KuGoo", "KugooID") || "0"),
		mid = urlData["mid"] || "",
		tv = urlData["version"] || urlData["ver_id"] || "0",
		IsVip = rawVipEndTime == "" ? IsVip = 1: IsVip = 2,
		enter_id = urlData["entrance"] || "",
		plat_id = urlData["plat_id"] || "2400",
		orderNumber = orderNumber || "",
		space = space || "";
	if(user_id != 0){
       try{
        newLogCount("31000",{
	        plat_id     : plat_id,      //平台ID PC默认1001
	        business_id : "001",        //业务ID vip业务为001
	        user_id     : user_id,      //用户ID 
	        mid         : mid,          //机器码
	        nettype     : "",
	        ip          : "",
	        enter_id    : enter_id,     //入口ID
	        tv          : tv,           //版本号，web端默认为0
	        rechar      : IsVip,        //会员身份
	        ad_id       : "",
	        space       : space,		//充值页按钮入口
	        pay_type    : "",
	        ordernumber : orderNumber,  //订单号
	        ext_content : "",
	        sell_status : ""
	    })
    }catch (ex){}
    }
}

/**
 * 通用分类统计
 *
 * @method LogStat
 * @function
 * @param data
 * @return
 */
function LogStat(data){
	var params = "";
	if(data.p1){
		params += "&p1="+ encodeURIComponent(data.p1);
	}
	if(data.p2){
		params += "&p2="+ encodeURIComponent(data.p2);
	}
	if(data.p3){
		params += "&p3="+ encodeURIComponent(data.p3);
	}
	if(data.p4){
		params += "&p4="+ encodeURIComponent(data.p4);
	}
	if(data.name){
		params += "&name="+encodeURIComponent(data.name);
	}
	if(data.type){ 
		params += "&type="+data.type;
	}
	params = params.substr(1,params.length);

	var url =  "http://log.stat.kugou.com/statistics/statistics.html?"+params + "&n=" + new Date().getTime();
	if(data.urlback){
		return url;
	}else{
		try {
			setTimeout(function(){
				(new Image()).src = url;
			},0);
		} catch (ex) {}
		return null;
	}
}




/**
 * VIP充值页面分类统计
 * @param: { number} 1 :付款按钮； 2 ：确定充值  不传参为，单纯页面访问
 * 其他为没有带fromid即从官网直接跳转,未知来源为有带fromid但不确定后缀
 *
 */
function vipFromClick(obj) {
	var localUrl = window.location.href,
		fromid = "无后缀",
		even = "",
		srcFn = function(e1, fromid) {
			var newImg = new Image();
			newImg.src = "http://log.stat.kugou.com/statistics/statistics.html?type=1&name=" + encodeURIComponent("VIP官网充值来源统计") + "&p1=" + encodeURIComponent("VIP官网充值页") + "&p2=" + encodeURIComponent(e1) + "&p3=" + encodeURIComponent(fromid) + "&t=" + new Date().getTime();
		};

	obj ? even = obj : even = "页面访问";
	if (even == 1) {
		even = "付款按钮点击";
	} else if (even == 2) {
		even = "确定充值点击";
	}

	if (localUrl.indexOf("&fromid=") != -1) {
		var param = localUrl.split("&fromid=")[1];

		switch (param) {
			case "adqiantie":
				fromid = "MV前贴片广告";
				break;
			case "icon":
				fromid = "VIP标识";
				break;
			case "charge":
				fromid = "个人面板-开通VIP";
				break;
			case "recharge":
				fromid = "个人面板-续费";
				break;
			case "favorite":
				fromid = "收藏空间";
				break;
			case "expire":
				fromid = "到期续费";
				break;
			case "pckaitong":
				fromid = "内嵌窗口开通";
				break;
			case "download_jiasu":
				fromid = "下载窗口-加速下载";
				break;
			case "download_kaitong":
				fromid = "下载窗口-立即开通";
				break;
			case "adzanting":
				fromid = "MV暂停贴片";
				break;
			case "pckaitong_gaopin":
				fromid = "内嵌窗口开通-高品电台";
				break;
			case "pckaitong_jiasu":
				fromid = "内嵌窗口开通-加速下载";
				break;
			case "ipshield":
				fromid = "海外屏蔽开通";
				break;
			default:
				fromid = "未知来源";
		}
		srcFn(even, fromid);
	} else if (localUrl.indexOf("&viptype=") != -1) {
		fromid = "下载无限歌曲";
		srcFn(even, fromid);
	} else {
		srcFn(even, fromid);
	}
}



// 充值页初始化
function rechargeInit() {
	var she = this,
		timeHook, //timeHook变量记录了客户选择的产品类型，和默认页面打开的产品类型。主要用于判断是否是升级操作计算价钱，和判断音乐包有效时间
		//到期时间函数 VIP
		addMonth = function(t, num) {
			if (isNaN(num)) return;
			if (t) {
				var date = new Date(t.replace(/-/g, "/"));
				date.setDate(date.getDate() + 31 * num);
				Kg.$(".vip_valid").html(new Date(date).format('yyyy-MM-dd'));
			} else {
				var date = new Date();
				date.setDate(date.getDate() + 31 * num);
				Kg.$(".vip_valid").html(new Date(date).format('yyyy-MM-dd'));
			}
		},
		//到期时间函数 MUSIC
		addMonthMusic = function(t, num) {

			if (isNaN(num)) return;
			if (t) {
				// alert(timeHook)
				// alert(kguser["vipType"])
				if(timeHook != 1 && fromUrl != "vip" && action != "continue"){
				// if(kguser["vipType"] < timeHook){
					num = num - kguser["musicUpgradeMonths"]; //num为升级月份数减去可升级月份数 
					if(num < 0){
						num = 0;
					}
				}
				var date = new Date(t.replace(/-/g, "/"));
				date.setDate(date.getDate() + 31 * num);
				Kg.$(".music_valid").html(new Date(date).format('yyyy-MM-dd'));
			} else {
				var date = new Date();
				date.setDate(date.getDate() + 31 * num);
				Kg.$(".music_valid").html(new Date(date).format('yyyy-MM-dd'));
			}
		},
		timeShowFn = function(m){
			var vip = Kg.$(".vip_bold"),
				music = Kg.$(".music_bold");
			switch (m){
				case 0:
				case 1:
					vip.css("display","inline-block");
					music.css("display","none");
				break;
				case 31:
				case 33:
					vip.css("display","none");
					music.css("display","inline-block");
				break;
				case 11:
				case 13:
					vip.css("display","inline-block");
					music.css("display","inline-block");
					if(Number(version) < 7700){
						music.css("display","none");
					}

				break;
			}
		},
		/**
		 * 根据开通时长获得的最终 有效期 & 应付金额
		 * @param: { number} 月份
		 * @param: { number} 应付金额
		 */
		payTotalInit = function(month, price) {
			upgradeSum(kguser.rechargeType, month, price); //检查是否为升级操作
			// upgradeSum(timeHook, month, price); //检查是否为升级操作
		},
		// 
		/**
		 * 判断入口 vip & music
		 * @param: userType 用户身份 0：普通用户；  1：vip用户； 2：300音乐包；3:500音乐包；4：300+vip; 5:500+vip
		 * @param: type 用户当前属于的身份
		 */
		vipMusicFn = function(userType,type){
			var myIntro = document.getElementById('mod_vip_intro');

			switch (fromUrl){
				case "music":
					switch (userType){
						case 0:
							musicInfoInit(type,userType);
							timeShowFn(31);
						break;
						case 1:
							musicInfoInit(type,userType);
							timeShowFn(31);
						break;
						case 2:
							musicInfoInit(type,userType);
							timeShowFn(33);
						break;
						case 3:
							musicInfoInit(type,userType);
							timeShowFn(33);
							// Kg.$(".wing_main_content").html(noneProduct);

						break;
						case 4:
							musicInfoInit(type,userType);
							timeShowFn(11);
						break;
						case 5:
							musicInfoInit(type,userType);
							timeShowFn(13);
							// Kg.$(".wing_main_content").html(noneProduct);
						break;
					}
				break;
				// 默认为VIP入口
				default:
					switch (userType){
						case 0:
							vipInfoInit(0,userType);
							timeShowFn(1);
						break;
						case 1:
							vipInfoInit(1,userType);
							timeShowFn(1);
						break;
						case 2:
							vipInfoInit(type,userType);
							timeShowFn(1);
						break;
						case 3:
							vipInfoInit(33,userType);
							timeShowFn(1);
						break;
						case 4:
							vipInfoInit(11,userType);
							timeShowFn(11);
						break;
						case 5:
							vipInfoInit(13,userType);
							timeShowFn(13);
						break;
					}
			}
		},
		/*
		 * 页面 vip 介绍init
		 */
		vipInfoInit = function(type,userType) {
			kguser.rechargeType = type; //用户选择的充值类型
			var selectOptionDom = Kg.$("#rechargeType a"),
				myIntro = document.getElementById('mod_vip_intro'), //左侧文字介绍
				// myBtn = document.getElementById('mod_vip_other'), //左侧其它VIP类型
				rechargeTypeNormal = document.getElementById('rechargeTypeGold'), //会员类型第一个按钮
				rechargeTypeSuper = document.getElementById('rechargeTypePurple'), //会员类型第二个按钮
				rechargeTypeBase = document.getElementById('rechargeTypeBase'); //会员类型第三个按钮
			
			selectOptionDom.removeClass("rc_btn_s1_cur");
			
			userStyleFnVip(type,userType);

			switch (type) {
				case 1:
					//普通VIP用户
					window.payInfo.vipType = 1;
					timeHook = 1;
					productFn(1);

					// 普通vip
					rechargeTypeNormal.onclick = function() {
						vipInfoInit(1);
						timeShowFn(1);
					}
					// 300vip
					rechargeTypeSuper.onclick = function() {
						vipInfoInit(11);
						timeShowFn(11);
					};
					// 500vip
					rechargeTypeBase.onclick = function(){
						vipInfoInit(13);
						timeShowFn(13);
					}
					
					Kg.$(rechargeTypeGold).addClass('rc_btn_s1_cur');
					break;

				case 11 :
					//vip+音乐包
					window.payInfo.vipType = 11;
					timeHook = 11;
					productFn(11);

					if(Number(version) < 7700){
						window.payInfo.vipType = 1;
						timeHook = 1;
					}

					rechargeTypeSuper.onclick = function(){
						vipInfoInit(11);
						timeShowFn(11);
					}
					rechargeTypeNormal.onclick = function(){
						vipInfoInit(1);
						timeShowFn(1);
					}

					Kg.$(rechargeTypePurple).addClass('rc_btn_s1_cur');
					
				break;
				case 13 : 
					//VIP+豪华音乐包
					window.payInfo.vipType = 13;
					timeHook = 13;
					productFn(13);

					if(Number(version) < 7700){
						window.payInfo.vipType = 1;
						timeHook = 1;
					}

					rechargeTypeNormal.onclick = function(){
						vipInfoInit(1);
						timeShowFn(1);
					}
					Kg.$(rechargeTypeBase).addClass('rc_btn_s1_cur');
				break;
				case 31:
					//音乐包会员
					window.payInfo.vipType = 1;
					timeHook = 1;
					productFn(1);
					
					rechargeTypeSuper.onclick = function() {
						payInfo.upgradeType = 1;
						vipInfoInit(11);
						timeShowFn(11);
					};
					rechargeTypeNormal.onclick = function() {
						vipInfoInit(1);
						timeShowFn(1);
					}
					Kg.$(rechargeTypeGold).addClass('rc_btn_s1_cur');

					break;
				case 33:
					//豪华音乐包会员
					window.payInfo.vipType = 1;
					timeHook = 1;
					productFn(1);
					
					rechargeTypeGold.onclick = function(){
						vipInfoInit(1);
						timeShowFn(1);
					}
					rechargeTypeBase.onclick = function(){
						vipInfoInit(13);
						timeShowFn(13);
					}
					
					Kg.$(rechargeTypeGold).addClass('rc_btn_s1_cur');

					break;
				default:
					//普通用户
					window.payInfo.vipType = 1;
					timeHook = 1;
					productFn(1);

					// vip+音乐包
					rechargeTypeSuper.onclick = function() {
						vipInfoInit(11);
						timeShowFn(11);
					};
					// 普通vip
					rechargeTypeNormal.onclick = function() {
						vipInfoInit(1);
						timeShowFn(1);
					}
					// vip+豪华音乐包
					rechargeTypeBase.onclick = function() {
						vipInfoInit(13);
						timeShowFn(13);
					}
					Kg.$(rechargeTypeGold).addClass('rc_btn_s1_cur');
					break;
			}

			//开通时长价格初始化
			var rechargeDurate = document.getElementById('rechargeDurate'),
				rechargeDurateCustom = document.getElementById('rechargeDurateCustom'),
				// timeLongBtns = rechargeDurate.getElementsByTagName('a');
				timeLongBtns = Kg.$("rechargeDurate").find(".open_time_content");

			for (var i = 0, fs, len = timeLongBtns.length; i < len; i++) {
				fs = timeLongBtns[i];
				if (fs.check) {
					if (fs.className.indexOf("_cur") != -1) {
						payTotalInit(fs.getAttribute('data-val'), fs.check());
					} else {
						fs.check();
					}
				}
			}

			//开通时长自定义月数输入框初始化
			if (rechargeDurateCustom.check) {
				if (rechargeDurateCustom.className.indexOf("_cur") != -1) {
					payTotalInit(rechargeDurateCustom.getAttribute('data-val'), rechargeDurateCustom.check());
				} else {
					rechargeDurateCustom.check();
				}
			}
			// console.log("vip");
		},
		/*
		 * 页面 音乐包 介绍init
		 */
		musicInfoInit = function(type,userType) {
			kguser.rechargeType = type; //用户选择的充值类型
			var selectOptionDom = Kg.$("#rechargeType a"),
				myIntro = document.getElementById('mod_vip_intro'), //左侧文字介绍
				// myBtn = document.getElementById('mod_vip_other'), //左侧其它VIP类型
				rechargeTypeNormal = document.getElementById('rechargeTypeGold'), //会员类型第一个按钮
				rechargeTypeSuper = document.getElementById('rechargeTypePurple'), //会员类型第二个按钮
				rechargeTypeBase = document.getElementById('rechargeTypeBase'), //会员类型第三个按钮
				rechargeType500 = document.getElementById('rechargeType500'); //会员类型第四个按钮
			
			selectOptionDom.removeClass("rc_btn_s1_cur");

			userStyleFnMusic(type,userType);

			switch (type) {
				case 13:
					// vip+豪华包
					window.payInfo.vipType = 11;
					timeHook = 11;
					productFn(11);

					// vip+音乐包
					rechargeTypeNormal.onclick = function() {
						musicInfoInit(31,userType);
						timeShowFn(31);
					};
					rechargeTypePurple.onclick = function(){
						musicInfoInit(33,userType);
						timeShowFn(33);
					};
					rechargeTypeBase.onclick = function(){
						musicInfoInit(11,userType);
						timeShowFn(11);
					}
					Kg.$(rechargeTypeSuper).addClass('rc_btn_s1_cur');
				break;
				case 11:
				
					// vip+音乐包
					/*根据用户的属性来判断升级何种类型*/
					if(action === "continue" || userType != 4){
						window.payInfo.vipType = 11;
						timeHook = 11;
						productFn(11);
						Kg.$(rechargeTypeBase).addClass('rc_btn_s1_cur');
					}else{
						window.payInfo.vipType = 11;
						timeHook = 11;
						productFn(11);
						Kg.$(rechargeType500).addClass('rc_btn_s1_cur');
					}

					rechargeTypePurple.onclick = function(){
						musicInfoInit(33,userType);
						timeShowFn(33);
					};
					rechargeTypeNormal.onclick = function(){
						musicInfoInit(31,userType);
						timeShowFn(31);
					};
					
				break;
				case 31:
					//音乐包会员
					
					/*根据用户的属性来判断升级何种类型*/
					
					if(action === "continue" || userType != 2){
						window.payInfo.vipType = 31;
						timeHook = 31;
						productFn(31);
						Kg.$(rechargeTypeGold).addClass('rc_btn_s1_cur');
					}else{
						window.payInfo.vipType = 33;
						timeHook = 33;
						productFn(33);
						Kg.$(rechargeTypePurple).addClass('rc_btn_s1_cur');
					}
					
					
					rechargeTypeSuper.onclick = function() {
						musicInfoInit(33,userType);
						timeShowFn(33);
					};
					rechargeTypeBase.onclick = function() {
						musicInfoInit(11,userType);
						timeShowFn(11);
					};

					
					// rechargeTypeBase.onclick = function(){
					// 	musicInfoInit(13,userType);
					// }
					break;
				case 33:
					//豪华音乐包会员
					window.payInfo.vipType = 33;
					timeHook = 33;
					productFn(33);
					
					rechargeTypeBase.onclick = function(){
						musicInfoInit(11,userType);
						timeShowFn(11);
					};
					rechargeTypeNormal.onclick = function() {
						musicInfoInit(31,userType);
						timeShowFn(31);
					};
					
					Kg.$(rechargeTypePurple).addClass('rc_btn_s1_cur');
					break;
				case 1 :
					//普通VIP用户
					window.payInfo.vipType = 31;
					timeHook = 31;
					productFn(31);
					
					// vip+音乐包
					rechargeTypeBase.onclick = function() {
						musicInfoInit(11,userType);
						timeShowFn(11);
					};
					
					rechargeTypeSuper.onclick = function() {
						musicInfoInit(33,userType);
						timeShowFn(33);
					};

					Kg.$(rechargeTypeGold).addClass('rc_btn_s1_cur');
					break;
				default:
					//普通用户
					window.payInfo.vipType = 31;
					timeHook = 31;
					productFn(31);
					
					// 豪华音乐包
					rechargeTypeSuper.onclick = function() {
						musicInfoInit(33,userType);
						timeShowFn(33);
					};
					// vip+音乐包
					rechargeTypeBase.onclick = function() {
						musicInfoInit(11,userType);
						timeShowFn(11);
					};
					
					

					Kg.$(rechargeTypeGold).addClass('rc_btn_s1_cur');
					break;
			}

			//开通时长价格初始化
			var rechargeDurate = document.getElementById('rechargeDurate'),
				rechargeDurateCustom = document.getElementById('rechargeDurateCustom'),
				// timeLongBtns = rechargeDurate.getElementsByTagName('a');
				timeLongBtns = Kg.$("rechargeDurate").find(".open_time_content");

			for (var i = 0, fs, len = timeLongBtns.length; i < len; i++) {
				fs = timeLongBtns[i];
				if (fs.check) {
					if (fs.className.indexOf("_cur") != -1) {
						payTotalInit(fs.getAttribute('data-val'), fs.check());

					} else {
						fs.check();
					}
				}
			}
			//开通时长自定义月数输入框初始化
			if (rechargeDurateCustom.check) {

				if (rechargeDurateCustom.className.indexOf("_cur") != -1) {
					payTotalInit(rechargeDurateCustom.getAttribute('data-val'), rechargeDurateCustom.check());
				} else {
					rechargeDurateCustom.check();
				}
			}
			// console.log("music");
		},
		/*vip根据用户属性来判断显示会员开通类型*/
		userStyleFnVip = function(type,userType){
			var goldEm = Kg.$("#rechargeTypeGold").find(".product_price1 em"),
				PurpleEm = Kg.$("#rechargeTypePurple").find(".product_price1 em"),
				BaseEm = Kg.$("#rechargeTypeBase").find(".product_price1 em"),
				Purpleprice2 = Kg.$("#rechargeTypePurple").find(".product_price2");
			switch (userType){
				case 0 :
					goldEm.html(productPrice["1"]["total"]);
					PurpleEm.html(productPrice["11"]["total"]);
					BaseEm.html(productPrice["13"]["total"]);
					// Kg.$("#rechargeTypePurple").find(".product_price2").html("原价 <em>"+productPrice["11"]["original"]+"元</em>省"+productPrice["11"]["gift"]+"元").show();
					Purpleprice2.html("原价 <em>"+productPrice["11"]["original"]+"元</em>").show();
				break;
				case 1 :
					// rechargeTypeGold.innerHTML = "续费VIP";
					// rechargeTypePurple.innerHTML = "购买300VIP套餐";
					// rechargeTypeBase.innerHTML = "购买500vip套餐";
					goldEm.html(productPrice["1"]["total"]);
					PurpleEm.html(productPrice["11"]["total"]);
					BaseEm.html(productPrice["13"]["total"]);
					Purpleprice2.html("原价 <em>"+productPrice["11"]["original"]+"元</em>").show();
				break;
				case 2 : 
					goldEm.html(productPrice["1"]["total"]);
					PurpleEm.html(productPrice["11"]["total"]);
					Purpleprice2.html("原价 <em>"+productPrice["11"]["original"]+"元</em>").show();
					rechargeTypeBase.style.display ="none";
				break;
				case 3 :
					goldEm.html(productPrice["1"]["total"]);
					PurpleEm.html(productPrice["13"]["total"]);
					rechargeTypePurple.style.display = "none";
				break;
				case 4 :
					goldEm.html(productPrice["1"]["total"]);
					PurpleEm.html(productPrice["11"]["total"]);
					Purpleprice2.html("原价 <em>"+productPrice["11"]["original"]+"元</em>").show();
					rechargeTypeBase.style.display = "none";
				break;
				case 5 :
					goldEm.html(productPrice["1"]["total"]);
					BaseEm.html(productPrice["13"]["total"]);
					rechargeTypePurple.style.display = "none";
				break;
			}
		},
		/*Music根据用户属性来判断显示会员开通类型*/
		userStyleFnMusic = function(style,userType){
			var $rechargeTypeBase = Kg.$("#rechargeTypeBase"),
				$rechargeType500 =  Kg.$("#rechargeType500"),
				$rechargeTypeGold =  Kg.$("#rechargeTypeGold"),
				$rechargeTypePurple = Kg.$("#rechargeTypePurple");
			switch (userType){
				case 0 :
					$rechargeTypeBase.find(".product").html("豪华VIP <span class='gray'>( 尊享VIP特权，开通即送音乐包 )</span>");
					$rechargeTypeGold.find(".product").html("音乐包 <span class='gray'>( 300首下载，无限畅听 )</span>");
					$rechargeTypePurple.find(".product").html("豪华音乐包 <span class='gray'>( 500首下载，无限畅听 )</span>");

					$rechargeTypeBase.find(".product_price1 em").html(productPrice["11"]["total"]);
					// Kg.$("#rechargeTypeBase").find(".product_price2").html("原价 <em>"+productPrice["11"]["original"]+"元</em>省"+productPrice["11"]["gift"]+"元").show();
					$rechargeTypeBase.find(".product_price2").html("原价 <em>"+productPrice["11"]["original"]+"元</em>").show();
					$rechargeTypeGold.find(".product_price1 em").html(productPrice["31"]["total"]);
					$rechargeTypePurple.find(".product_price1 em").html(productPrice["33"]["total"]);
					rechargeTypeBase.style.display = "block";
				break;
				case 1 :
					$rechargeTypeBase.find(".product").html("豪华VIP <span class='gray'>( 尊享VIP特权，开通即送音乐包 )</span>");
					$rechargeTypeGold.find(".product").html("音乐包 <span class='gray'>( 300首下载，无限畅听 )</span>");
					$rechargeTypePurple.find(".product").html("豪华音乐包 <span class='gray'>( 500首下载，无限畅听 )</span>");

					$rechargeTypeBase.find(".product_price1 em").html(productPrice["11"]["total"]);
					$rechargeTypeBase.find(".product_price2").html("原价 <em>"+productPrice["11"]["original"]+"元</em>").show();
					$rechargeTypeGold.find(".product_price1 em").html(productPrice["31"]["total"]);
					$rechargeTypePurple.find(".product_price1 em").html(productPrice["33"]["total"]);
					rechargeTypeBase.style.display = "block";
					
				break;
				case 2 : 
					if(action === "continue"){
						$rechargeTypeGold.find(".product").html("音乐包 <span class='gray'>( 300首下载，无限畅听 )</span>");
						$rechargeTypeBase.find(".product").html("豪华VIP <span class='gray'>( 尊享VIP特权，开通即送音乐包 )</span>");
						$rechargeTypeGold.find(".product_price1 em").html(productPrice["31"]["total"]);
						$rechargeTypeBase.find(".product_price1 em").html(productPrice["11"]["total"]);
						$rechargeTypeBase.find(".product_price2").html("原价 <em>"+productPrice["11"]["original"]+"元</em>").show();

						rechargeTypePurple.style.display = "none";
						rechargeTypeBase.style.display = "block";
					}else{
						rechargeTypeGold.style.display = "none";
						rechargeTypeBase.style.display = "none";
						$rechargeTypePurple.find(".product").html("豪华音乐包 <span class='gray'>( 500首下载，无限畅听 )</span>");
						$rechargeTypePurple.find(".product_price1 em").html(productPrice["33"]["total"]);
					}
					
				break;
				case 3 :
					rechargeTypeGold.style.display = "none";
					rechargeTypeBase.style.display = "none";
					$rechargeTypePurple.find(".product").html("豪华音乐包 <span class='gray'>( 500首下载，无限畅听 )</span>");
					$rechargeTypePurple.find(".product_price1 em").html(productPrice["33"]["total"]);
					/*暂时没有内容*/
					// return false;
				break;
				case 4 :
					if(action === "continue"){
						$rechargeTypeGold.find(".product").html("音乐包 <span class='gray'>( 300首下载，无限畅听 )</span>");
						$rechargeTypeBase.find(".product").html("豪华VIP <span class='gray'>( 尊享VIP特权，开通即送音乐包 )</span>");
						$rechargeTypeGold.find(".product_price1 em").html(productPrice["31"]["total"]);
						$rechargeTypeBase.find(".product_price1 em").html(productPrice["11"]["total"]);
						$rechargeTypeBase.find(".product_price2").html("原价 <em>"+productPrice["11"]["original"]+"元</em>").show();

						rechargeTypePurple.style.display = "none";
						rechargeTypeBase.style.display = "block";
						//rechargeTypeBase.style.display = "none";
						// rechargeType500.style.display ="inline-block";
					}else{
						$rechargeTypePurple.find(".product").html("豪华音乐包 <span class='gray'>( 500首下载，无限畅听 )</span>");
						$rechargeTypePurple.find(".product_price1 em").html(productPrice["33"]["total"]);

						rechargeTypeGold.style.display = "none";
						rechargeTypeBase.style.display = "none";
					}
					
				break;
				case 5 :
					rechargeTypeGold.style.display = "none";
					rechargeTypeBase.style.display = "none";
					$rechargeTypePurple.find(".product").html("豪华音乐包 <span class='gray'>( 500首下载，无限畅听 )</span>");
					$rechargeTypePurple.find(".product_price1 em").html(productPrice["33"]["total"]);
					/*暂时没有内容*/
					// return false;
				break;
			}
		},

		upgradeSum = function(type, month, price) {
			// console.log(type, month, price)
			
			/*如果是升级计算其可升级月数及优惠额*/
			month = month || 0; //实际需要升级的月数
			var up_grade_info = Kg.$("#calcUpGrade"), //升级计算
				payTotalDom = document.getElementById('money'); //预计总付费金额
			
				// 此处用于判断是否为升级操作，如果当前身份小于产品类型视为升级操作,只有音乐包入口才有升级操作,同时添加是否为续费入口，如果是续费入口，按原价显示

				if( kguser["vipType"] != 0 && Number(timeHook) != 1 && kguser["vipType"] != 1 && fromUrl == "music" && action !== "continue"){

					var month2 = month - kguser["musicUpgradeMonths"];
					// 如果升级月数小于或等于可升级的月数，直接用月数*升级价
					if(month2 <= 0){
						payInfo.total = month * kguser["musicUpgradePrice"];
					}else{
						payInfo.total = kguser["musicUpgradeMonths"] * kguser["musicUpgradePrice"] + month2 * kguser["musicFullPrice"] ;
					}

					// 如果是升级vip+音乐包套餐，需要加上vip价格
					if(Number(timeHook) == 11 || Number(timeHook) == 13){
						payInfo.total += month * kguser["vipFullPrice"];
					}

					// payInfo.total = price - kguser["musicUpgradeMonths"] * kguser["musicUpgradePrice"];
					payInfo.total < 0 ? payInfo.total = 0 : "";
					
				}else{
					payInfo.total = price;
				}
				
				payTotalDom.innerHTML = ' <strong>' + payInfo.total/*.toFixed(2)*/ + '</strong> 元';

				timeFn(timeHook,month);
				payInfo.month = month;
				up_grade_info.hide();
			
		},
	// 判断有效期时间
		timeFn = function(timeHook,month){
			// console.log(timeHook)
			switch (timeHook){
				case 1 : 
					addMonth(kguser['SurplusDay'], month);
					addMonthMusic(kguser["musicEndTime"],0);
				break;
				case 31 :
				case 33 :
					addMonth(kguser['SurplusDay'], 0);
					addMonthMusic(kguser["musicEndTime"],month);
				break;
				case 11 : 
				case 13 :
					addMonth(kguser['SurplusDay'], month);
					addMonthMusic(kguser["musicEndTime"],month);
				break;
			}
		},

		//浮层
		popTips = {
			normal: function() {
				var o = {
					dom: Kg.$("#loginname")[0],
					str: '开通VIP即可享多项特权！<a target="_blank" href="' + kg_vip_domain + 'privilege_duibi.html">查看会员特权</a>'
				};
				// popLayerTips(o);
				// Kg.addEvent(window, "resize", function() {
				// 	popLayerTips(o);
				// });
			},
			gold: function() {
				var o = {
					dom: Kg.$("#loginname")[0],
					str: '升级钻石会员即可享多项特权！<a target="_blank" href="' + kg_vip_domain + 'privilege_duibi.html">查看会员特权</a>'
				};
				// popLayerTips(o);
				// Kg.addEvent(window, "resize", function() {
				// 	popLayerTips(o);
				// });
			}
		},
		/*
		 * 页面 vip充值部分初始化
		 */
		vipPayInit = function(res) {
			var loginname = document.getElementById('loginname'), //账号名称
				loginnameTitle = document.getElementById('loginnameTitle'), //续费 or 开通
				myIntro = document.getElementById('mod_vip_intro'), 
				rechargeType = document.getElementById('rechargeType'), //右侧按钮 父级
				rechargeTypeGold = document.getElementById('rechargeTypeGold'), //普通VIP
				rechargeTypePurple = document.getElementById('rechargeTypePurple'), //豪华VIP
				rechargeTypeBase = document.getElementById('rechargeTypeBase'),
				recharge_url2 = document.getElementById("recharge_url2"), //顶部充值按钮

				rechargeTime = document.getElementById('rechargeTime'), //有效期至　
				// myBtn = document.getElementById('mod_vip_other'), //其它开通推荐

				rechargeTimeout = document.getElementById('rechargeTimeout'), //有效期至　
				// rechargeInfo = document.getElementById('rechargeInfo'), //当前身份信息
				money = document.getElementById('money'), //应付总金额
				userTimeVip = Kg.$(".user_style_vip").parent(),
				userTimeMusic = Kg.$(".user_style_music").parent(),
				userTimeVipBox = Kg.$(".user_style_time_vip"),
				userTimeMusicBox = Kg.$(".user_style_time_music"),

				// 初始化
				initHandle = function() {
					//开通时长事件绑定
					var rechargeDurate = document.getElementById('rechargeDurate'),
						rechargeDurateCustom = document.getElementById('rechargeDurateCustom'),

						// timeLongBtns = rechargeDurate.getElementsByTagName('a'),
						timeLongBtns = rechargeDurate.getElementsByTagName('p'),
						// timeLongBtns = Kg.$("rechargeDurate").find(".open_time_content")[0],
						timeLongBtnInit = function(elm) {
							elm.check = function() {
								var she = this,
									myParent = she.parentNode,
									myVal = she.getAttribute("data-val"), //时长
									moneyElm = Kg.$(myParent).find('.rc_durate_money')[0], //现价
									discountElm = Kg.$(myParent).find('.rc_durate_discount')[0], //原价
									discountResultElm = Kg.$(myParent).find('.rc_durate_discount_result')[0], //省下
									priceObj = calculatePrice({
										'type': Number(payInfo.vipType)||1,
										'month': Number(myVal)||0
									}),
									myDiscount = priceObj.original,
									myDiscountResult = priceObj.original - priceObj.total,
									myMoney = priceObj.total;

								moneyElm.innerHTML = myMoney ? ('<strong>' + myMoney/*.toFixed(2)*/ + '元</strong>') : '';
								discountElm.innerHTML = myDiscountResult ? "原价"/*+(myDiscount.toFixed(2))*/ : '';
								discountResultElm.innerHTML = myDiscountResult ? (' <strong>' + myDiscount/*.toFixed(2)*/ + '元</strong> ') : '';
								//获取目前选择的开通月数
								for (var i = 0, fs, len = timeLongBtns.length; i < len; i++) {
									fs = timeLongBtns[i];
									if (/_cur/g.test(fs.className)) {
										kguser.rechargeMonths = fs.getAttribute("data-val"); //选择的充值时长
									}
								}
								return myMoney;
							};
							elm.onclick = function() {
								for (var i = 0, fs, len = timeLongBtns.length; i < len; i++) {
									fs = timeLongBtns[i];
									fs.className = fs.className.replace(/\s*\w+_cur\s*/g, " ");
									fs.style.borderColor = "";
								}

								rechargeDurateCustom.className = rechargeDurateCustom.className.replace(/\s*\w+_cur\s*/g, " ");

								this.className += ' ' + this.className.trim() + '_cur';
								payTotalInit(this.getAttribute('data-val'), this.check());
							};

						};
					for (var i = 0, fs, len = timeLongBtns.length; i < len; i++) {
						fs = timeLongBtns[i];
						timeLongBtnInit(fs);
						fs.check();
					}

					//开通时长自定义月数输入框初始化
					timeLongBtnInit(rechargeDurateCustom);
					rechargeDurateCustom.onkeyup = function(){
						var myVal = this.value.trim();
						Kg.$("#open_time_input").attr("data-val",myVal);
						if (isNaN(myVal) || !myVal) {
							this.value = "";
							this.setAttribute('data-val', 0);
						} else {
							myVal = parseInt(myVal, 10);
							this.value = myVal;
							this.setAttribute('data-val', myVal);
						}
						this.check();
						payTotalInit(this.getAttribute('data-val'), this.check());
					};

					rechargeDurateCustom.check();

					Kg.$('#showOtherBlank').addEvent('click', function() {
						Kg.$(this).hide();
						Kg.$('#bank_list').css("height", "354px");
					});

					Kg.$('#bank_list').find('label').addEvent('click', function(event) {
						btnSelected(this, 4);
					});

					Kg.$('#rechargeSubmit')[0].onclick = payHandle;

					// 判断用户可升级月份数，如果不为0，则只能升级可升级的月份数
					// 这里直接给用户自定义输入框赋值为可升级月份数，同时默认选中自定义输入框，只有音乐包入口有升级操作
					if(kguser["musicUpgradeMonths"] != undefined && kguser["musicUpgradeMonths"] != 0 && fromUrl == "music" && action !== "continue"){
						Kg.$("#open_time_input").attr("data-val",kguser["musicUpgradeMonths"]);
						Kg.trigger(timeLongBtns[3], 'click');
						Kg.$("#rechargeDurate").hide();
						Kg.$(".upgrade").html(kguser["musicUpgradeMonths"]+"个月");
						Kg.$("#rechargeDurateArea").css("margin-bottom","0");
						// payTotalInit(kguser["musicUpgradeMonths"], kguser["musicUpgradePrice"]);
					}else if(fromUrl == "music"){
						Kg.trigger(timeLongBtns[1], 'click');
					}else{
						Kg.trigger(timeLongBtns[2], 'click');
					}
					
					// alert(kguser["musicUpgradeMonths"])
					Kg.trigger(Kg.$('.bank_list_box1')[0], 'click');
					setTimeout(function(){
						funnelFn(kguser.rawVipEndTime,"5018");
					},100);
				},

				//付款事件绑定
				payHandle = function(e) {
					stopDefault(e)
					stopBubble(e);
					sdnClick(923);
					vipFromClick(1);
					sourceStat({
						name: 'statpay'
					});

					var myPayInfo = window.payInfo;

					if (myPayInfo.isPay) {
						return false;
					}

					var kugouid = read("KuGoo").KugooID;

					if (!kugouid) {
						UsLogin();
						return false;
					}
					kguser.username = unescape(Kg.Cookie.read("KuGoo", "NickName"));
					if (myPayInfo.month == 0 || myPayInfo.total == 0) {
						popup('请选择开通月份');
						return;
					}
					
					if (!myPayInfo.payway) {
						popup('请选择银行');
						return;
					}

					switch (myPayInfo.bankId) {
						case 'alipay':
							myPayInfo.paytype = 3;
							break;

						case 'tenpay':
							myPayInfo.paytype = 29;
							break;
						case 'weixinpay':
							//把37 改为40 微信二维码支付 
							myPayInfo.paytype = 40;
							break;
						default:
							myPayInfo.paytype = 24;
							break;
					}

					if (!sources || (typeof sources == "undefined")) {
						sources = "";
					}

					myPayInfo.isPay = true;
					if(myPayInfo.paytype != 40){
						var url = kg_domain + "recharge/getpayurl&paytype=" + myPayInfo.paytype + "&alipayBankId=" + myPayInfo.bankId + "&bankId=" + myPayInfo.bankId + "&kugouid=" + kugouid + "&month=" + myPayInfo.month + "&viptype=" + myPayInfo.vipType + "&sources=" + sources + "&upgrade=" + payInfo.upgradeType +"&autoSubmit=1&n=" + Math.random();
						Kg.getJSON(
							url,
							null,
							function(result) {
								if (result.status != 1) {
									popup('操作失败，错误：' + result.error + '。');
								} else {
									var block = document.getElementById('payment_form_block'),
										orderNumber = result.orderNumber;
									if (block === null) {
										Kg.$('body').append('<div id="payment_form_block" style="display:none;"></div>');
									}
									Kg.$('#payment_form_block').html(result.actionUrl);

									/*跨机房容灾，执行函数，返回不同的URL地址*/
									checkDomainURL.init();

									//重构内容
									html = [
										'<div class="pop_payok" id="pop_payok">',
										'<div class="txt"><h6>【充值账号】<span>' + window.kguser.username + '</span></h6>',
										'<p>【充值时长】<em>' + myPayInfo.month + '个月</em><br/>',
										'【总　　额】<span>' + myPayInfo.total + '元</span><br/>',
										'【付款方式】<em>' + myPayInfo.payway + '</em></p></div>',
										'<div class="btns">',
										'<p>确定要为当前酷狗会员进行充值？</p>',
										'<a href="javascript:;" id="pop_payokSubmit" class="pop_btn_ok" target="_blank">确定充值</a>',
										'<a href="javascript:;" class="pop_btn_cancel">取消</a>',
										'</div></div>'
									].join("");
									popupShow("确认充值", html);
									Kg.$('#pop_payokSubmit')[0].onclick = function(e) {
										stopDefault(e);
										stopBubble(e);
										/*跨机房容灾，切换不同URL*/
										var payUrl = Kg.$("#payment_form_block form").attr("action");
											payUrl = payUrl.substring(payUrl.indexOf("/",8));
										Kg.$("#payment_form_block form").attr("action",checkDomainURL.defaultDomainURL+payUrl);

										popupShow("提示", [
											'<p>充值前请不要关闭此窗口.完成充值后请根据您的情况点击下面的按钮。</p><span style="color:#FF8040;font-size:12px">（温馨提醒：成功开通/续费VIP后，在酷狗客户端重新登录即可生效）</span>',
											'<p align="center"><a href="javascript:;" class="vip_rechargeok_btn" title="已完成充值">已完成充值</a>　　<a href="javascript:;" class="vip_introble_btn" title="充值遇到问题">充值遇到问题</a></p>'
										].join(""));

										sdnClick(924);
										vipFromClick(2);
										sourceStat({
											name: 'statbank'
										});
										document.payment_gateway.submit();
										// 漏斗统计
										funnelFn(kguser.rawVipEndTime,"5001",orderNumber);

										Kg.$(".vip_rechargeok_btn")[0].onclick = function(e){
											stopDefault(e);
											stopBubble(e);
											funnelFn(kguser.rawVipEndTime,"5004",orderNumber);
											window.location.href = "http://vip.kugou.com";
										}
										Kg.$(".vip_popup_close")[0].onclick = function(e){
											stopBubble(e);
											stopDefault(e);
											funnelFn(kguser.rawVipEndTime,"5006",orderNumber);
											window.location.href = "http://vip.kugou.com";
										}
										Kg.$(".vip_introble_btn")[0].onclick = function(e){
											stopDefault(e);
											stopBubble(e);
											funnelFn(kguser.rawVipEndTime,"5005",orderNumber);
											window.location.href = "http://vip.kugou.com/help.html";
										}
									};



									Kg.$(".pop_btn_cancel")[0].onclick = function(e){
										stopDefault(e);
										stopBubble(e);
										funnelFn(kguser.rawVipEndTime,"5002",orderNumber);
										closePop();
									}
									// 解决x下面注释函数中kg库 绑定事件 出现的 跨域问题(奇葩问题) 
									Kg.$(".vip_popup_close")[0].onclick =function(e){
										stopDefault(e);
										stopBubble(e);
										funnelFn(kguser.rawVipEndTime,"5003",orderNumber);
										closePop();
										myPayInfo.isPay = false;
									};

								}
								//确认完成
								myPayInfo.isPay = false;
							}, null, false
						);
					}else{
						// 微信二维码支付
						var Eurl = kg_domain + "recharge/getpayurl&paytype=" + myPayInfo.paytype + "&alipayBankId=" + myPayInfo.bankId + "&bankId=" + myPayInfo.bankId + "&kugouid=" + kugouid + "&month=" + myPayInfo.month + "&viptype=" + myPayInfo.vipType + "&sources=" + sources + "&upgrade=" + payInfo.upgradeType + "&n=" + Math.random();
						content = ["<div class='wexinPaytTitle'>微信支付<span class='wexinPayClose'></span></div>",
						 			"<div class='weixinImg' id='weixinImg'></div>",
						 			"<div class='Loading'><img src='../static/images/pc_pay_loading.gif' /></div>",
						 			"<div class='describle' id='iframeDiv_describle'><img src='../static/images/code.png' /><span>请使用微信扫码完成付款</span></div>",
                                	"<div class='price weixinPrice'><strong>"+myPayInfo.total+"</strong>元</div>"].join("");
						popupShow("微信支付",content);
						//获取二维码 
						Kg.getJSON(
							Eurl,
							null,
							function(result) {
								if(result){	
									
									var qrcodeimg = new Image();
		                            qrcodeimg.src= result.actionUrl;
		                            qrcodeimg.onerror=function(){
		                            	alert("二维码加载失败,请重试!");
										myPayInfo.isPay = false;
		                            };
		                            Kg.$(".weixinImg").append(qrcodeimg);
		                            qrcodeimg.onload = function(){
		                            	qrcodeimg.style.cssText="width:200px; height:200px; display:block";
		                            	Kg.$(".Loading").hide();
		                            	Kg.$(".weixinImg").show()
		                            }
		                           
		                            Kg.$(".wexinPayClose")[0].onclick =function(e){
		                            	try{
											funnelFn(kguser.rawVipEndTime,"5003",result.orderNumber);
		                            	}catch(e){}

										closePop();
										myPayInfo.isPay = false;
										stopDefault(e);
										stopBubble(e);
									};
		       						
								}
	                            
							}, null, false)	
					}

					// 漏斗统计
					funnelFn(kguser.rawVipEndTime,"5000");
				},

				infoStr = '';

			if (!window.kugouid) {
				//未登录
				loginname.innerHTML = '<a href="javascript:UsLogin();" title="" class="vip_btn_style01"><span>登录</span></a>';
				popTips.normal();
				vipMusicFn(0,0);
				initHandle();
			} else {
				Kg.getJSON(url + "recharge/roleinfo", {
					n: Math.random()
				}, function(res) {
					if (res) {
						
						kguser.username = loginname.innerHTML = unescape(Kg.Cookie.read("KuGoo", "NickName"));
						kguser.rawVipEndTime = res.rawVipEndTime;
						/** 
						 * 0-普通用户
						 * 1-VIP
						 * 2-赠送VIP
						 * 3-豪华VIP
						 * 4-赠送豪华VIP
						 * 5-蓝钻vip
						 */	
						 /*只能升级一个月，即使用户可升级月数大于1（20150506改需求）*/
						res["musicUpgradeMonths"] > 1 ? res["musicUpgradeMonths"] = 1: "";	
						
						kguser.vipType = res["role"];
						kguser["SurplusMmonth"] = res["SurplusMmonth"];
						kguser["SurplusDay"] = res["vipEndTime"];
						kguser["musicEndTime"] = res["musicEndTime"];
						kguser["musicUpgradeMonths"] = res["musicUpgradeMonths"];
						kguser["musicUpgradePrice"] = res["musicUpgradePrice"];
						kguser["musicFullPrice"] = res["musicFullPrice"];
						kguser["vipFullPrice"] = res["vipFullPrice"];
						kguser["username"] = res["UM_UserName"];
						kguser["rechargePrice"] = res["rechargePrice"] || 10;
						kguser["isAutoCharge"] = res["isAutoCharge"];
				/************************************************数据模拟*********************************************/
						 // kguser["vipType"] = 31; 
						 // kguser["musicUpgradeMonths"] = 0;
				/********************************************************************************************/
						//  普通VIP
						if (kguser["vipType"] == 1) {
							// loginnameTitle.innerHTML = '开通账号';
							// recharge_url2.innerHTML = '续费VIP';
							productFn(1);

							userTimeVip.show();
							userTimeVipBox.find("span").html("VIP到期时间："+kguser['SurplusDay']);
							// userTimeMusicBox.html("音乐包到期时间：" +kguser["musicEndTime"]);

							// infoStr += '当前身份：VIP会员&nbsp;&nbsp;&nbsp;&nbsp;过期时间：' +kguser['SurplusDay'];
							//凡是VIP用户 可操作的类型为 1与3 即可以续费VIP与开通豪华VIP
							
							vipMusicFn(1,1); //普通VIP用户默认开通豪华VIP
							// 300音乐包用户
						} else if (kguser["vipType"] == 31) {
							productFn(31);

							// loginnameTitle.innerHTML = '开通账号';
							// recharge_url2.innerHTML = '开通VIP';
							if(Number(version) >= 7700){
								userTimeMusic.show();
							}
							// userTimeMusic.show();
							userTimeMusicBox.find("span").html("音乐包到期时间：" +kguser["musicEndTime"]);
							userTimeMusic.find(".user_style_music").addClass("user_style_music2");
							// infoStr += '当前身份：音乐包用户&nbsp;&nbsp;&nbsp;&nbsp;过期时间：' + kguser['SurplusDay'];
							
							vipMusicFn(2,31); //豪华VIP用户默认续费豪华VIP
							//500用户
						} else if (kguser["vipType"] == 33) {
							productFn(33);
							// loginnameTitle.innerHTML = '开通账号';
							// recharge_url2.innerHTML = '开通VIP';
							if(Number(version) >= 7700){
								userTimeMusic.show();
							}
							userTimeMusicBox.find("span").html("音乐包到期时间：" +kguser["musicEndTime"]);
							userTimeMusic.find(".user_style_music").removeClass("user_style_music2");
							// infoStr += '当前身份：豪华音乐包用户&nbsp;&nbsp;&nbsp;&nbsp;过期时间：' + kguser['SurplusDay'];
							
							vipMusicFn(3,33); //音乐包用户默认 开通 豪华音乐包
							//300+vip用户	
						} else if (kguser["vipType"] == 11) {
							productFn(11);
							// loginnameTitle.innerHTML = '续费VIP';
							// recharge_url2.innerHTML = '续费VIP';
							
							userTimeVip.show();
							if(Number(version) >= 7700){
								userTimeMusic.show();
							}
							userTimeVipBox.find("span").html("VIP到期时间："+kguser['SurplusDay']);
							userTimeMusicBox.find("span").html("音乐包到期时间：" +kguser["musicEndTime"]);
							userTimeMusic.find(".user_style_music").addClass("user_style_music2");
							// infoStr += '当前身份：vip+音乐包&nbsp;&nbsp;&nbsp;&nbsp;过期时间：' + kguser['SurplusDay'];
							//凡是VIP用户 可操作的类型为 1与3 即可以续费VIP与开通豪华VIP
							
							vipMusicFn(4,11); //豪华音乐包用户默认 续费 豪华音乐包
							//500 + vip用户
						} else if (kguser["vipType"] == 13) {
							productFn(13);

							// loginnameTitle.innerHTML = '续费VIP';
							// recharge_url2.innerHTML = '续费VIP';
							userTimeVip.show();
							if(Number(version) >= 7700){
								userTimeMusic.show();
							}
							userTimeVipBox.find("span").html("VIP到期时间："+kguser['SurplusDay']);
							userTimeMusicBox.find("span").html("音乐包到期时间：" +kguser["musicEndTime"]);
							userTimeMusic.find(".user_style_music").removeClass("user_style_music2");
							// rechargeTypePurple.innerHTML = '续费豪华音乐包';
							// infoStr += '当前身份：VIP+豪华音乐包&nbsp;&nbsp;&nbsp;&nbsp;过期时间：' + kguser['SurplusDay'];
							
							//凡是VIP用户 可操作的类型为 1与3 即可以续费VIP与开通豪华VIP
							
							vipMusicFn(5,13); //豪华音乐包用户默认 续费 豪华音乐包
							//普通用户
						} else {
							productFn(0);
							// 普通 vipType = 0 | 5 or 过期
							// loginnameTitle.innerHTML = '开通帐号';
							
							// myBtn.style.display = "";
							vipMusicFn(0,0); //普通用户默认开通豪华VIP
						}
						// rechargeInfo.innerHTML = infoStr;
						initHandle();

						if(res["musicUpgradeMonths"] >= 1 && fromUrl == "music" && action !=="continue"){
							Kg.$(".music_getup").css({"display":"inline-block"});
						}else{
							Kg.$(".music_getup").hide();
						}

						// 弹出到期时间
						userTimeVip.addEvent("mousemove",function(){
							userTimeVipBox.show();
						});
						userTimeVip.addEvent("mouseout",function(){
							userTimeVipBox.hide();
						});
						userTimeMusic.addEvent("mousemove",function(){
							userTimeMusicBox.show();
						});
						userTimeMusic.addEvent("mouseout",function(){
							userTimeMusicBox.hide();
						});
						// urlCheck();

						// 漏斗统计
						// funnelFn(kguser.rawVipEndTime);
					}
				});
			}
		},

		/**
		 * 弹出银行列表
		 * 点击元素
		 */
		bankShow = function(dom) {
			Kg.$(dom).find('i').addClass('selected');
			Kg.$(dom).find('i').removeClass('mouse_hoversion');
			Kg.$(dom).find('span').css("background-position", "0 -1200px");
			Kg.$(".bank_list_box").find("i").removeClass('selected');
			Kg.$("#bank_list").show();
		},
		/*左侧产品介绍
		 *产品ID
		*/
		productFn = function(objId){
			var myIntro = document.getElementById('mod_vip_intro')
			switch (objId) {
				case 1:
					myIntro.innerHTML = [
						'<div class="vip_sign_gold">',
						'<span></span>',
						'VIP会员',
						'</div>',
						'<div class="vip_price">10元/月</div>',
						'<div class="vip_detail">',
						'<p><em>1</em>超大云歌单</p>',
						'<p><em>2</em>VIP加速下载</p>',
						'<p><em>3</em>客户端去广告</p>',
						'<p><em>4</em>专属身份标识</p>',
						'<p><em>5</em>尊享高品电台</p>',
						'</div>'
					].join("");
				break;
				case 31:
					myIntro.innerHTML = [
						'<div class="vip_monthlyfree_normal">',
						'<span></span>',
						'音乐包',
						'</div>',
						'<div class="vip_price">8元/月</div>',
						'<div class="vip_detail">',
						'<p><em>1</em>300首付费歌曲下载</p>',
						'<p><em>2</em>付费高品质音乐试听</p>',
						'<p><em>3</em>专属歌曲试听</p>',
						'<p><em>4</em>专属音乐标识</p>',
						'</div>'
					].join("");
				break;
				case 33:
					myIntro.innerHTML = [
						'<div class="vip_monthlyfree_hao">',
						'<span></span>',
						'豪华音乐包',
						'</div>',
						'<div class="vip_price">12元/月</div>',
						'<div class="vip_detail">',
						'<p><em>1</em>500首付费歌曲下载</p>',
						'<p><em>2</em>付费高品质音乐试听</p>',
						'<p><em>3</em>专属歌曲试听</p>',
						'<p><em>4</em>专属音乐标识</p>',
						'</div>'
					].join("");
				break;
				case 11:
					// myIntro.innerHTML = [
					// 	'<img src="http://vip.kugou.com/static/images/de2.jpg" width="212" style="margin:20px 0 0 10px" />'
					// ].join("");
					myIntro.innerHTML = [
						'<div class="vip_music_icon vip_sign_gold_s">',
						'<span></span>',
						'<p><strong>VIP会员</strong><em>10元/月</em></p>',
						'</div>',
						'<div class="vip_detail">',
						'<p><em>1</em>超大云歌单</p>',
						'<p><em>2</em>VIP加速下载</p>',
						'<p><em>3</em>客户端去广告</p>',
						'<p><em>4</em>专属身份标识</p>',
						'<p><em>5</em>尊享高品电台</p>',
						'</div>',
						'<div class="vip_music_icon vip_music_music">',
						'<span></span>',
						'<p><strong>音乐包</strong><em>8元/月</em></p>',
						'</div>',
						'<div class="vip_detail">',
						'<p><em>1</em>300首付费歌曲下载</p>',
						'<p><em>2</em>付费高品质音乐试听</p>',
						'<p><em>3</em>专属歌曲试听</p>',
						'<p><em>4</em>专属音乐标识</p>',
						'</div>'
					].join("");
				break;
				case 13:
					myIntro.innerHTML = [
						'<div class="vip_music_icon vip_sign_gold_s">',
						'<span></span>',
						'<p><strong>VIP会员</strong><em>10元/月</em></p>',
						'</div>',
						'<div class="vip_detail">',
						'<p><em>1</em>超大云歌单</p>',
						'<p><em>2</em>VIP加速下载</p>',
						'<p><em>3</em>客户端去广告</p>',
						'<p><em>4</em>专属身份标识</p>',
						'<p><em>5</em>尊享高品电台</p>',
						'</div>',
						'<div class="vip_music_icon vip_music_hao">',
						'<span></span>',
						'<p><strong>豪华音乐包</strong><em>12元/月</em></p>',
						'</div>',
						'<div class="vip_detail">',
						'<p><em>1</em>500首付费歌曲下载</p>',
						'<p><em>2</em>付费高品质音乐试听</p>',
						'<p><em>3</em>专属歌曲试听</p>',
						'<p><em>4</em>专属音乐标识</p>',
						'</div>'
					].join("");
				break;
				default:
					myIntro.innerHTML = [
					'<div class="vip_sign_gold">',
					'<span></span>',
					'VIP会员',
					'</div>',
					'<div class="vip_price">10元/月</div>',
					'<div class="vip_detail">',
					'<p><em>1</em>超大云歌单</p>',
					'<p><em>2</em>VIP加速下载</p>',
					'<p><em>3</em>客户端去广告</p>',
					'<p><em>4</em>专属身份标识</p>',
					'<p><em>5</em>尊享高品电台</p>',
					'</div>'
				].join("");
			}

		}

	window.kguser = {
		//当前用户名称
		username: '',
		// 当前登录用户 vip类型
		//用户类型对照表
		/** 
		 * 0-普通用户
		 * 1-VIP
		 * 2-赠送VIP
		 * 3-豪华VIP
		 * 4-赠送豪华VIP
		 * 31-蓝钻vip
		 * 32-音乐包会员
		 * 33-豪华音乐包会员
		 * 34-赠送豪华音乐包会员
		 */
		vipType: 0,

		//当前登录用户 vip 还有 多少月过期
		SurplusMmonth: 0,

		//当前登录用户 vip 还有 多少日过期
		SurplusDay: 0,
		// 是否升级
		upgrade: false,

		//用户选择充值类型
		rechargeType: 0,
		//用户可以升级月数
		ableUpGradeMonths: 0
	};
	window.payInfo = {
		// 充值类型
		vipType: '',

		//应付金额总计
		total: 0,

		// 是否正在支付
		isPay: false,

		// 支付类型
		bankId: undefined,

		// 支付渠道名称（支付宝|财付通|银行名称）
		payway: '',

		// 充值几个月
		month: 0,

		upgradeType: 1 //是否为升级充值
	};
	window.bankShow = bankShow;

	// 页面 vip充值部分初始化
	vipPayInit();

	// 判断vip还是音乐包
	// vipMusicFn();

	//新版
	sdnClick(892);
	//旧版
	sdnClick(16661, "aspx");
	//VIP充值页面分类统计
	vipFromClick();
	// urlCheck();

	Kg.$(".open_time_content").addEvent("mousemove",function(){
		Kg.$(this).css("border-color","#ee7f91");
		Kg.$(".open_time_content_cur").css("border-color","#ff002a");
	}).addEvent("mouseout",function(){
		Kg.$(this).css("border-color","#ddd");
		Kg.$(".open_time_content_cur").css("border-color","#ff002a");
	});

	// 没相关产品
	var noneProduct = "<div class='n_product'>"+
						"<span class='n_icon'></span>"+
						"<p>您已经是豪华音乐包用户，暂无适应您的产品，请通过酷币按首购买付费音乐。</p>"+
						"<p>更多产品，敬请期待~~</p>"+
						"</div>"
}

/*首页登录区块*/
function loginModule() {
	var kugouC = read("KuGoo");
	if (!user_name) {
		//未登录
		Kg.$('#islogin')[0].style.display = "none";
		Kg.$('#nologin')[0].style.display = "block";
	} else {
		//已登录
		var pic_src = kugouC.Pic,
			_islogin = Kg.$("#islogin"),
			uType1 = Kg.$(".u1"),
			uType2 = Kg.$(".u2"),
			uType3 = Kg.$(".u3"),
			uType4 = Kg.$(".u4"),
			uType5 = Kg.$(".u5"),
			musicinfo = Kg.$(".musicinfo"),
			general = Kg.$(".general"),
			music_num = Kg.$("#music_num"),
			music_day = Kg.$("#music_day"),
			musicBoxBtn = Kg.$("#musicBoxBtn");

		if (!pic_src || pic_src == "default.jpg" || pic_src == "error:Bad md5") {
			pic_src = "http://imge.kugou.com/kugouicon/165/20120724/20120724145917274529.jpg";
		} else if (pic_src.indexOf("http://") != -1) {
			pic_src = pic_src;
		} else {
			pic_src = "http://imge.kugou.com/kugouicon/165/" + pic_src.substr(0, 8) + "/" + pic_src;
		}

		//设置头像
		try {
			_islogin.find(".pic img").attr("src", pic_src);
		} catch (e) {}
		Kg.getJSON(
			vipdomain +  "recharge/roleinfo", {
				n: Math.random()
			},
			function(res) {
				if (res) {
					// 获取是否有自动续费业务 有 才显示退订续费
					if(res["autoChargeType"] != 0){
					} else {
							Kg.$(".autopay_user").hide();
							Kg.$(".cancelAutoPay").hide();
							Kg.$(".avainfo h5").css({
								"margin-Top":15+"px"
							})
					}
					var autoTypeText = "",
						autoChargeTime = res["autoChargeTime"];
					//hover退订显示
					var typeText = "";
					if (res["producttype"] == 1) {
						typeText = "VIP";
					} else if (res["producttype"] == 11 || res["producttype"] == 6) { //6为新增类型豪华VIP
						typeText = "豪华VIP";
					} else if (res["producttype"] == 13) {
						typeText = "豪华VIP";
					} else if (res["producttype"] == 31) {
						typeText = "音乐包";
					} else if (res["producttype"] == 33) {
						typeText = "豪华音乐包";
					}
					if (res["autoChargeType"] == 4){
						Kg.$(".autopay_user").attr("title",autoChargeTime + '微信续订"' + typeText + '"服务');
						Kg.$(".cancelAutoPay").attr("title","退订微信自动续费");
					} else if (res["autoChargeType"] == 1){
						Kg.$(".autopay_user").attr("title",autoChargeTime + '支付宝续订"' + typeText + '"服务');
						Kg.$(".cancelAutoPay").attr("title","退订支付宝自动续费");
					} else if (res["autoChargeType"] == 2 || res["autoChargeType"] == 3){
						Kg.$(".autopay_user").attr("title",autoChargeTime + '手机包月续订"' + typeText + '"服务');
						Kg.$(".cancelAutoPay").attr("title","退订手机包月自动续费");
					}
					var txtmsg = '',
						vipdate = '',
						loginBoxBtn = Kg.$("#loginBoxBtn"), //登录区域下方推荐开通VIP 按钮 
						headVipIco = Kg.$("#recharge_url2"); //头部区推荐开能Vip 按钮

					res.rawVipEndTime == ""? IsVip = 1: IsVip = 2;
					switch (Number(res["role"])) {
						//体验VIP和VIP
						case 1:
						case 2:
							// _islogin.find(".avainfo i").addClass("new_vip_ico_1");
							txtmsg = '<p>300/500首歌尽情下载，低至0.02元/首</p><a class="music_btn" target="_blank" href="' + vipdomain + 'recharge.html?from=music&version=7713&entrance=2012">购买音乐包</a>';
							loginBoxBtn.addClass("new_btn_b_sup");
							headVipIco.addClass("new_btn_s_sup");
							headVipIco.html("升级豪华VIP");
							loginBoxBtn.html("续费酷狗VIP");
							uType1.show();
							uType4.show();
							_islogin.find(".vipinfo").css("padding","20px 0");
							break;
						case 31:
							txtmsg = '<p>您还不是酷狗VIP，享受更多精彩特权</p><a target="_blank" href="' + vipdomain + 'recharge.html?from=vip&entrance=2001" onclick="addFn(\'2012\')">开通VIP</a>';
							_islogin.find(".vipinfo").hide();
							_islogin.find(".musicinfo").show();
							music_num.html("<i style='color:red; font-style:normal'>"+res["musicUsed"]+"</i>/300");
							music_day.html(res["musicCurrentClear"]);
							_islogin.find(".vipinfo").css("padding","20px 0");
							uType2.show();
							uType3.show();
						break;
						case 33:
							txtmsg = '<p>您还不是酷狗VIP，享受更多精彩特权</p><a target="_blank" href="' + vipdomain + 'recharge.html?from=vip&entrance=2001" onclick="addFn(\'2012\')">开通VIP</a>';
							_islogin.find(".vipinfo").hide();
							_islogin.find(".musicinfo").show();
							music_num.html("<i style='color:red; font-style:normal'>"+res["musicUsed"]+"</i>/500");
							music_day.html(res["musicCurrentClear"]);
							_islogin.find(".vipinfo").css("padding","20px 0");
							musicBoxBtn.hide();
							uType2.show();
							uType5.show();
						break;
						case 11:
							loginBoxBtn.html("续费酷狗VIP");
							musicinfo.show();
							music_num.html("<i style='color:red; font-style:normal'>"+res["musicUsed"]+"</i>/300");
							music_day.html(res["musicCurrentClear"]);
							_islogin.find(".vipinfo").css("border","none");
							uType1.show();
							uType3.show();
						break;
						case 13:
							loginBoxBtn.html("续费酷狗VIP");
							musicinfo.show();
							music_num.html("<i style='color:red; font-style:normal'>"+res["musicUsed"]+"</i>/500");
							music_day.html(res["musicCurrentClear"]);
							_islogin.find(".vipinfo").css("border","none");
							musicBoxBtn.hide();
							uType1.show();
							uType5.show();
							
						break;
							//普通用户
						default:
							general.show();
							_islogin.find(".vipinfo").hide();

							uType4.show();
							uType2.show();
							break;
					}

					var vipdate = res["vipEndTime"].split(" ");
					_islogin.find(".vipdate").html(vipdate[0]);
					_islogin.find(".vipdays").html(res["vipRemains"] + "天");
					_islogin.find(".uname").html(user_name).attr("title", user_name);
					_islogin.find(".txtmsg").html(txtmsg);
					Kg.$('#nologin')[0].style.display = "none";
					Kg.$('#islogin')[0].style.display = "block";
					var  user_style_time_vip = Kg.$(".user_style_time_vip");
					Kg.$(".u1").addEvent("mouseover",function(){
						Kg.$(".user_style_time_vip span").html("VIP到期时间："+res["vipEndTime"]);

						user_style_time_vip.show()

						if(res["autoChargeType"] != 0){
							user_style_time_vip.css({"left":"-120px", "width":"145px","top":"-10px"});
						}else{
							user_style_time_vip.css({"left":"-120px", "width":"145px","top":"6px"});
						}
					});
					Kg.$(".u1").addEvent("mouseout",function(){
						user_style_time_vip.hide();
					});
					Kg.$(".u3").addEvent("mouseover",function(){
						Kg.$(".user_style_time_vip span").html("音乐包到期时间："+res["musicEndTime"]);
						user_style_time_vip.show();
						if(res["autoChargeType"] != 0){
							user_style_time_vip.css({"left":"-100px", "width":"165px","top":"-10px"});
						}else{
							user_style_time_vip.css({"left":"-100px", "width":"165px","top":"6px"});
						}
					});
					Kg.$(".u3").addEvent("mouseout",function(){
						user_style_time_vip.hide();
					});
					Kg.$(".u5").addEvent("mouseover",function(){
						Kg.$(".user_style_time_vip span").html("豪华音乐包到期时间："+res["musicEndTime"]);
						user_style_time_vip.show()
						if(res["autoChargeType"] != 0){
							user_style_time_vip.css({"left":"-100px", "width":"185px","top":"-10px"});
						}else{
							user_style_time_vip.css({"left":"-100px", "width":"185px","top":"6px"});
						}
					});
					Kg.$(".u5").addEvent("mouseout",function(){
						user_style_time_vip.hide();
					});
					Kg.$(".gears").addEvent("click",function(e){
						stopBubble(e);
						stopDefault(e);
						if (Kg.$(this).hasClass("on")){
							Kg.$(this).removeClass("on");
							Kg.$(".gears_more").hide();
						} else {
							Kg.$(this).addClass("on");
							Kg.$(".gears_more").show();
						}
					})
					Kg.$("body").addEvent("click",function(){
						Kg.$(".gears_more").hide();
					})
					var nameWidth = _islogin.find(".uname")[0].clientWidth;
					var gearsLeft = (nameWidth + 30) + "px";
					_islogin.find(".gears_more").css("left",gearsLeft)
				}
			});
	}
}

// 阻止事件冒泡
function stopBubble(e) {

    //如果提供了事件对象，则这是一个非IE浏览器
    if ( e && e.stopPropagation )
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
        //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
}
//阻止浏览器的默认行为
function stopDefault( e ) {

    //阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
}
// 取消自动续费点击
Kg.$(".cancelAutoPay").addEvent("click",function(e){
	stopDefault(e)
	var NickName = unescape(Kg.Cookie.read("KuGoo", "NickName"));
	Kg.getJSON(vipdomain +"recharge/roleinfo",
		 {n: Math.random()
		 }, function(res){
		 	var autotype = parseInt(res.producttype);
		 	var autoChargeType = parseInt(res.autoChargeType)
		 	var viptype="";
		 	var telptype="";
		 	payInfo.autoChargeType = res["autoChargeType"]; //自动续费类型 1:支付宝 2:联通手机包月 3:电信包月 4:微信  0: 没有开通任何一种自动续费
		 	payInfo.aliPay = res["paytype"]; //支付宝新旧支付方式
		 	if (autoChargeType == 4){
		 		switch(autotype) {	 		
		        case 1:
		            viptype = "vip微信自动续费"
		            break;
		        case 31:
		            viptype = "音乐包微信自动续费"
		            break;
	            case 33:
		            viptype = "豪华音乐包微信自动续费"
		            break;
	            case 11:
	            case 6:
		            viptype = '"豪华VIP"微信自动续费'
		            break;
	            case 13:
	             	viptype = '"vip+豪华音乐包"微信自动续费'
		        	break;
		        }
	    } else if (autoChargeType == 1){
		 	switch(autotype) {	 		
		        case 0 :
		            viptype = "普通支付宝自动续费"
		        	break;
		        case 1:
		            viptype = "vip支付宝自动续费"
		            break;
		        case 31:
		            viptype = "音乐包支付宝自动续费"
		            break;
	            case 33:
		            viptype = "豪华音乐包支付宝自动续费"
		            break;
	            case 11:
	            case 6:
		            viptype = '"豪华VIP"支付宝自动续费'
		            break;
	            case 13:
	             	viptype = '"vip+豪华音乐包"支付宝自动续费'
		        	break;
	    	}
	  	} else if (autoChargeType == 3 || autoChargeType == 5 || autoChargeType == 2){
	  		res.phone = res.phone.substring(0,3) + "****" + res.phone.substring(7,11)
	  		NickName = NickName + "   (手机号" + res.phone + ")"
	  		switch(autotype) {
		        case 1:
		            viptype = '"vip"手机包月'
		            break;
		        case 31:
		            viptype = '"音乐包"手机包月'
		            break;
	            case 33:
		            viptype = '"豪华音乐包"手机包月'
		            break;
	            case 11:
	            case 6:
		            viptype = '"豪华VIP"手机包月'
		            break;
	            case 13:
	             	viptype = '"vip+豪华音乐包"手机包月'
		        	break;
	    	}
	  	}
		 	var html = [
				'<div class="pop_payok cancelDiv" id="pop_payok">',
				'<div class="txt"><h6>【退订账号】<span>' + NickName + '</span></h6>',
				'<p>【退订业务】<em>'+viptype+'</em><br/>',
				'</p></div>',
				'<div class="btns">',
				'<p>退订后，业务到期时酷狗将不再为您续费</p>',
				'<a href="javascript:;" id="pop_payokSubmit" class="pop_btn_ok cancelAutoPayBtn_ok" target="_blank">确定退订</a>',
				'<a href="javascript:;" class="pop_btn_cancel cancelAutoPayBtn_cancel">取消</a>',
				'</div></div>'
			].join("");

			popupShow("确认退订", html,function(){},popupShowcallback);
		})
	
})
//手机包月退订
function telpExit(telptype) {
	var html = '<p class="telp_exit_p">退订手机包月，请发送短信' + telptype + '到10655158</p>'
	popupShow("确认退订",html);
}
// 退订回调函数
function popupShowcallback(){
	var successTxt = "",
		exitTxt = "";
	Kg.$("#pop_payokSubmit").addEvent("click",function(e){

		stopDefault(e)
		var user_id = Kg.Cookie.read("KuGoo", "KugooID");
		//微信退订
		if (payInfo.autoChargeType == 4){
			Kg.getJSON(vipdomain +"recharge/wxunsign&kugouid="+user_id,{n: Math.random()}, function(res){
			 	if(res.status==1){ 	
			 		successTxt = '<p align="center">退订成功</p><p class="successTxt_p">您的自动续费业务已取消，请刷新页面查看状态变更<p>'
			 		popupShow("提示",successTxt);
			 		LogStat({
					    "p1":"VIP官网充值页",
					    "p2":"微信自动续费",
					    "name":"退订成功量",
					    "type":1
					});
			 	}else{
			 		exitTxt = '<p align="center">退订失败</p><p class="exitTxt_p">网络开小差了，请稍后重试。如果多次失败，请到帮助页面联系客服<p>'
			 		popupShow("提示",exitTxt);
			 	}
			 	Kg.$(".callbackClass").addEvent("click",function(){
			 			location.reload();
			 	})
			})
		} else if (payInfo.autoChargeType == 1) { //支付宝退订
			var alipayUrl = "";
			if (payInfo.aliPay != 5) {  //新版支付宝退订 
				alipayUrl = vipdomain +"recharge/aliunsign&kugouid="+user_id;
			} else {
				alipayUrl = vipdomain +"recharge/unsubscribe&kugouid="+user_id;
			}
			Kg.getJSON(alipayUrl,
		 {n: Math.random()
		 }, function(res){
		 	if(res.status==1){ 	
			 		successTxt = '<p align="center">退订成功</p><p class="successTxt_p">您的自动续费业务已取消，请刷新页面查看状态变更<p>'
			 		popupShow("提示",successTxt);
		 		LogStat({
				    "p1":"VIP官网充值页",
				    "p2":"支付宝自动续费",
				    "name":"退订成功量",
				    "type":1
				});
		 		
			 	}else{
			 		exitTxt = '<p align="center">退订失败</p><p class="exitTxt_p">网络开小差了，请稍后重试。如果多次失败，请到帮助页面联系客服<p>'
			 		popupShow("提示",exitTxt);
			 	}
			 	Kg.$(".callbackClass").addEvent("click",function(){
			 			location.reload();
			 		})
			})
		} else if (payInfo.autoChargeType == 3 || payInfo.autoChargeType == 5 || payInfo.autoChargeType == 2){ //电信退订
			var ajaxUrl = vipdomain +"recharge/telecomunsign&kugouid="+user_id;
			if (payInfo.autoChargeType == 5){
				ajaxUrl = vipdomain +"recharge/mobilecomunsign&kugouid="+user_id
			} else if(payInfo.autoChargeType == 2){
				ajaxUrl = vipdomain +"recharge/unicomunsign&kugouid="+user_id
			}
			Kg.getJSON(ajaxUrl,{n: Math.random()}, function(res){
			 	if(res.status==1){ 	
			 		successTxt = '<p align="center">退订成功</p><p class="successTxt_p">您的自动续费业务已取消，请刷新页面查看状态变更<p>'
			 		popupShow("提示",successTxt);
			 		LogStat({
					    "p1":"VIP官网充值页",
					    "p2":"手机包月",
					    "name":"退订成功量",
					    "type":1
					});
		 	}else{
			 		exitTxt = '<p align="center">退订失败</p><p class="exitTxt_p">网络开小差了，请稍后重试。如果多次失败，请到帮助页面联系客服<p>'
			 		popupShow("提示",exitTxt);
		 	}
		 	Kg.$(".callbackClass").addEvent("click",function(){
		 			location.reload();
		 		})
		})
		}
		

	})
	Kg.$(".cancelAutoPayBtn_cancel").addEvent("click",function(){
		closePop();
	})
}
