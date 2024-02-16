package com.taskmanagement.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.beans.BeanUtils;

import com.taskmanagement.dto.UserLoginResponse;

import lombok.Data;

@Entity
@Data
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
    
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	private int age;
	
	private String sex;
	
	@Column(name = "email_id")
	private String emailId;
	
	private String contact;
	
	private String street;
	
	private String city;
	
	private String pincode;
	
	private String password;
	
	private String role;
	
	private int status;
	
	@ManyToOne
	@JoinColumn(name = "department_id", nullable = false)
	private Department dept;

	public static UserLoginResponse toUserLoginResponse(User user) {
		UserLoginResponse userLoginResponse=new UserLoginResponse();
		BeanUtils.copyProperties(user, userLoginResponse, "password");		
		return userLoginResponse;
	}

	public User(int id, String firstName, String lastName, int age, String sex, String emailId, String contact,
			String street, String city, String pincode, String password, String role, int status, Department dept) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.sex = sex;
		this.emailId = emailId;
		this.contact = contact;
		this.street = street;
		this.city = city;
		this.pincode = pincode;
		this.password = password;
		this.role = role;
		this.status = status;
		this.dept = dept;
	}
	
	
	
}
