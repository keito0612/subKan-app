package com.example.api.service;

import com.example.api.dto.SubscriptionRequest;
import com.example.api.dto.SubscriptionResponse;
import com.example.api.entity.Subscription;
import com.example.api.entity.User;
import com.example.api.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public List<SubscriptionResponse> getAllSubscriptions(Long userId) {
        return subscriptionRepository.findByUserUserId(userId).stream()
                .map(SubscriptionResponse::fromEntity)
                .toList();
    }

    public SubscriptionResponse getSubscription(Long subscriptionId, Long userId) {
        Subscription subscription = subscriptionRepository
                .findBySubscriptionIdAndUserUserId(subscriptionId, userId)
                .orElseThrow(() -> new RuntimeException("サブスクリプションが見つかりません"));

        return SubscriptionResponse.fromEntity(subscription);
    }

    @Transactional
    public SubscriptionResponse createSubscription(SubscriptionRequest request, User user) {
        Subscription subscription = new Subscription();
        subscription.setName(request.getName());
        subscription.setAmount(request.getAmount());
        subscription.setPaymentDay(request.getPaymentDay());
        subscription.setPaymentType(request.getPaymentType());
        subscription.setUser(user);

        Subscription saved = subscriptionRepository.save(subscription);
        return SubscriptionResponse.fromEntity(saved);
    }

    @Transactional
    public SubscriptionResponse updateSubscription(Long subscriptionId, SubscriptionRequest request, Long userId) {
        Subscription subscription = subscriptionRepository
                .findBySubscriptionIdAndUserUserId(subscriptionId, userId)
                .orElseThrow(() -> new RuntimeException("サブスクリプションが見つかりません"));

        subscription.setName(request.getName());
        subscription.setAmount(request.getAmount());
        subscription.setPaymentDay(request.getPaymentDay());
        subscription.setPaymentType(request.getPaymentType());

        Subscription updated = subscriptionRepository.save(subscription);
        return SubscriptionResponse.fromEntity(updated);
    }

    @Transactional
    public void deleteSubscription(Long subscriptionId, Long userId) {
        Subscription subscription = subscriptionRepository
                .findBySubscriptionIdAndUserUserId(subscriptionId, userId)
                .orElseThrow(() -> new RuntimeException("サブスクリプションが見つかりません"));

        subscriptionRepository.delete(subscription);
    }
}
