package com.regunta.myapp.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kastkode.springsandwich.filter.annotation.Before;
import com.kastkode.springsandwich.filter.annotation.BeforeElement;
import com.regunta.myapp.auth.APIKeyInterceptor;
import com.regunta.myapp.entity.CognitoUser;
import com.regunta.myapp.service.UserService;

/**
 * controller for user management
 * 
 */
@Before(@BeforeElement(APIKeyInterceptor.class))
@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	Set<CognitoUser> getAllUsers(@RequestHeader("Authorization") String token) {
		return this.userService.getAllUsers();
	}
	
	@GetMapping("/{username:.+}")
	CognitoUser getUserByName(@RequestHeader("Authorization") String token, @PathVariable("username") String username) {
		return userService.findUserByName(username);
	}

	@PostMapping
	CognitoUser createUser(@RequestHeader("Authorization") String token, @RequestBody CognitoUser user) {
		// TODO: validate user

		// user.setCreatedBy(loggedInUsername); //TODO:
		return userService.createUser(user);
	}

	@DeleteMapping("/{username:.+}")
	void deleteUser(@RequestHeader("Authorization") String token, @PathVariable("username") String username) {
		userService.deleteUserByName(username);
	}
	
	@PutMapping("/users")
	CognitoUser updateUser(@RequestHeader("Authorization") String token, @RequestBody CognitoUser user) {
		// TODO: validate user

		// user.setLastModifiedBy(loggedInUsername); //TODO:
		return this.userService.updateUser(user);
	}
}
