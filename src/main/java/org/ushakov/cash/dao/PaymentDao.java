package org.ushakov.cash.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.ushakov.cash.entity.SccPayment;

import java.util.List;

@Repository
public interface PaymentDao extends CrudRepository<SccPayment, Long> {
    List<SccPayment> findAll();
    List<SccPayment> findByGroupId(Long id);
}
