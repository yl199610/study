package com.yc.us.web.handler;

import java.io.File;
import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.yc.us.entity.PaginationBean;
import com.yc.us.entity.User;
import com.yc.us.service.UserService;
import com.yc.us.util.ServletUtil;


@Controller
@RequestMapping("/user")  //请求处理的前缀，可以做过滤处理 /manager/*
public class UserHandler {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/login")  //具体的请求资源处理
	@ResponseBody
	public boolean login(User user){
		LogManager.getLogger().debug("请求UserHandler处理login....");
		return userService.login(user);
	}
	
	
	@RequestMapping("/list")  //具体的请求资源处理
	@ResponseBody
	public PaginationBean<User> list(String page,String rows){
		LogManager.getLogger().debug("请求UserHandler处理login....");
		return userService.listPartUsers(page,rows);
	}
	
	
	@RequestMapping("/modify")  //具体的请求资源处理
	@ResponseBody
	public boolean modify(@RequestParam(name="picData",required=false)MultipartFile picData,User user){
		LogManager.getLogger().debug("请求UserHandler处理modify,请求参数user ==》...." + user);
		if(picData!=null&& !picData.isEmpty()){
			try {
				picData.transferTo(new File(ServletUtil.UPLOAD_DIR,picData.getOriginalFilename()));
				user.setPicPath("/"+ServletUtil.UPLOAD_DIR_NAME+"/"+picData.getOriginalFilename());
				
			} catch (IllegalStateException | IOException e) {
				LogManager.getLogger().error("上传文件操作失败",e);
			} 
		}
		return userService.modify(user);
	}
}

