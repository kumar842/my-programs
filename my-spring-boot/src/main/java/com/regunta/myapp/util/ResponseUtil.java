/******************************************************************************
 * Copyright (C) 2004-2021 Proterra.
 *
 * This file is part of demand-management-service Project
 *
 * demand-management-service Project and associated code cannot be copied and/or distributed
 * without a written permission of Proterra, and/or its subsidiaries
 *****************************************************************************/
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
