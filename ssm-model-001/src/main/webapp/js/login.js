
$("#loginDiv").dialog({
	title:"",
	border:false,
	modal:true,
	width:200,
	top:80
});


$('#btnLogin').linkbutton({    
    iconCls: 'icon-man',
    onClick:function(){
    	$("#loginForm").submit();
    }
}); 


$("#loginForm").form({
	  url:"user/login",    
	  success:function(data){ 
	       if(data.trim()=="true"){
	    	   location.replace("page/list.jsp");
	       }else{
	    	   $.messager.show({
	    			title:'登录信息',
	    			msg:'登录失败,号码与姓名不匹配',
	    			showType:'show',
	    			style:{
	    				top:document.body.scrollTop+document.documentElement.scrollTop,
	    			}
	    		});

	       }
	    }  
});

