package com.regunta.myapp.rest;

import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.regunta.myapp.AppConfig;
import com.regunta.myapp.entity.Employee;
import com.regunta.myapp.error.EmployeeNotFoundException;

import lombok.extern.slf4j.Slf4j;

@Component
@RestController
@RequestMapping("/rest/employees")
@Slf4j
public class RESTTemplate {
	
	@Autowired
	private AppConfig config;
	
	//private Gson gson;
	
	private String baseURL;
	
	private RestTemplate restTemplate;
	private HttpHeaders headers;
	
	@PostConstruct
	void init() {
		//gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
		baseURL = "http://localhost:8080/api/employees";
		restTemplate = new RestTemplate();
		
		headers = new HttpHeaders();
		//headers.set(HttpHeaders.AUTHORIZATION, config.getApiKey());
		headers.set("x-api-key", config.getApiKey());
		headers.setContentType(MediaType.APPLICATION_JSON);
	}
	
	@GetMapping("/{id}")
	public Employee findById(@PathVariable final Long id) {
		String url = this.baseURL + "/" + id;
		HttpEntity<String> request = new HttpEntity<>(headers);
		
		try {
			return restTemplate.exchange(url, HttpMethod.GET, request, Employee.class).getBody();
		} catch (HttpClientErrorException.NotFound e) {
			throw new EmployeeNotFoundException(id);
		}
	}
	
	@GetMapping
	List<Employee> findAll() {
		String url = this.baseURL;
		HttpEntity<String> request = new HttpEntity<>(headers);
		
		try {
			return Arrays.asList(restTemplate.exchange(url, HttpMethod.GET, request, Employee[].class).getBody());
		} catch (HttpClientErrorException.NotFound e) {
			throw e;
		}
	}
	
	@GetMapping("/create")
	Employee createUser() {
		String url = this.baseURL;
		
		Employee employee = new Employee();//.setFirstName("Test");
		
		HttpEntity<Employee> request = new HttpEntity<Employee>(employee, headers);
		
		try {
			return restTemplate.exchange(url, HttpMethod.POST, request, Employee.class).getBody();
		} catch (HttpClientErrorException.BadRequest e) {
			//TODO: how to fetch the response body in case of exception
			log.error(e.getMessage());
			throw e;
		}
	}
}
