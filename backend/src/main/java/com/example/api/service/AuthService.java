package com.example.api.service;

import com.example.api.dto.AuthResponse;
import com.example.api.dto.LoginRequest;
import com.example.api.dto.MessageResponse;
import com.example.api.dto.SignUpRequest;
import com.example.api.entity.User;
import com.example.api.repository.UserRepository;
import com.example.api.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("メールアドレスまたはパスワードが正しくありません"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("メールアドレスまたはパスワードが正しくありません");
        }

        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail());
        return new AuthResponse("ログイン成功", token);
    }

    public AuthResponse signUp(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("このメールアドレスは既に登録されています");
        }

        User user = new User();
        user.setUserName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(savedUser.getUserId(), savedUser.getEmail());
        return new AuthResponse("新規登録成功", token);
    }
}
