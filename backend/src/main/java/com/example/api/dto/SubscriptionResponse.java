package com.example.api.dto;

import com.example.api.entity.Subscription;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionResponse {
    private Long subscriptionId;
    private String name;
    private Integer amount;
    private Integer paymentDay;
    private String paymentType;

    public static SubscriptionResponse fromEntity(Subscription subscription) {
        return new SubscriptionResponse(
            subscription.getSubscriptionId(),
            subscription.getName(),
            subscription.getAmount(),
            subscription.getPaymentDay(),
            subscription.getPaymentType()
        );
    }
}
