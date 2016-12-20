// JavaScript Document By Brainy
String.prototype.trim = function(){return this.replace(/^\s*|\s*$/g,"");};

/**
var problems = [
  "<a href=''>酷狗自动关闭</a>",
  "<a href=''>酷狗播放器崩溃</a>",
  "<a href=''>酷狗播放音乐自动关闭，酷狗自己关闭酷</a>",
  "<a href=''>酷狗播放歌曲时崩溃</a>",
  "<a href=''>酷狗播放器自己关闭</a>",
  "<a href=''>酷狗找不到歌词</a>",
  "<a href=''>酷狗听不到歌曲</a>",
  "<a href=''>我的收藏列表丢失</a>",
  "<a href=''>歌曲缓冲不到</a>",
  "<a href=''>歌词不能自动滚动</a>"
];
*/
var problems = [];

//统计字符出现次数
var staticWords = function(str,value){
	var tempStr = value;
	/*var arr= Array;
	arr=[0];*/
	var times = 0;
	for (var i=0;i<str.length-1;i++){
		//tempStr=str.charAt(i);
		if(str.split(tempStr).length>times){
			times=str.split(tempStr).length-1;//储存该字符出现次数
			//arr[1]=tempStr;//储存该字符
		}
	}
	return times;
};
//检查字符有没有出现
var checkWords = function(arr){
    for(var i = 0; i < arr.length; i++) {
	    var result;
		if(arr[i].indexOf("酷") != -1) {
		  document.writeln("有");	
		} else {
		  document.writeln("无");	
		}			
	}	
};
//统计给定字符串每个字在字符串库中出现次数
var dealWords = function(arr,str){
	
	var staticArr = new Array();
	for(var l = 0; l < arr.length; l++) {
		var temptime = 0;
		for(var k = 0; k < str.length; k++) {
			var result = staticWords(arr[l],str[k]);
			temptime += result;						
		}
		staticArr.push(temptime);
	}
	//console.log(staticArr)
	orderArr(problems,staticArr);
	
};

//重新排列问题数组
var orderArr = function(words,nums){
	
	var keys = new Array();
	for(var i =0; i<nums.length;i++){
		keys.push(i);
	}
	var temp;
	for(var i = 0; i < nums.length; i++) {
	  for(var j = nums.length - 1; j >= i; j--){
		if(nums[j] > nums[j - 1]) {
			temp = keys[j-1];
			keys[j-1] = keys[j];
			keys[j] = temp;
			
		   temp = nums[j - 1];
		   nums[j - 1] = nums[j];
		   nums[j] = temp;
		}
	  }	
	  
	}
	//console.log(keys);
	var html="";
	for(var k = 0; k < keys.length; k++) {
		html += words[keys[k]];
	}
	document.getElementById("searchTips").innerHTML = html;
	if(problems.length>0)
		document.getElementById("searchTips").style.display = "block";
}; 

//处理标红
var highRed = function(str,word){
  try{	
  for(var i = 0; i < word.length; i++) {
	word = word.split(""); 
	if(word[i].trim() !="" && /[\u4E00-\u9FA5]/.test(word[i])){  
	//if(word[i].trim() !="" && word[i] != "a" && word[i] != "\"" && word[i] != "<" && word[i] != ">" && word[i] != "\/"){
	  var reg = "/"+word[i]+"/g";  
	  str = str.replace(eval(reg),"<label>"+word[i]+"</label>"); 	
	}  
	 	
  }	
  } catch(ex) {
	 
  }
  //console.log(str);
  return str;
};
//highRed("我的酷狗","的狗");

var text = document.getElementById("inputTitle");
var highLightIndex = -1; 
var type = "keyup";
var listener = function(event){
  var myEvent = event || windows.event;  
	 var keyCode = myEvent.keyCode;  
	 
	 if(keyCode != 38 && keyCode != 40 && keyCode != 13){  
		  
		  var word = text.value;
		  dealWords(problems,word);
		  var htmls = document.getElementById("searchTips").innerHTML;
		  document.getElementById("searchTips").innerHTML = highRed(htmls,word); 
		  
		  
	 //处理上下键(up,down)  
	 }else if(keyCode == 38 || keyCode == 40){  
		 processKeyUpAndDown(keyCode);  
	 //按下了回车键  
	 }else if(keyCode == 13){  
		 processEnter(); 
		 document.getElementById("searchTips").style.display = "none"; 
	 }  
};

/**  
* 处理按上下键的情况  
*/  
function processKeyUpAndDown(keyCode){    
   
   var words = document.getElementById("searchTips").childNodes;
   var num = words.length;
   if(num <= 0) return;  
   changeToWhite();  
   highLightIndex = ((keyCode != 38 ? num + 1:num - 1)+highLightIndex) % num; 
   words.item(highLightIndex).style.color = "#39B7E9";
   //document.getElementById("inputTitle").value = words.item(highLightIndex).innerHTML;
}

/**  
* 处理按下Enter键  
* @param keyCode  
*/  
function processEnter(){  
    
   var words = document.getElementById("searchTips").childNodes;
   var num = words.length;
   if(num <= 0) return;  
   document.location = words.item(highLightIndex).href;
   //words.item(highLightIndex).style.color = "#39B7E9";
}

/**  
* 如果有高亮的则把高亮变白  
*/  
function changeToWhite(){  
   if(highLightIndex != -1){    
	   var words = document.getElementById("searchTips").childNodes;
	   words.item(highLightIndex).style.color = "#777";
   }  
}
/*
if(window.attachEvent){
  text.attachEvent("on"+type,listener);	
} else {
  text.addEventListener(type,listener,false);	
}

document.onclick=function(event){
     document.getElementById("searchTips").style.display = "none"; 
}
*/
//改变输入框样式
var changeValue = function(dom){
	if(dom.value.trim() == "输入联系QQ" || dom.value.trim() == "输入联系手机") {
	    dom.value = '';	
		dom.style.color = "#000";
		dom.focus();	
	}	
};
var changeBack = function(dom){	
	if(dom.value.trim() == "") {
		dom.style.color = "#bcbcbc";
	  	if(dom.id == "inputqq") {
			dom.value = "输入联系QQ";
		} else if(dom.id == "inputphone") {
			dom.value = "输入联系手机";	
		}
	}    	
};
  