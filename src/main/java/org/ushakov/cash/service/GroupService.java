package org.ushakov.cash.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ushakov.cash.dao.GroupDao;
import org.ushakov.cash.dto.resp.GroupRespDto;
import org.ushakov.cash.entity.SccGroup;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupService {

  private GroupDao groupDao;

  @Autowired
  public GroupService(GroupDao groupDao) {
    this.groupDao = groupDao;
  }

  public List<GroupRespDto> getAll() {
    return convertEntitiesToDtos(groupDao.findByParentIdIsNull());
  }

  public GroupRespDto getById(Long id) {
    Optional<SccGroup> group = groupDao.findById(id);
    return group.map(this::convertEntityToDto).orElse(null);
  }

  public List<SccGroup> getByParentId(Long parentId) {
    return groupDao.findByParentId(parentId);
  }

  public SccGroup createGroup(String name) {
    SccGroup group = new SccGroup(name);
    return groupDao.save(group);
  }

  public SccGroup createChildGroup(String name, Long parentId) {
    SccGroup group = new SccGroup(name, parentId);
    return groupDao.save(group);
  }

  public SccGroup updateGroupName(Long id, String name) {
    Optional<SccGroup> group = groupDao.findById(id);
    if (group.isPresent()) {
      SccGroup groupEntity = group.get();
      groupEntity.setName(name);
      return groupDao.save(groupEntity);
    } else {
      return null;
    }
  }

  public void changeChildrenParent(Long parentId, Long childId) {
    List<SccGroup> children = getByParentId(childId);
    children.stream().forEach(group -> group.setParentId(parentId));
    groupDao.saveAll(children);
  }

  public void deleteGroupById(Long id) {
    groupDao.deleteById(id);
  }

  private GroupRespDto convertEntityToDto(SccGroup group) {
    return new GroupRespDto(
        group.getId(),
        group.getName(),
        convertEntitiesToDtos(groupDao.findByParentId(group.getId())),
        group.getAdditional());
  }

  private List<GroupRespDto> convertEntitiesToDtos(List<SccGroup> groups) {
    return groups.stream().map(this::convertEntityToDto).collect(Collectors.toList());
  }
}
