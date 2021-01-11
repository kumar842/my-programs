package com.regunta.myapp.controller;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
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
import org.springframework.web.client.HttpClientErrorException;

import com.kastkode.springsandwich.filter.annotation.Before;
import com.kastkode.springsandwich.filter.annotation.BeforeElement;
import com.regunta.myapp.auth.APIKeyInterceptor;
import com.regunta.myapp.entity.Employee;
import com.regunta.myapp.entity.Student;
import com.regunta.myapp.models.Response;
import com.regunta.myapp.repository.CustomRepository;

/**
 * The Class HealthController.
 */
@Before(@BeforeElement(APIKeyInterceptor.class))
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/{entity}s")
public class APIController {
	
	@Component
	public class EmpController extends Controller<Employee, Long> {
		@SuppressWarnings("unused")
		@Autowired private EmployeeRepository employeeRepository;
		public EmpController() {
			this.entityRepositoryType = EmployeeRepository.class;
			this.entityType = Employee.class;
		}
	}
	
	@Component
	public class StudentController extends Controller<Student, String> {
		@SuppressWarnings("unused")
		@Autowired private StudentRepository studentRepository;
		public StudentController() {
			this.entityRepositoryType = StudentRepository.class;
			this.entityType = Student.class;
		}
	}

	@Autowired
	private EmpController employeeController;
	
	@Autowired
	private StudentController studentController;
	
	@SuppressWarnings("rawtypes")
	Map<String, Controller> entityControllerMap = new HashMap<String, Controller>();
	
	@PostConstruct
	public void initialize() {
		entityControllerMap.put("employee", employeeController);
		entityControllerMap.put("student", studentController);
	}

	@SuppressWarnings("unchecked")
	@GetMapping
	Response<?> findAll(final @PathVariable("entity") String entity) {
		try {
			return this.entityControllerMap.get(entity).findAll();
		} catch (NullPointerException e) {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}

	@SuppressWarnings("unchecked")
	@GetMapping("/{id}")
	Response<?> findById(final @PathVariable("entity") String entity, final @PathVariable Object id) {
		try {
			return this.entityControllerMap.get(entity).findByObjectId(id);
		} catch (NullPointerException e) {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
		
	}

	@SuppressWarnings("unchecked")
	@PostMapping
	Response<?> save(final @PathVariable("entity") String entity, @RequestBody @Validated final Object object) {
		try {
			return this.entityControllerMap.get(entity).saveObject(object);
		} catch (NullPointerException e) {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/{id}")
	Response<?> update(final @PathVariable Object id, final @PathVariable("entity") String entity,
			@RequestBody @Validated final Object object) {
		
		try {
			return this.entityControllerMap.get(entity).saveObject(object, id);
		} catch (NullPointerException e) {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
		
		Employee employeeEntity = this.employeeRepository.save((Employee) this.employeeRepository.findEntityById(id)
				.withFirstName(employee.getFirstName())
				.withLastName(employee.getLastName())
				.withMiddleName(employee.getMiddleName())
				.withLastModifiedBy("rajkumar")
				.withLastModifiedOn(Calendar.getInstance().getTime()));
		
		return this.responseUtil.withEmployee(this.employeeRepository.save(employeeEntity))
				.withMessage(this.config.getEmployeeUpdatedSuccessMessage());
		
	}
	
	@SuppressWarnings("unchecked")
	@DeleteMapping("/{id}")
	Response<?> delete(final @PathVariable("entity") String entity, @PathVariable final Object id) {
		try {
			return this.entityControllerMap.get(entity).deleteObjectById(id);
		} catch (NullPointerException e) {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}
}

interface EmployeeRepository extends CustomRepository<Employee, Long> {}
interface StudentRepository extends CustomRepository<Student, String> {}
