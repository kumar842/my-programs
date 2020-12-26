package com.regunta.chatapp.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import com.regunta.chatapp.entity.User;

import lombok.Data;

/**
 * 
 * Data access object to get the information from control panel
 * 
 * @author rregunta
 */
@Component
@Data
public class UserDAO {
	private static final Logger LOGGER = LogManager.getLogger(UserDAO.class);
	
	private List<User> users;
	private List<String> userNamesLsit;
	
	@PostConstruct
	public void init() {
		//TODO: read users from db once.. when this class loads
		users = new ArrayList<>();
		
		users.add(new User("rajkumar"));
		users.add(new User("asha"));
		users.add(new User("himakar"));
		users.add(new User("vedansh"));
		
		userNamesLsit = users.stream().map(u -> u.getUserName()).collect(Collectors.toList());
	}
}
