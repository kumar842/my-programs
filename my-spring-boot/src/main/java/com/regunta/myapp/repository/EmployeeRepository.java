package com.regunta.myapp.repository;

import java.util.List;
import java.util.Optional;

//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import com.regunta.myapp.entity.Employee;

/**
 * 
 * @author rregunta
 *
 */
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	List<Employee> findByIsValid(Boolean isValid);

	Optional<Employee> findByIdAndIsValid(Long id, Boolean isValid);
	
	List<Employee> findByFirstNameAndLastName(String firstName, String lastName);
	List<Employee> findByFirstNameIgnoreCaseContaining(String firstName);
	List<Employee> findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrMiddleNameIgnoreCaseContaining(
			String firstName, String lastName, String midddleName);
	List<Employee> findByLastNameAndFirstNameAllIgnoreCase(String lastName, String firstName); //AllIgnoreCase
	
	//distinct
	List<Employee> findDistinctEmployeeByLastNameOrFirstName(String lastName, String firstName);
	List<Employee> findEmployeeDistinctByLastNameOrFirstName(String lastName, String firstName);

	// Order By
	List<Employee> findByLastNameOrderByFirstNameAsc(String lastName);
	
	//List<Employee> findByAddressZipCode(ZipCode zipCode); emp.address.zipCode
	//List<Employee> findByAddress_ZipCode(ZipCode zipCode); emp.address.zipCode //TODO: resolve this ambiguity
	
	//Page<Employee> findByLastName(String lastName, Pageable pageable);
	//Slice<Employee> findByLastName(String lastName, Pageable pageable);
	//List<Employee> findByLastName(String lastName, Sort sort);
	//List<Employee> findByLastName(String lastName, Pageable pageable);
	
	//Limit
	//findFirst10ByByFirstnNameOrderByLastnameAsc(String firstName)
	//findTop10ByByFirstnNameOrderByLastnameAsc(String firstName)
	
	/**
	 * -------------- Notes ----------------
	 * Prefixes: find...By, read...By, query...By, count...By, get...By, delete...By (All)
	 * Concatenation: And/OR
	 * Operators: Not, In, NotIn, Between, LessThan, LessThanEqual, GreaterThan, GreaterThanEqual, Like, NotLike, 
	 * 		StartingWith, EndingWith, Containing, Null, IsNull, NotNull, IsNotNull, After, Before
	 * IgnoreCase / AllIgnoreCase for string instances
	 * OrderBy: Asc/Desc
	 * Limit: First, First10, Top, Top5
	 * 
	 * findAll
	 * existsBy
	 * 
	 * Links: 
	 * https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods
	 * https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation
	 * 
	 */

}
