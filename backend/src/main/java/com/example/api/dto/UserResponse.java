package com.example.api.dto;

import com.example.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long userId;
    private String userName;
    private String email;

    public static UserResponse fromEntity(User user) {
        return new UserResponse(
            user.getUserId(),
            user.getUserName(),
            user.getEmail()
        );
    }
}
