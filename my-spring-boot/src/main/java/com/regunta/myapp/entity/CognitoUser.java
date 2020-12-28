package com.regunta.myapp.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Model class for User
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@EqualsAndHashCode(callSuper=false)
public class CognitoUser extends BaseEntity {
	private String username;
	private String password;
	private String role;
	private String idToken;
	private String challengeName;
	private String userStatus;
	private String company;
	private String given_name;
	private String family_name;
}
