package com.yc.us.entity;

import java.util.List;

/**
 * 通用分页bean
 * @author ASD
 *
 * @param <T>
 */
public class PaginationBean<T>{
	private Integer currPage=1; //当前页
	private Integer pageSize=10;//每页的数据条数
	
	//响应数据
	private Integer total; //数据的总条数
	private Integer totalPage; //总页数
	private List<T> rows; //当前页的数据
	
	
	
	public Integer getCurrPage() {
		return currPage;
	}
	public void setCurrPage(Integer currPage) {
		this.currPage = currPage;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Integer getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public List<T> getRows() {
		return rows;
	}
	public void setRows(List<T> rows) {
		this.rows = rows;
	}
	@Override
	public String toString() {
		return "paginationBean [currPage=" + currPage + ", pageSize=" + pageSize + ", total=" + total + ", totalPage="
				+ totalPage + ", rows=" + rows + "]";
	}
	
	
	
	
}
