package com.regunta.myapp.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Entity(name="employees")
public class Employee extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message = ErrorCodes.EMPLOYEE_FIRST_NAME_MANDATORY)
	private String firstName;
	private String lastName;
	private String middleName;
	private String test;
	
	public Employee withId(Long id) {
		this.id = id;
		return this;
	}
	
	public Employee withFirstName(String firstName) {
		this.firstName = firstName;
		return this;
	}
	
	public Employee withLastName(String lastName) {
		this.lastName = lastName;
		return this;
	}
	
	public Employee withMiddleName(String middleName) {
		this.middleName = middleName;
		return this;
	}
}
