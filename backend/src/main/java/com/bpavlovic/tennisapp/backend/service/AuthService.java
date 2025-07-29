package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.JwtResponse;
import com.bpavlovic.tennisapp.backend.dto.MembershipDto;
import com.bpavlovic.tennisapp.backend.dto.UserLoginDto;
import com.bpavlovic.tennisapp.backend.dto.UserRegistrationDto;
import com.bpavlovic.tennisapp.backend.mapper.MembershipMapper;
import com.bpavlovic.tennisapp.backend.mapper.UserMapper;
import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.repository.UserRepository;
import com.bpavlovic.tennisapp.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final MembershipMapper membershipMapper;
    private final MembershipService membershipService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public void registerUser (UserRegistrationDto userRegistrationDto) {
        if (userRepository.findByEmail(userRegistrationDto.getEmail()) != null) {
            throw new IllegalArgumentException("User with that email already exists!");
        }

        User user = userMapper.toEntity(userRegistrationDto);
        userRepository.save(user);

        MembershipDto membershipDto = membershipMapper.toDto(user.getUserId(), userRegistrationDto.getClub());
        membershipService.addMembership(membershipDto);
    }

    public JwtResponse login(UserLoginDto userLoginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtil.generateToken((UserDetails) authentication.getPrincipal());
        return new JwtResponse(jwt);
    }
}
