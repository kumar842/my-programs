package com.regunta.myapp.entity;

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
public class Employee extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message = ErrorCodes.EMPLOYEE_FIRST_NAME_MANDATORY)
	private String firstName;
	private String lastName;
	private String middleName;
	
	//@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss Z", timezone = "America/Los_Angeles")
    //private Date joinDate = new Date();
}
