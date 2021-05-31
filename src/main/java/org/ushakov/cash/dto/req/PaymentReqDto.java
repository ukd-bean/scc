package org.ushakov.cash.dto.req;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class PaymentReqDto {

    private Long id;

    private LocalDate date;

    private String comment;

    private BigDecimal cost;

    private Long groupId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

    @Override
    public String toString() {
        return "PaymentReqDto{" +
            "id=" + id +
            ", date=" + date +
            ", comment='" + comment + '\'' +
            ", cost=" + cost +
            ", groupId=" + groupId +
            '}';
    }
}
