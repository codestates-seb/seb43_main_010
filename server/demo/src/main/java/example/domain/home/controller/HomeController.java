package example.domain.home.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import example.domain.community.entity.Community;
import example.domain.community.repository.CommunityRepository;
import example.domain.fans.dto.FansPostDto;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.group.entity.Group;
import example.domain.group.repository.GroupRepository;
import example.global.config.auth.PrincipalDetails;
import example.global.response.ListResponseDto;
import example.global.response.MultiResponseDto;
import example.global.response.SingleResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@Slf4j
public class HomeController {
    @Autowired
    private final GroupRepository groupRepository;
    @Autowired
    private final FansRepository fansRepository;
    @Autowired
    private final CommunityRepository communityRepository;

    @GetMapping("/home")
    public ResponseEntity<?> getHome() throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            List<Group> groups = groupRepository.findAll();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("group",groups);
            String json = objectMapper.writeValueAsString(responseData);
            return new ResponseEntity<>(json, HttpStatus.OK);
        } else {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            PrincipalDetails principalDetails = (PrincipalDetails) principal;
            if (principalDetails.getUser().getRole().equals("USER")) {
                Fans fans =fansRepository.findByEmail(principalDetails.getUser().getEmail()).get();
                //그룹전체+커뮤니티
                List<String> group = communityRepository.findByFanId(fans.getFanId()).stream()
                        .map(Community::getGroupName)
                        .collect(Collectors.toList());
                List<Group> resultList = new ArrayList<>();
                for (String id : group) {
                    Optional<Group> entityOptional = groupRepository.findByGroupName(id);
                    if (entityOptional.isPresent()) {
                        resultList.add(entityOptional.get());
                    }
                }
                List<Group> groups = groupRepository.findAll();
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.registerModule(new JavaTimeModule());

                Map<String, Object> responseData = new HashMap<>();
                responseData.put("community", resultList);
                responseData.put("group",groups);
                String json = objectMapper.writeValueAsString(responseData);
                return new ResponseEntity<>(json, HttpStatus.OK);
            }
            if (principalDetails.getUser().getRole().equals("ARTIST")) {
                List<Group> groups = groupRepository.findAll();
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.registerModule(new JavaTimeModule());
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("group",groups);
                String json = objectMapper.writeValueAsString(responseData);
                return new ResponseEntity<>(json, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/home/{id}")
    public ResponseEntity postGroupDetails(@PathVariable("id") @Positive @NotNull Integer grpId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            return new ResponseEntity<>(new SingleResponseDto<>("ToLogin"),HttpStatus.OK);
        } else {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            PrincipalDetails principalDetails = (PrincipalDetails) principal;
            if (principalDetails.getUser().getRole().equals("USER")) {
                String name=groupRepository.findById(grpId).get().getGroupName();
                if(communityRepository.existsByGroupName(name)) {
                    return new ResponseEntity<>(new SingleResponseDto<>("To:"+grpId),HttpStatus.OK);
                }else{
                    return new ResponseEntity<>(new SingleResponseDto<>("ToAdd"),HttpStatus.OK);
                }
            }
            if (principalDetails.getUser().getRole().equals("ARTIST")) {
                return new ResponseEntity<>(new SingleResponseDto<>("To:"+grpId),HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/home/check/{id}")
    public ResponseEntity postGroupCheck(@PathVariable("id") @Positive @NotNull Integer grpId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails) principal;
        Fans fans =fansRepository.findByEmail(principalDetails.getUser().getEmail()).get();
        Community community = new Community();
        community.addFans(fans);
        community.setGroupName(groupRepository.findById(grpId).get().getGroupName());
        community.setFanId(fans.getFanId());
        fans.addCommunity(community);
        fansRepository.save(fans);
        communityRepository.save(community);
        return new ResponseEntity<>(new SingleResponseDto<>("To:"+grpId),HttpStatus.OK);
    }

    @PostMapping("/home/community/{id}")
    public ResponseEntity postCommunityDetails(@PathVariable("id") @Positive @NotNull Integer grpId) {
        return new ResponseEntity<>(new SingleResponseDto<>("To:"+grpId),HttpStatus.OK);
    }
}