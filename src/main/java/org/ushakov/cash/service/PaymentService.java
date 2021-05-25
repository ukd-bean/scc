package org.ushakov.cash.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ushakov.cash.dao.PaymentDao;
import org.ushakov.cash.entity.SccGroup;
import org.ushakov.cash.entity.SccPayment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private PaymentDao paymentDao;

    @Autowired
    public PaymentService(PaymentDao paymentDao) {
        this.paymentDao = paymentDao;
    }

    public List<SccPayment> getByGroupId(Long groupId) {
        return paymentDao.findByGroupId(groupId);
    }

    public SccPayment createPayment(String comment, LocalDate date, BigDecimal cost, Long groupId) {
        SccPayment payment = new SccPayment(comment, date, cost, groupId);
        return paymentDao.save(payment);
    }

    public void changePaymentsGroupId(Long groupId, Long newGroupId) {
        List<SccPayment> payments = paymentDao.findByGroupId(groupId);
        payments.stream().forEach(payment -> payment.setGroupId(newGroupId));
        paymentDao.saveAll(payments);
    }

    public void updatePayment(Long id, String comment, LocalDate date, BigDecimal cost) {
        Optional<SccPayment> optional = paymentDao.findById(id);
        if(optional.isPresent()) {
            SccPayment payment = optional.get();
            payment.setComment(comment);
            payment.setDate(date);
            payment.setCost(cost);
            paymentDao.save(payment);
        }
    }

    public void replacePayment(Long id, Long groupId) {
        Optional<SccPayment> optional = paymentDao.findById(id);
        if(optional.isPresent()) {
            SccPayment payment = optional.get();
            payment.setGroupId(groupId);
            paymentDao.save(payment);
        }
    }

    public void deletePayment(Long id) {
        paymentDao.deleteById(id);
    }
}
