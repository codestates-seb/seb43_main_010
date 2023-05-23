package example.domain.userDetails.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import example.domain.artist.entity.Artist;
import example.domain.artist.mapper.ArtistMapper;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artist.service.ArtistService;
import example.domain.community.entity.Community;
import example.domain.community.repository.CommunityRepository;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.group.entity.Group;
import example.domain.group.repository.GroupRepository;
import example.domain.userDetails.dto.UserDetailsPostDto;
import example.global.config.auth.PrincipalDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping
@Validated
public class UserDetailsController {
    private static final Logger log = LoggerFactory.getLogger(UserDetailsController.class);
    @Autowired
    private final GroupRepository groupRepository;
    @Autowired
    private final ArtistRepository artistRepository;
    @Autowired
    private final FansRepository fansRepository;
    @Autowired
    private final CommunityRepository communityRepository;
    private ArtistService artistService;
    private ArtistMapper mapper;

    @GetMapping({"/userdata"})
    public ResponseEntity<?> postUserData() throws JsonProcessingException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails)principal;
        if (principalDetails.getUser().getRole().equals("USER")) {
            Fans fans = (Fans)this.fansRepository.findByEmail(principalDetails.getUser().getEmail()).get();
            List<String> group = (List)this.communityRepository.findByFanId(fans.getFanId()).stream().map(Community::getGroupName).collect(Collectors.toList());
            List<Group> resultList = new ArrayList();
            Iterator var12 = group.iterator();

            while(var12.hasNext()) {
                String id = (String)var12.next();
                Optional<Group> entityOptional = this.groupRepository.findByGroupName(id);
                if (entityOptional.isPresent()) {
                    resultList.add((Group)entityOptional.get());
                }
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Map<String, Object> responseData = new HashMap();
            responseData.put("community", resultList);
            responseData.put("userdata", fans);
            String json = objectMapper.writeValueAsString(responseData);
            return new ResponseEntity(json, HttpStatus.OK);
        } else if (principalDetails.getUser().getRole().equals("ARTIST")) {
            Artist artist = (Artist)this.artistRepository.findByEmail(principalDetails.getUser().getEmail()).get();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Map<String, Object> responseData = new HashMap();
            responseData.put("userdata", artist);
            String json = objectMapper.writeValueAsString(responseData);
            return new ResponseEntity(json, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping({"/userdata/patch"})
    public void patchUserData(@RequestBody @Valid UserDetailsPostDto userDetailsPostDto) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails)principal;
        if (principalDetails.getUser().getRole().equals("USER")) {
            Fans fans = (Fans)this.fansRepository.findByEmail(principalDetails.getUser().getEmail()).get();
            fans.setNickname(userDetailsPostDto.getNickname());
            fans.setProfile(userDetailsPostDto.getProfile());
            this.fansRepository.save(fans);
        }

        if (principalDetails.getUser().getRole().equals("ARTIST")) {
            Artist artist = (Artist)this.artistRepository.findByEmail(principalDetails.getUser().getEmail()).get();
            artist.setNickname(userDetailsPostDto.getNickname());
            artist.setProfile(userDetailsPostDto.getProfile());
            this.artistRepository.save(artist);
        }

    }

    @DeleteMapping({"/userdata/{id}"})
    public void DeleteCommunity(@PathVariable("id") @Positive @NotNull Integer grpId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails)principal;
        String name = ((Group)this.groupRepository.findById(grpId).get()).getGroupName();
        List<Community> itemsToDelete = (List)this.communityRepository.findAll().stream().filter((item) -> {
            return item.getGroupName().equals(name) && item.getFanId().equals(((Fans)this.fansRepository.findByEmail(principalDetails.getUser().getEmail()).get()).getFanId());
        }).collect(Collectors.toList());
        this.communityRepository.deleteAll(itemsToDelete);
    }

    public UserDetailsController(final GroupRepository groupRepository, final ArtistRepository artistRepository, final FansRepository fansRepository, final CommunityRepository communityRepository, final ArtistService artistService, final ArtistMapper mapper) {
        this.groupRepository = groupRepository;
        this.artistRepository = artistRepository;
        this.fansRepository = fansRepository;
        this.communityRepository = communityRepository;
        this.artistService = artistService;
        this.mapper = mapper;
    }
}