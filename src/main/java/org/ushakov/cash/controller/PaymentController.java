package org.ushakov.cash.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
import org.ushakov.cash.dto.req.PaymentReqDto;
import org.ushakov.cash.dto.req.ReplacePaymentsReqDto;
import org.ushakov.cash.entity.SccPayment;
import org.ushakov.cash.service.PaymentService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
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

    @GetMapping
    @ResponseBody
    public List<SccPayment> getAll(@RequestParam String date) {
        LocalDate monthDate = convertStringDateToLocalDate(date);
        return paymentService.getByMonth(monthDate);
    }

    @PostMapping
    @ResponseBody
    public SccPayment create(@RequestBody PaymentReqDto dto) {
        return paymentService.createPayment(dto.getComment(), dto.getDate(), dto.getCost(), dto.getGroupId());
    }

    @PatchMapping
    @ResponseBody
    public SccPayment update(@RequestBody PaymentReqDto dto) {
        return paymentService.updatePayment(dto.getId(), dto.getComment(), dto.getDate(), dto.getCost());
    }

    @PatchMapping("/replace")
    @ResponseBody
    public void replace(@RequestBody ReplacePaymentsReqDto dto) {
        paymentService.replacePayments(dto.getIds(), dto.getGroupId());
    }

    @DeleteMapping
    @ResponseBody
    public void delete(@RequestParam Long id) {
        paymentService.deletePayment(id);
    }

    public LocalDate convertStringDateToLocalDate(String dateMs) {
        Date date = new Date();
        date.setTime(Long.parseLong(dateMs));
        return date.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();
    }
}
