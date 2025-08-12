package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.UserDto;
import com.bpavlovic.tennisapp.backend.dto.UserRegistrationDto;
import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class UserMapper {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final MembershipRepository membershipRepository;

    public User toEntity(UserRegistrationDto userRegistrationDto){
        User user = new User();
        user.setFirstName(userRegistrationDto.getFirstName());
        user.setLastName(userRegistrationDto.getLastName());
        user.setEmail(userRegistrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(userRegistrationDto.getPassword()));
        user.setRole("USER");
        user.setCreditAmount(0.0);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return user;
    }

    public UserDto toDto(User user){
        UserDto userDto = new UserDto();
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setCredit(user.getCreditAmount());
        userDto.setClub(membershipRepository.findMembershipByUser(user).getClub().getName());

        return userDto;
    }

    public User changePassword(User user, String password){
        user.setPassword(passwordEncoder.encode(password));
        return user;
    }
}
