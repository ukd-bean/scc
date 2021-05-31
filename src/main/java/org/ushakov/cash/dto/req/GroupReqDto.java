package org.ushakov.cash.dto.req;

import org.springframework.stereotype.Component;

@Component
public class GroupReqDto {

    private Long id;

    private String name;

    private Long parentId;

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

    @Override
    public String toString() {
        return "GroupReqDto{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", parentId=" + parentId +
            '}';
    }
}
