package example.domain.user.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.mapper.ArtistMapper;
import example.domain.artist.repository.ArtistRepository;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.group.entity.Group;
import example.domain.group.repository.GroupRepository;
import example.domain.user.dto.UserPostDto;
import example.global.config.auth.PrincipalDetails;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.global.response.SingleResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import example.domain.fans.mapper.FansMapper;

@RestController
@AllArgsConstructor
@Slf4j
public class UserController {
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;
    private final GroupRepository groupRepository;
    private final FansMapper fansMapper;
    private final ArtistMapper artistMapper;

    @PostMapping("/emails")
    public ResponseEntity postEmail(@Valid @RequestBody UserPostDto userDto) {
        if(fansRepository.existsByEmail(userDto.getEmail())){
            throw new BusinessLogicException(ExceptionCode.FANS_EXISTS);
        }
        if(artistRepository.existsByEmail(userDto.getEmail())){
            throw new BusinessLogicException(ExceptionCode.ARTIST_EXISTS);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity getUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails) principal;
        System.out.println(principalDetails.getUser().getRole());
        System.out.println(principalDetails.getUser().getRole().equals("USER"));
        if (principalDetails.getUser().getRole().equals("USER")) {
            Fans fans = fansRepository.findByEmail(principalDetails.getUser().getEmail()).get();
            return new ResponseEntity<>(new SingleResponseDto<>(fansMapper.fansToFansResponseDto(fans)),HttpStatus.OK);
        }
        if (principalDetails.getUser().getRole().equals("ARTIST")) {
            Artist artist = artistRepository.findByEmail(principalDetails.getUser().getEmail()).get();
            Group group_info = groupRepository.findByGroupName(artist.getGroup()).get();
            return new ResponseEntity<>(new SingleResponseDto<>(artistMapper.artistToArtistResponseDto(artist,group_info.getId(),group_info.getProfile(),group_info.getColor())),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
