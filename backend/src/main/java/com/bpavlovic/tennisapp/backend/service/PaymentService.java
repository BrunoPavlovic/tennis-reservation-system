package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.CreditTransactionDto;
import com.bpavlovic.tennisapp.backend.dto.PaymentIntentRequest;
import com.bpavlovic.tennisapp.backend.dto.PaymentVerificationRequest;
import com.bpavlovic.tennisapp.backend.dto.PaymentVerificationResponse;
import com.bpavlovic.tennisapp.backend.model.User;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentUpdateParams;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${cors.origins}")
    private String baseUrl;

    private final UserService userService;
    private final CreditTransactionService creditTransactionService;

    public String createCheckoutSession(PaymentIntentRequest paymentIntentRequest) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(baseUrl+"/payment-success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(baseUrl+"/payment-cancelled")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("eur")
                                                .setUnitAmount((long) paymentIntentRequest.getAmount())
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Credit Purchase")
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                )
                .setLocale(SessionCreateParams.Locale.EN)
                .build();

        Session session = Session.create(params);
        return session.getUrl();
    }

    @Transactional
    public PaymentVerificationResponse verifyPayment(PaymentVerificationRequest paymentVerificationRequest) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        Session session = Session.retrieve(paymentVerificationRequest.getSessionId());
        PaymentIntent paymentIntent = PaymentIntent.retrieve(session.getPaymentIntent());


        if ("succeeded".equals(paymentIntent.getStatus())) {;
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            String paymentIntentId = paymentIntent.getId();

            User user = userService.getUserByEmailForUpdate(email);

            if (creditTransactionService.existsByPaymentIntentId(paymentIntentId)) {
                double currentCredit = userService.getUser().getCredit();
                return new PaymentVerificationResponse(currentCredit, paymentIntent.getAmountReceived() / 100.0, true, "Payment already processed");
            }

            double amount = paymentIntent.getAmountReceived() / 100.0;
            double currentCredit = userService.getUser().getCredit();
            double newCredit = currentCredit + amount;
            userService.updateCreditAmount(email, newCredit);

            creditTransactionService.savePayment(new CreditTransactionDto(user, amount, "PAYMENT"), paymentIntentId);

            return new PaymentVerificationResponse(newCredit, amount, true, "Payment verified successfully");
        } else {
            return new PaymentVerificationResponse(0, 0, false, "Payment not completed");
        }
    }
}
