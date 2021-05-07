package org.ushakov.cash.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
import org.ushakov.cash.dto.resp.GroupRespDto;
import org.ushakov.cash.service.GroupService;
import org.ushakov.cash.service.PaymentService;

import java.util.List;

@RestController
@RequestMapping("/main")
@ComponentScan("org.ushakov")
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    private GroupService groupService;
    private PaymentService paymentService;

    @Autowired
    public MainController(GroupService groupService, PaymentService paymentService) {
        this.groupService = groupService;
        this.paymentService = paymentService;
    }

    @GetMapping("/")
    @ResponseBody
    public List<GroupRespDto> getAllGroups() {
        List<GroupRespDto> groups = groupService.getAll();
        fillGroupsWithPayments(groups);
        return groups;
    }

    private void fillGroupsWithPayments(List<GroupRespDto> groups) {
        groups.stream().forEach(group -> {
            group.setPayments(paymentService.getByGroup(group.getId()));
            if (group.getChildren() != null && !group.getChildren().isEmpty()) {
                fillGroupsWithPayments(group.getChildren());
            }
        });
    }
}
