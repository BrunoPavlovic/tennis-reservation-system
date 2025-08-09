package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(Integer userId){
        return userRepository.findById(userId).get();
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User getUserByEmailForUpdate(String email){
        return userRepository.findByEmailForUpdate(email);
    }

    public Double getCreditAmount(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return user.getCreditAmount() != null ? user.getCreditAmount() : 0.0;
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
}
