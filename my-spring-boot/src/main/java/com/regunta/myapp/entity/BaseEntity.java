package com.regunta.myapp.entity;

import java.util.Date;

import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;

/**
 * base entity
 * 
 * @author rregunta
 *
 */
@Data
//@Entity
@MappedSuperclass
public class BaseEntity {
	@Getter private String createdBy;
	@Getter private Date createdOn;
	@Getter private String lastModifiedBy;
	@Getter private Date lastModifiedOn;
	@JsonIgnore
	@Getter private Boolean isValid;
	
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
