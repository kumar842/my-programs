package com.regunta.myapp.error;

public class UnAuthorizedException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	public UnAuthorizedException() {
        super("Invalid x-api-key");
    }
}