package org.ushakov.cash.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ushakov.cash.dao.PaymentDao;
import org.ushakov.cash.entity.SccPayment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private PaymentDao paymentDao;

    @Autowired
    public PaymentService(PaymentDao paymentDao) {
        this.paymentDao = paymentDao;
    }

    public List<SccPayment> getByMonth(LocalDate monthDate) {
        LocalDate start = LocalDate.of(monthDate.getYear(), monthDate.getMonth(), 1);
        LocalDate end = LocalDate.of(
            monthDate.getYear(),
            monthDate.getMonth(),
            monthDate.getMonth().length(monthDate.isLeapYear()));
        return paymentDao.findByDateBetweenOrderByIdDesc(start, end);
    }

    public List<SccPayment> getByGroupId(Long groupId) {
        return paymentDao.findByGroupId(groupId);
    }

    public List<SccPayment> getByGroupIdAndMonth(Long groupId, LocalDate monthDate) {
        LocalDate start = LocalDate.of(monthDate.getYear(), monthDate.getMonth(), 1);
        LocalDate end = LocalDate.of(
            monthDate.getYear(),
            monthDate.getMonth(),
            monthDate.getMonth().length(monthDate.isLeapYear()));
        return paymentDao.findByGroupIdAndDateBetweenOrderByIdDesc(groupId, start, end);
    }

    public SccPayment createPayment(String comment, LocalDate date, BigDecimal cost, Long groupId) {
        SccPayment payment = new SccPayment(comment, date, cost, groupId);
        payment.setCreateDate(LocalDateTime.now());
        return paymentDao.save(payment);
    }

    public void changePaymentsGroupId(Long groupId, Long newGroupId) {
        List<SccPayment> payments = paymentDao.findByGroupId(groupId);
        payments.stream().forEach(payment -> {
            payment.setGroupId(newGroupId);
            payment.setReplaceDate(LocalDateTime.now());
        });
        paymentDao.saveAll(payments);
    }

    public void replacePayments(List<Long> ids, Long newGroupId) {
        List<SccPayment> payments = (List<SccPayment>) paymentDao.findAllById(ids);
        payments.stream().forEach(payment -> {
            payment.setGroupId(newGroupId);
            payment.setReplaceDate(LocalDateTime.now());
        });
        paymentDao.saveAll(payments);
    }

    public SccPayment updatePayment(Long id, String comment, LocalDate date, BigDecimal cost) {
        Optional<SccPayment> optional = paymentDao.findById(id);
        if(optional.isPresent()) {
            SccPayment payment = optional.get();
            payment.setComment(comment);
            payment.setDate(date);
            payment.setCost(cost);
            payment.setUpdateDate(LocalDateTime.now());
            return paymentDao.save(payment);
        } else {
            return null;
        }
    }

    public void replacePayment(Long id, Long groupId) {
        Optional<SccPayment> optional = paymentDao.findById(id);
        if(optional.isPresent()) {
            SccPayment payment = optional.get();
            payment.setGroupId(groupId);
            payment.setReplaceDate(LocalDateTime.now());
            paymentDao.save(payment);
        }
    }

    public void deletePayment(Long id) {
        paymentDao.deleteById(id);
    }
}
