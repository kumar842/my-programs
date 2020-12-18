package com.regunta.myapp.error;

public class EmployeeNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	public EmployeeNotFoundException(Long id) {
        super(String.format("Employee not found for id : %s", id));
    }
}