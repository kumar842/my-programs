package com.regunta.myapp.controller;

import java.util.Calendar;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
		//Approach 1:
//		Optional<Employee> employeeOptional = findById(id, config.getEntityIsFetchOnlyValid());
//		
//		if(!employeeOptional.isPresent()){
//			throw new EmployeeNotFoundException(id);
//		}		
//		return employeeOptional.get();
		
		//Approach: 2 //returns no such element exception
		//return findById(id, config.getEntityIsFetchOnlyValid()).get();
		
		try {
			return this.findEntityById(id).get();
		} catch (NoSuchElementException e) {
			throw new EmployeeNotFoundException(id);
		}
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
//		Optional<Employee> employeeOptional = this.findById(id, config.getEntityIsFetchOnlyValid());
//		if(!employeeOptional.isPresent()){
//			throw new EmployeeNotFoundException(id);
//		}
//		
//		Employee empEntity = employeeOptional.get();
//		empEntity.setFirstName(employee.getFirstName());
//		empEntity.setLastName(employee.getLastName());
//		empEntity.setMiddleName(employee.getMiddleName());
//		
//		empEntity.setLastModifiedBy("rajkumar" ); //TODO: get the username from auth-token
//		empEntity.setLastModifiedOn(Calendar.getInstance().getTime());
//		
//		return this.empRepository.save(empEntity);
		
		//Approach 2
		try {
			return this.empRepository.save((Employee) this.findById(id)
					.setFirstName(employee.getFirstName())
					.setLastName(employee.getLastName())
					.setMiddleName(employee.getMiddleName())
					.setLastModifiedBy("rajkumar" )
					.setLastModifiedOn(Calendar.getInstance().getTime()));
		} catch (NoSuchElementException e) {
			throw new EmployeeNotFoundException(id);
		}
	}
	
	@DeleteMapping("/{id}")
	void delete(@PathVariable final Long id) {
		//Approach 1
//		Optional<Employee> employeeOptional = this.findById(id, config.getEntityIsFetchOnlyValid());
//		if(!employeeOptional.isPresent()){
//			throw new EmployeeNotFoundException(id); 
//		}
//		
//		/** soft delete **/
//		if(BooleanUtils.isTrue(config.getEntityIsSoftDelete())) {
//			Employee empEntity = employeeOptional.get();
//			empEntity.setIsValid(Boolean.FALSE);
//			this.empRepository.save(empEntity);
//			return;
//		}
//		
//		/** normal delete **/
//		this.empRepository.deleteById(id);
		
		try {
			if(BooleanUtils.isTrue(config.getEntityIsSoftDelete())) {
				this.empRepository.save((Employee) this.findById(id).setIsValid(Boolean.FALSE));
			} else {
				this.empRepository.deleteById(id);
			}
			
		} catch (NoSuchElementException e) {
			throw new EmployeeNotFoundException(id);
		}
	}
	
	private Optional<Employee> findEntityById(Long id) {
		return BooleanUtils.isTrue(config.getEntityIsFetchOnlyValid())?
				this.empRepository.findByIdAndIsValid(id, Boolean.TRUE) :
				this.empRepository.findById(id);
	}
}


