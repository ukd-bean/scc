package org.ushakov.cash.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
import org.ushakov.cash.dto.PaymentDto;
import org.ushakov.cash.entity.SccPayment;
import org.ushakov.cash.service.PaymentService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/payment")
@ComponentScan("org.ushakov")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/all")
    @ResponseBody
    public List<SccPayment> getAllPayments() {
        return paymentService.getAll();
    }

    @PostMapping("/")
    @ResponseBody
    public SccPayment create(@RequestBody PaymentDto dto) {
        return paymentService.createPayment(dto.getName(), dto.getCost(), dto.getGroupId());
    }
}
