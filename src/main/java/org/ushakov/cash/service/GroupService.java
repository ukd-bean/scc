package org.ushakov.cash.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ushakov.cash.dao.GroupDao;
import org.ushakov.cash.dto.resp.GroupRespDto;
import org.ushakov.cash.entity.SccGroup;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {

    private GroupDao groupDao;

    @Autowired
    public GroupService(GroupDao groupDao) {
        this.groupDao = groupDao;
    }

    public SccGroup createGroup(String name) {
        SccGroup group = new SccGroup(name);
        return groupDao.save(group);
    }

    public SccGroup createChildGroup(String name, Long parentId) {
        SccGroup group = new SccGroup(name, parentId);
        return groupDao.save(group);
    }

    public List<GroupRespDto> getAll() {
        return convertEntityToDto(groupDao.findByParentIdIsNull());
    }

    private List<GroupRespDto> convertEntityToDto(List<SccGroup> groups) {
        return groups.stream()
                .map(entity -> new GroupRespDto(
                        entity.getId(),
                        entity.getName(),
                        convertEntityToDto(groupDao.findByParentId(entity.getId())),
                        entity.getAdditional()))
                .collect(Collectors.toList());
    }
}
