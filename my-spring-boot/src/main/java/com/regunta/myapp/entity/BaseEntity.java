package com.regunta.myapp.entity;

import java.io.Serializable;
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
//@Entity
@MappedSuperclass
public class BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String createdBy;
	private Date createdOn;
	private String lastModifiedBy;
	private Date lastModifiedOn;
	@JsonIgnore
	private Boolean isValid;
}
