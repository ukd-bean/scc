package org.ushakov.cash.dto.resp;

import org.ushakov.cash.entity.SccPayment;

import java.util.List;

public class GroupRespDto {

    private Long id;

    private String name;

    private Long parentId;

    private Boolean isAdditional;

    private List<SccPayment> payments;

    private List<GroupRespDto> children;

    public GroupRespDto(Long id, String name, List<GroupRespDto> children, Boolean isAdditional) {
        this.id = id;
        this.name = name;
        this.children = children;
        this.isAdditional = isAdditional;
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

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public List<GroupRespDto> getChildren() {
        return children;
    }

    public void setChildren(List<GroupRespDto> children) {
        this.children = children;
    }

    public Boolean getAdditional() {
        return isAdditional;
    }

    public void setAdditional(Boolean additional) {
        isAdditional = additional;
    }

    public List<SccPayment> getPayments() {
        return payments;
    }

    public void setPayments(List<SccPayment> payments) {
        this.payments = payments;
    }

    @Override
    public String toString() {
        return "GroupRespDto{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", parentId=" + parentId +
            ", isAdditional=" + isAdditional +
            ", payments=" + payments +
            ", children=" + children +
            '}';
    }
}
