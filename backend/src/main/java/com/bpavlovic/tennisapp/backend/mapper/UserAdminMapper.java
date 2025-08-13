package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.UserAdminDto;
import com.bpavlovic.tennisapp.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserAdminMapper {

    public UserAdminDto toDto(User user) {
        UserAdminDto userAdminDto = new UserAdminDto();
        userAdminDto.setUserId(user.getUserId());
        userAdminDto.setFirstName(user.getFirstName());
        userAdminDto.setLastName(user.getLastName());
        userAdminDto.setEmail(user.getEmail());
        userAdminDto.setRole(user.getRole());
        userAdminDto.setCreditAmount(user.getCreditAmount());
        userAdminDto.setCreatedAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null);
        userAdminDto.setActive(user.getActive() != null ? user.getActive() : true);

        return userAdminDto;
    }
}
