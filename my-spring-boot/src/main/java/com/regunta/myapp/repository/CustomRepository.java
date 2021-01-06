package com.regunta.myapp.repository;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.util.CollectionUtils;

import com.google.gson.Gson;

/**
 * 
 * @author rregunta
 *
 */
@NoRepositoryBean
public interface CustomRepository<T, ID> extends JpaRepository<T, ID> {
	
	@SuppressWarnings("unchecked")
	default T findObjectById(final Object id, final Class<?> entityClass) {
		String primaryKeyType = getPrimaryField(entityClass);
		return findById(getIDById(primaryKeyType, id)).get();
	}
	
	@SuppressWarnings("unchecked")
	default T saveObject(Object object, final Class<?> entityClass) {
		Gson gson = new Gson();
		return save((T) gson.fromJson(gson.toJson(object), entityClass));
	}
	
	@SuppressWarnings("unchecked")
	default void deleteObjectById(final Object id, final Class<?> entityClass) {
		String primaryKeyType = getPrimaryField(entityClass);
		deleteById(getIDById(primaryKeyType, id));
	}
	
	default List<T> findAllEntities(final Class<?> entityClass) {
		List<T> ts = findAll();
		if (CollectionUtils.isEmpty(ts)) {
			throw new RuntimeException(String.format("%ss not found", entityClass.getSimpleName()));
		}
		return ts;
	}
	
	default String getPrimaryField(Class<?> class1) {
		Field[] fields = class1.getDeclaredFields();
		for (Field field : fields) {
			for (Annotation annotation : field.getAnnotations()) {
				if(annotation.toString().contains("persistence.Id")) {
					return field.getType().getCanonicalName();
				}
			}
		}
		return "";
	}
	
	@SuppressWarnings("unchecked")
	default ID getIDById(final String primaryKeyType, final Object id) {
		System.out.println("primaryKeyType : " + primaryKeyType);
		switch (primaryKeyType) {
			case "java.lang.Long":
				return (ID) Long.valueOf(Long.parseLong(id.toString()));
			case "java.lang.String":
				return (ID) id.toString();
			default:
				throw new RuntimeException("Unsupported primary key type!!");
		}
	}
}
