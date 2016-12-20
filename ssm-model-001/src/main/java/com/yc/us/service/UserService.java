package com.yc.us.service;

import com.yc.us.entity.User;
import com.yc.us.entity.PaginationBean;

public interface UserService {

	boolean login(User user);

	PaginationBean<User> listPartUsers(String currpage, String pageSize);

	boolean modify(User user);

}
