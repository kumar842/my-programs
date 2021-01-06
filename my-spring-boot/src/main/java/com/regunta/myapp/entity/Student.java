package com.regunta.myapp.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import com.regunta.myapp.error.ErrorCodes;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author rregunta
 */
@Data
@EqualsAndHashCode(callSuper=false)
@Entity(name="students")
public class Student extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	
	@NotEmpty(message = ErrorCodes.EMPLOYEE_FIRST_NAME_MANDATORY)
	private String firstName;
	private String lastName;
	private String middleName;
	private String test;
	
	public Student withId(String id) {
		this.id = id;
		return this;
	}
	
	public Student withFirstName(String firstName) {
		this.firstName = firstName;
		return this;
	}
	
	public Student withLastName(String lastName) {
		this.lastName = lastName;
		return this;
	}
	
	public Student withMiddleName(String middleName) {
		this.middleName = middleName;
		return this;
	}
}
