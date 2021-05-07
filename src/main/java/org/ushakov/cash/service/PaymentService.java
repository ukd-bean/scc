package org.ushakov.cash.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ushakov.cash.dao.PaymentDao;
import org.ushakov.cash.entity.SccPayment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    private PaymentDao paymentDao;

    @Autowired
    public PaymentService(PaymentDao paymentDao) {
        this.paymentDao = paymentDao;
    }

    public SccPayment createPayment(String comment, LocalDateTime dateTime, BigDecimal cost, Long groupId) {
        SccPayment payment = new SccPayment(comment, dateTime, cost, groupId);
        return paymentDao.save(payment);
    }

    public SccPayment createPayment(BigDecimal cost, Long groupId) {
        SccPayment payment = new SccPayment(cost, groupId);
        return paymentDao.save(payment);
    }

    public List<SccPayment> getAll() {
        return paymentDao.findAll();
    }

    public List<SccPayment> getByGroup(Long groupId) {
        return paymentDao.findByGroupId(groupId);
    }
}
