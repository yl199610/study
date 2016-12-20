/*
* Copyright 2012, kugou.com
* Creator: jackNEss Lau
* $Author: zhanghailong $
* $Date: 2013-06-20 18:02:01 +0800 (周四, 2013-06-20) $
*/


!function(){
     var kg_domain = kg_domain ||'http://www.kugou.com/newuc/';
    /* 焦点图区域
    ---------------------------------------*/
    if(document.getElementById("slideImgList")){
       var slidebox =  new Focus("img_list_item","slideBtn_item",{effect:"scroll", scrollDir:"Left", event:"mouseover",scrollMode:2});
       Kg.$("#slidePrevBtn").addEvent("click",function(){
           slidebox.prev();
       });
       Kg.$("#slideNextBtn").addEvent("click",function(){
           slidebox.next();
       });
    }

    /* 登录框区域 
    -------------------------------------- */
    var userInput = Kg.$("#vipLoginUserName")[0],
        pswInput = Kg.$("#vipLoginPsw")[0],
        notice = Kg.$("#vipLoginNotice")[0],
        codeArea = Kg.$("#verifyCodeArea")[0],
        checkCode = Kg.$("#vipLoginCode")[0],
        submitBtn = Kg.$("#vipLoginBtn")[0]

    if(userInput){
        /*是否显示验证码*/
        loadScript( kg_domain + 'login/check/', 'd=' + Math.random(), function() {
            if (typeof (showverifycode) != "undefined") {
                if (showverifycode == 1) {
                    codeArea.style.display = "block";
                    getCodeImg("vipVerifyCode");
                } 
            }
        });
        
        /* 用户名 */
        var defaultWords = userInput.value,
            removeSpaceReg = /^\s+|\s+$/ig;
        userInput.onfocus = function(){
            if (this.value.replace(removeSpaceReg, "") == defaultWords) {
                this.value = "";
            };
        };
        userInput.onblur = function() {
            if (this.value.replace(removeSpaceReg, "") == "") {
                this.value = defaultWords;
            }
        };
        userInput.onkeydown = function(e) {
            e = e || window.event;
            if (e.keyCode == 13) {
                formCheck();
            }
        };

        /* 密码 */
        pswInput.onkeydown = function(e) {
            e = e || window.event;
            if (e.keyCode == 13) {
                formCheck();
            }
        };

        /* 提交按钮 */
        submitBtn.onclick = function(){
            formCheck();
        };

        /* 验证码 */
        checkCode.onkeydown = function(e){
            e = e || window.event;
            if (e.keyCode == 13) {
                formCheck();
            }
        }

        /* 表单检查 */
        function formCheck() {
            /* 用户名检查 */
            if (userInput.value == defaultWords || userInput.value.replace(removeSpaceReg, "") == "") {
                notice.style.visibility = "visible";
                notice.innerHTML = "请先填用户名";
                userInput.focus();
                return;
            }
            /* 密码检查 */
            if (pswInput.value == "") {
                notice.style.visibility = "visible";
                notice.innerHTML = "请先填密码";
                pswInput.focus();
                return;
            }
            /* 传输数据 */
            window.kgLoginPostHandle = function(res){
                if(res=="success"){
                    window.location.reload();
                    return;
                }
                notice.style.visibility = "visible";
                notice.innerHTML = res;

                if(codeArea){
                    codeArea.style.display="block";
                }
                getCodeImg("vipVerifyCode");
                return;
            }
            
            var param = {
                "loginname":encodeURIComponent(userInput.value),
                'pwd':encodeURIComponent(pswInput.value),
                'checkcode':checkCode.value,
                't':new Date().getTime()
            }
            loadScript('http://www.kugou.com/newuc/?r=login/checklogin&', param, function() {});
        }  
    }


}();
