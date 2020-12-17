package com.regunta.myapp.error;

public class UnAuthorizedException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	public UnAuthorizedException(String xAPIKey) {
        super("Ivnalid x-api-key : " + xAPIKey);
    }
}