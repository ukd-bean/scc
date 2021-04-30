package org.ushakov.cash.dto;

import org.springframework.stereotype.Component;
import org.ushakov.cash.entity.SccGroup;

import java.util.List;

@Component
public class GroupDto {

    private Long id;

    private String name;

    private List<SccGroup> children;

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

    public List<SccGroup> getChildren() {
        return children;
    }

    public void setChildren(List<SccGroup> children) {
        this.children = children;
    }
}
