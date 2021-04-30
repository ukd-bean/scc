package org.ushakov.cash.entity;

import javax.persistence.*;

@Entity
public class SccGroup {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private Long parentId;

    @Column
    private Boolean isAdditional = false;

    public SccGroup() {}

    public SccGroup(String name) {
        this.name = name;
    }

    public SccGroup(String name, Long parentId) {
        this.name = name;
        this.parentId = parentId;
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

    public Boolean getAdditional() {
        return isAdditional;
    }

    public void setAdditional(Boolean additional) {
        isAdditional = additional;
    }
}
