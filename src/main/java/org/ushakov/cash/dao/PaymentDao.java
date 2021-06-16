package org.ushakov.cash.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.ushakov.cash.entity.SccPayment;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentDao extends CrudRepository<SccPayment, Long> {
    List<SccPayment> findByGroupId(Long id);
    List<SccPayment> findByGroupIdAndDateBetweenOrderByIdDesc(Long id, LocalDate start, LocalDate end);
}
