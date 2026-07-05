package com.example.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubscriptionRequest {

    @NotBlank(message = "サブスク名は必須です")
    private String name;

    @NotNull(message = "金額は必須です")
    @Min(value = 0, message = "金額は0以上で入力してください")
    private Integer amount;

    @NotNull(message = "支払い日は必須です")
    @Min(value = 1, message = "支払い日は1以上で入力してください")
    private Integer paymentDay;

    @NotBlank(message = "支払いタイプは必須です")
    private String paymentType;
}
