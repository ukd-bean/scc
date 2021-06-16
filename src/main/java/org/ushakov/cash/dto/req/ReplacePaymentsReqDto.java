package org.ushakov.cash.dto.req;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReplacePaymentsReqDto {

    private List<Long> ids;

    private Long groupId;

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
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
            "ids=" + ids +
            ", groupId=" + groupId +
            '}';
    }
}
