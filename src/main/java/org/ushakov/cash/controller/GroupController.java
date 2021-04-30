package org.ushakov.cash.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/hello")
    @ResponseBody
    public String hello() {
        System.out.println("here");
        return "{\"ping\":\"pong\"}";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<SccGroup> getAllGroups() {
        return groupService.getAll();
    }

    @PostMapping("/")
    @ResponseBody
    public SccGroup createGroup(@RequestBody String name) {
        return groupService.createGroup(name);
    }

}
