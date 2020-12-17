package com.regunta.myapp.error;

public class EmployeeNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	public EmployeeNotFoundException(Long id) {
        super("Employee not found for id : " + id);
    }
}