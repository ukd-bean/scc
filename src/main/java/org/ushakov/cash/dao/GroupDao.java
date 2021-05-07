package org.ushakov.cash.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.ushakov.cash.entity.SccGroup;

import java.util.List;

@Repository
public interface GroupDao extends CrudRepository<SccGroup, Long> {
    List<SccGroup> findByName(String name);
    List<SccGroup> findAll();
    List<SccGroup> findByParentIdIsNull();
    List<SccGroup> findByParentId(Long id);
}
