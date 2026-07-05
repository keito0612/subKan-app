package com.example.api.controller;

import com.example.api.dto.MessageResponse;
import com.example.api.dto.SubscriptionRequest;
import com.example.api.dto.SubscriptionResponse;
import com.example.api.entity.User;
import com.example.api.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<List<SubscriptionResponse>> getAllSubscriptions(
            @AuthenticationPrincipal User user) {
        List<SubscriptionResponse> subscriptions = subscriptionService.getAllSubscriptions(user.getUserId());
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionResponse> getSubscription(
            @PathVariable("id") Long subscriptionId,
            @AuthenticationPrincipal User user) {
        SubscriptionResponse subscription = subscriptionService.getSubscription(subscriptionId, user.getUserId());
        return ResponseEntity.ok(subscription);
    }

    @PostMapping
    public ResponseEntity<SubscriptionResponse> createSubscription(
            @Valid @RequestBody SubscriptionRequest request,
            @AuthenticationPrincipal User user) {
        SubscriptionResponse subscription = subscriptionService.createSubscription(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(subscription);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionResponse> updateSubscription(
            @PathVariable("id") Long subscriptionId,
            @Valid @RequestBody SubscriptionRequest request,
            @AuthenticationPrincipal User user) {
        SubscriptionResponse subscription = subscriptionService.updateSubscription(subscriptionId, request, user.getUserId());
        return ResponseEntity.ok(subscription);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteSubscription(
            @PathVariable("id") Long subscriptionId,
            @AuthenticationPrincipal User user) {
        subscriptionService.deleteSubscription(subscriptionId, user.getUserId());
        return ResponseEntity.ok(new MessageResponse("削除成功"));
    }
}
