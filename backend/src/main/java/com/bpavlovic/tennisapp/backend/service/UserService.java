package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.UserDto;
import com.bpavlovic.tennisapp.backend.mapper.UserMapper;
import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserById(Integer userId){
        return userRepository.findById(userId).get();
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User getUserByEmailForUpdate(String email){
        return userRepository.findByEmailForUpdate(email);
    }

    public UserDto getUser() {
        User user = getUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        return userMapper.toDto(user);
    }

    public Double updateCreditAmount(String userEmail, Double newCreditAmount) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        
        if (newCreditAmount < 0) {
            throw new IllegalArgumentException("Credit amount cannot be negative");
        }
        
        user.setCreditAmount(newCreditAmount);
        User savedUser = userRepository.save(user);
        return savedUser.getCreditAmount();
    }

    public void updateEmail(String newEmail){
        User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        User existingUser = userRepository.findByEmail(newEmail);
        if (existingUser != null && !existingUser.getUserId().equals(user.getUserId())) {
            throw new IllegalArgumentException("Email is already taken by another user");
        }

        user.setEmail(newEmail);
        userRepository.save(user);
    }

    public void updatePassword(String currentPassword, String newPassword){
        User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new IllegalArgumentException("New password must be different from current password");
        }

        user = userMapper.changePassword(user, newPassword);
        userRepository.save(user);
    }
}
