package com.yc.us.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yc.us.entity.User;
import com.yc.us.entity.PaginationBean;
import com.yc.us.mapper.UserMapper;
import com.yc.us.service.UserService;

@Component("userService")
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserMapper userMapper;
	
	
	@Override
	public boolean login(User user) {
		return userMapper.findUser(user)!=null;
	}

	@Override
	public PaginationBean<User> listPartUsers(String currpage, String pageSize) {
		PaginationBean<User> userBean = new PaginationBean<User>();
		if(currpage!=null){
			userBean.setCurrPage(Integer.parseInt(currpage));
		}
		
		if(pageSize!=null){
			userBean.setPageSize(Integer.parseInt(pageSize));
		}
		return userMapper.getUsersByPagination(userBean);
	}

	@Override
	public boolean modify(User user) {
		return userMapper.updateUser(user)>0;
	}

}
