package com.yc.us.mapper;

import com.yc.us.entity.User;
import com.yc.us.entity.PaginationBean;

public interface UserMapper {

	User findUser(User user);

	PaginationBean<User> getUsersByPagination(PaginationBean<User> userBean);

	int updateUser(User user);
}
