package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.UserRegistrationDto;
import com.bpavlovic.tennisapp.backend.mapper.UserMapper;
import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User registerUser (UserRegistrationDto userRegistrationDto) {
        if (userRepository.findByEmail(userRegistrationDto.getEmail()) != null) {
            throw new IllegalArgumentException("User with that email already exists!");
        }

        User user = userMapper.toEntity(userRegistrationDto);
        return userRepository.save(user);
    }
}
