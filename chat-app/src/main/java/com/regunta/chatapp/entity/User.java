package com.regunta.chatapp.entity;

//import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author rregunta
 */
@Data
@EqualsAndHashCode(callSuper=false)
//@Entity(name="user")
public class User extends BaseEntity {
	private static final long serialVersionUID = 1L;

	//@Id
	private String userName;
	
	@NotEmpty(message = "firstName mandatory")
	private String firstName;
	private String lastName;
	private String middleName;
	//...
	
	public User(String userName) {
		this.userName = userName;
	}
}
