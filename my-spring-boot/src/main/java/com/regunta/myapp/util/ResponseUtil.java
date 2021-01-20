package com.regunta.myapp.util;

import java.util.List;

import org.springframework.stereotype.Component;

import com.regunta.myapp.models.Response;

@Component
public class ResponseUtil<T> {
	
	private Response<T> build() {
		return new Response<T>();
	}
	
	public Response<T> withMessage(String message) {
		return this.build().withMessage(message);
	}
	
	public Response<T> withT(T t) {
		return this.build().withT(t);
	}
	
	public Response<T> withTs(List<T> ts) {
		return this.build().withTs(ts);
	}
}
