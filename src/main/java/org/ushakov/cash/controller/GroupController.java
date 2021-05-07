package org.ushakov.cash.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
import org.ushakov.cash.dto.req.GroupReqDto;
import org.ushakov.cash.dto.resp.GroupRespDto;
import org.ushakov.cash.entity.SccGroup;
import org.ushakov.cash.service.GroupService;

import java.util.List;


@RestController
@RequestMapping("/group")
@ComponentScan("org.ushakov")
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController {

    private GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/all")
    @ResponseBody
    public List<GroupRespDto> getAllGroups() {
        return groupService.getAll();
    }

    @PostMapping("/")
    @ResponseBody
    public SccGroup createGroup(@RequestBody GroupReqDto dto) {
        return groupService.createGroup(dto.getName());
    }

    @PostMapping("/child")
    @ResponseBody
    public SccGroup createChildGroup(@RequestBody GroupReqDto dto) {
        return groupService.createChildGroup(dto.getName(), dto.getParentId());
    }

}
