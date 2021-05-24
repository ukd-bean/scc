package org.ushakov.cash.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class SccPayment {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String comment;

    @Column(nullable = false)
    private BigDecimal cost;

    @Column
    private Long groupId;

    @Column(nullable = false)
    private LocalDate date;

    public SccPayment() {}

    public SccPayment(BigDecimal cost, Long groupId) {
        this.cost = cost;
        this.groupId = groupId;
    }

    public SccPayment(String comment, LocalDate date, BigDecimal cost, Long groupId) {
        this.comment = comment;
        this.cost = cost;
        this.groupId = groupId;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
