package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.PaymentIntentRequest;
import com.bpavlovic.tennisapp.backend.dto.PaymentVerificationRequest;
import com.bpavlovic.tennisapp.backend.dto.PaymentVerificationResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${cors.origins}")
    private String baseUrl;

    private final UserService userService;

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
                .build();

        Session session = Session.create(params);
        return session.getUrl();
    }

    public PaymentVerificationResponse verifyPayment(PaymentVerificationRequest paymentVerificationRequest) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        Session session = Session.retrieve(paymentVerificationRequest.getSessionId());
        PaymentIntent paymentIntent = PaymentIntent.retrieve(session.getPaymentIntent());

        if ("succeeded".equals(paymentIntent.getStatus())) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            long amountReceived = paymentIntent.getAmountReceived();
            double amount = amountReceived / 100.0;

            double currentCredit = userService.getCreditAmount(username);
            double newCredit = currentCredit + amount;
            userService.updateCreditAmount(username, newCredit);

            return new PaymentVerificationResponse(newCredit, amount, true, "Payment verified successfully");
        } else {
            return new PaymentVerificationResponse(0, 0, false, "Payment not completed");
        }
    }
}
