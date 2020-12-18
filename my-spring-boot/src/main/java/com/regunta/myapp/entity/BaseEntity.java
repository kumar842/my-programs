package com.regunta.myapp.entity;

import java.util.Date;

import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	
	@JsonIgnore
	private Boolean isValid;
	
	public BaseEntity setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
		return this;
	}
	
	public BaseEntity setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
		return this;
	}
	
	public BaseEntity setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
		return this;
	}
	
	public BaseEntity setLastModifiedOn(Date lastModifiedOn) {
		this.lastModifiedOn = lastModifiedOn;
		return this;
	}
	
	public BaseEntity setIsValid(Boolean isValid) {
		this.isValid = isValid;
		return this;
	}
}
