package com.regunta.myapp.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class Response<T> {
	private String message;
	private T t;
	private List<T> ts;
	
	public Response<T> withMessage(String message) {
		this.message = message;
		return this;
	}
	
	public Response<T> withT(T t) {
		this.t = t;
		return this;
	}
	
	public Response<T> withTs(List<T> ts) {
		this.ts = ts;
		return this;
	}
}