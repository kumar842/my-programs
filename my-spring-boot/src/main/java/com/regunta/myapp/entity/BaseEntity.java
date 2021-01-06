package com.regunta.myapp.entity;

import java.util.Date;

import javax.persistence.MappedSuperclass;

import lombok.Data;

/**
 * base entity
 * 
 * @author rregunta
 *
 */
@Data
@MappedSuperclass
public class BaseEntity {
	private String createdBy;
	private Date createdOn;
	private String lastModifiedBy;
	private Date lastModifiedOn;
	
	public BaseEntity withCreatedBy(String createdBy) {
		this.createdBy = createdBy;
		return this;
	}
	
	public BaseEntity withCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
		return this;
	}
	
	public BaseEntity withLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
		return this;
	}
	
	public BaseEntity withLastModifiedOn(Date lastModifiedOn) {
		this.lastModifiedOn = lastModifiedOn;
		return this;
	}
}
