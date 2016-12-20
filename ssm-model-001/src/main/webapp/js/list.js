
$("#userList")
		.datagrid(
				{
					url : "user/list",
					pagination : true,
					fitColumns : true,
					pageList : [5,10,15,20,25,30],
					columns : [ [
							{
								field : 'id',
								title : '编号',
								width : 50,
								align : 'center'
							},
							{
								field : 'name',
								title : '姓名',
								width : 100,
								align : 'center'
							},
							{
								field : 'birthday',
								title : '生日',
								width : 100,
								align : 'center'
							},
							{
								field : 'gender',
								title : '性别',
								width : 50,
								align : 'center'
							},
							{
								field : 'career',
								title : '职称',
								width : 100,
								align : 'center'
							},
							{
								field : 'address',
								title : '地址',
								width : 100,
								align : 'center'
							},
							{
								field : 'mobile',
								title : '电话',
								width : 100,
								align : 'center'
							},
							{
								field : 'picPath',
								title : '图像',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									if (value == null) {
										return "<img width='100' src='image/not_pic.jpg'/>"
									}else{
										return "<img width='100' src='"+value+"'/>"
									}
								}
							},
							{
								field : 'opr',
								title : '操作',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									var oprStr = '<a class="detailBtn" onclick="openDatail()" >详情</a>&nbsp;&nbsp;'+
										'<a class="ModifyBtn" onclick="openUpdate('+index+')">修改</a>'+
										'<script>$(".detailBtn").linkbutton({iconCls : "icon-search"});'+
										'$(".ModifyBtn").linkbutton({iconCls : "icon-edit"});</script>';
									return oprStr;
								}
							} ] ],
				});


$("#modifyDiv").dialog({
	title:"用户修改",
	closable:false,
})

$("#modifyDiv").dialog("close");

$("#modifyForm").form({
	url:"user/modify",
	success:function(data){
		if(data.trim()=="true"){
			$("#modifyDiv").dialog("close"); //关闭修改框
			$("#userList").datagrid("reload"); //刷新修改数据
		}else{
			$.messager.show({
				title:'修改信息',
				msg:'修改失败',
				showType:'show',
				style:{
					right:'',
					top:document.body.scrollTop+document.documentElement.scrollTop,
				}
			});
		}
	}
});

$(".closeBtn").linkbutton({
	iconCls:"icon-cancel",
	onClick:function(){
		$("#modifyDiv").dialog("close");
	}
});

$(".updateBtn").linkbutton({
	iconCls:"icon-ok",
	onClick:function(){
		$("#modifyForm").submit();
	}
	
});

function openUpdate(index){
	$("#modifyDiv").dialog("open");
	var row=$("#userList").datagrid("getRows")[index];
	$("#uid").val(row.id);
	$("#uname").val(row.name);
	$("#ubirthday").val(row.birthday);
	$("#ugender").val(row.gender);
	$("#ucareer").val(row.career);
	$("#uaddress").val(row.address);
	$("#umobile").val(row.mobile);
	if(row.picPath){
		$("#pic").attr("src",row.picPath);
	}
}

function chgPic(obj){
	$("#pic").attr("src",window.URL.createObjectURL(obj.files[0]));
}

