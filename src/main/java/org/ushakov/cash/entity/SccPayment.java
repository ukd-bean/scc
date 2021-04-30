package org.ushakov.cash.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
public class SccPayment {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String name;

    @Column(nullable = false)
    private BigDecimal cost;

    @Column(nullable = false)
    private Long groupId;

    public SccPayment() {}

    public SccPayment(BigDecimal cost, Long groupId) {
        this.cost = cost;
        this.groupId = groupId;
    }

    public SccPayment(String name, BigDecimal cost, Long groupId) {
        this.name = name;
        this.cost = cost;
        this.groupId = groupId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }
}
