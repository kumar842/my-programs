/******************************************************************************
 * Copyright (C) 2004-2021 Proterra.
 *
 * This file is part of demand-management-service Project
 *
 * demand-management-service Project and associated code cannot be copied and/or distributed
 * without a written permission of Proterra, and/or its subsidiaries
 *****************************************************************************/
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