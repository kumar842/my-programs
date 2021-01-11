package com.regunta.myapp.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.repository.NoRepositoryBean;

import com.regunta.myapp.AppConfig;
import com.regunta.myapp.models.Response;
import com.regunta.myapp.repository.CustomRepository;
import com.regunta.myapp.util.ResponseUtil;

/**
 * The Class HealthController.
 */
@NoRepositoryBean
public class Controller<T, ID> {

	@Autowired
	ApplicationContext ctx;
	
	@Autowired
	private ResponseUtil<T> responseUtil;
	
	@Autowired
	private AppConfig config;
	
	Class<?> entityRepositoryType;
	Class<?> entityType;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	Response<T> findAll() {
		return responseUtil.withTs((List<T>) ((CustomRepository)this.ctx.getBean(entityRepositoryType)).findAllEntities(entityType))
				.withMessage(String.format(config.getEntitiesFetchedSuccessMessage(), entityType.getSimpleName()));
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	Response<T> findByObjectId(final Object id) {
		try {
			return this.responseUtil.withT((T) ((CustomRepository) this.ctx.getBean(entityRepositoryType)).findObjectById(id, entityType))
					.withMessage(String.format(this.config.getEntityWithIdFetchedSuccessMessage(), entityType.getSimpleName(), id));
		} catch (NoSuchElementException e) {
			throw new RuntimeException(String.format(config.getEntityWithIdNotFoundMessage(), entityType.getSimpleName(), id));
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	Response<T> saveObject(final Object object) {
		return this.responseUtil.withT((T) ((CustomRepository) this.ctx.getBean(entityRepositoryType)).saveObject(object, entityType))
		.withMessage(String.format(this.config.getEntityCreatedSuccessMessage(), entityType.getSimpleName()));
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Response<?> saveObject(Object object, Object id) {
		try {
			//TODO: optmize this... 
			T t = (T) ((CustomRepository) this.ctx.getBean(entityRepositoryType)).findObjectById(id, entityType);
			return this.responseUtil.withT((T) ((CustomRepository) this.ctx.getBean(entityRepositoryType)).saveObject(object, entityType))
					.withMessage(String.format(this.config.getEntityCreatedSuccessMessage(), entityType.getSimpleName()));
		} catch (NoSuchElementException e) {
			throw new RuntimeException(String.format(config.getEntityWithIdNotFoundMessage(), entityType.getSimpleName(), id));
		}
	}
	
//	Response<Employee> update(@PathVariable final Long id, 
//			@RequestBody @Validated final Employee employee) {
//		
//		Employee employeeEntity = this.customRepository.save((Employee) this.customRepository.findEntityById(id)
//				.withFirstName(employee.getFirstName())
//				.withLastName(employee.getLastName())
//				.withMiddleName(employee.getMiddleName())
//				.withLastModifiedBy("rajkumar")
//				.withLastModifiedOn(Calendar.getInstance().getTime()));
//		
//		return this.responseUtil.withEmployee(this.customRepository.save(employeeEntity))
//				.withMessage(this.config.getEmployeeUpdatedSuccessMessage());
//		
//	}
//	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	Response<T> deleteObjectById(final Object id) {
		try {
			((CustomRepository) this.ctx.getBean(entityRepositoryType)).deleteObjectById(id, entityType);
			return this.responseUtil.withMessage(String.format(this.config.getEntityDeletedSuccessMessage(), entityType.getSimpleName()));
		} catch (EmptyResultDataAccessException e) {
			throw new RuntimeException(String.format(config.getEntityWithIdNotFoundMessage(), entityType.getSimpleName(), id));
		}
	}

	
}


