package com.taskmanagement.dto;

import java.util.List;

import com.taskmanagement.entity.User;

import lombok.Data;

@Data
public class UsersResponseDto extends CommonApiResponse {
	
	private List<User> users;

}
