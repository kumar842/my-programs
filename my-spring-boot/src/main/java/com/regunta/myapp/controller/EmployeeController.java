package com.regunta.myapp.controller;

import java.util.Calendar;
import java.util.List;
import java.util.NoSuchElementException;

import org.apache.commons.lang.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kastkode.springsandwich.filter.annotation.Before;
import com.kastkode.springsandwich.filter.annotation.BeforeElement;
import com.regunta.myapp.AppConfig;
import com.regunta.myapp.auth.AuthKeyInterceptor;
import com.regunta.myapp.entity.Employee;
import com.regunta.myapp.error.EmployeeNotFoundException;
import com.regunta.myapp.repository.EmployeeRepository;

/**
 * The Class HealthController.
 */
@Before(@BeforeElement(AuthKeyInterceptor.class))
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

	@Autowired
	private EmployeeRepository empRepository;
	
	@Autowired
	private AppConfig config;
	
	@GetMapping()
	List<Employee> findAll() {
		return BooleanUtils.isTrue(config.getEntityIsFetchOnlyValid())?
				empRepository.findByIsValid(Boolean.TRUE) : 
					empRepository.findAll();
	}
	
	@GetMapping("/{id}")
	Employee findById(@PathVariable final Long id) {
		return this.findEntityById(id);
	}
	
	@PostMapping()
	Employee save(@RequestBody @Validated final Employee employee) {
		//validate the employee
		
		//Approach1: 
//		employee.setCreatedBy("rajkuamr");//TODO: get the username from auth-token
//		employee.setCreatedOn(Calendar.getInstance().getTime());
//		employee.setIsValid(Boolean.TRUE);
//		return empRepository.save(employee);
		
		//Approach: 2
		return empRepository.save((Employee) employee.setCreatedBy("Rajkumar")
				.setCreatedOn(Calendar.getInstance().getTime())
				.setIsValid(Boolean.TRUE));
	}
	
	@PutMapping("/{id}")
	Employee update(@PathVariable final Long id, 
			@RequestBody @Validated final Employee employee) {
		//Approach 1
//		Employee empEntity = this.findEntityById(id);
//		empEntity.setFirstName(employee.getFirstName());
//		empEntity.setLastName(employee.getLastName());
//		empEntity.setMiddleName(employee.getMiddleName());
//		
//		empEntity.setLastModifiedBy("rajkumar" ); //TODO: get the username from auth-token
//		empEntity.setLastModifiedOn(Calendar.getInstance().getTime());
//		
//		return this.empRepository.save(empEntity);
		
		//Approach 2
		return this.empRepository.save((Employee) this.findEntityById(id)
				.setFirstName(employee.getFirstName())
				.setLastName(employee.getLastName())
				.setMiddleName(employee.getMiddleName())
				.setLastModifiedBy("rajkumar")
				.setLastModifiedOn(Calendar.getInstance().getTime()));
	}
	
	@DeleteMapping("/{id}")
	void delete(@PathVariable final Long id) {
		this.deleteEntityById(id);
	}
	
	private Employee findEntityById(Long id) throws EmployeeNotFoundException {
		try {
			return BooleanUtils.isTrue(this.config.getEntityIsFetchOnlyValid())?
					this.empRepository.findByIdAndIsValid(id, Boolean.TRUE).get() :
					this.empRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new EmployeeNotFoundException(id);
		}
	}
	
	private void deleteEntityById(Long id) throws EmployeeNotFoundException {
		if(BooleanUtils.isTrue(this.config.getEntityIsSoftDelete())) {
			this.empRepository.save((Employee) this.findEntityById(id).setIsValid(Boolean.FALSE));
		} else {
			this.empRepository.deleteById(id);
		}
	}
}


