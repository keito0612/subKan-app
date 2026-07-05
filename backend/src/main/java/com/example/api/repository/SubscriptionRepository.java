package com.example.api.repository;

import com.example.api.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUserUserId(Long userId);
    Optional<Subscription> findBySubscriptionIdAndUserUserId(Long subscriptionId, Long userId);
}
