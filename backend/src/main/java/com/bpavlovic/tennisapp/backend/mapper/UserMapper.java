package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.UserRegistrationDto;
import com.bpavlovic.tennisapp.backend.model.User;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class UserMapper {
    public User toEntity(UserRegistrationDto userRegistrationDto){
        User user = new User();
        user.setFirstName(userRegistrationDto.getFirstName());
        user.setLastName(userRegistrationDto.getLastName());
        user.setEmail(userRegistrationDto.getEmail());
        user.setPassword(userRegistrationDto.getPassword()); //for testing, need to hash it
        user.setRole("USER");
        user.setCreditAmount(0.0);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return user;
    }
}
