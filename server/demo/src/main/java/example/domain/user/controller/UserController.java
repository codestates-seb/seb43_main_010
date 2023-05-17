package example.domain.user.controller;

import example.domain.artist.repository.ArtistRepository;
import example.domain.fans.repository.FansRepository;
import example.domain.user.dto.UserPostDto;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;




@RestController
@AllArgsConstructor
@Slf4j
public class UserController {
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;

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
    /*
    @GetMapping("/user")
    public ResponseEntity getUser(){
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            PrincipalDetails principalDetails = (PrincipalDetails)principal;

        if (principalDetails.getUser().getRole().equals("FANS")){
            Optional <Fans> fans = fansRepository.findByEmail(principalDetails.getUser().getEmail());
            return new ResponseEntity<>(
                    new SingleResponseDto<>(mapper.userToUserResponseDto(user)),
                    HttpStatus.OK);
        }
        if (principalDetails.getUser().getRole().equals("FANS")){
            Optional <Fans> fans = fansRepository.findByEmail(principalDetails.getUser().getEmail());
            return new ResponseEntity<>(
                    new SingleResponseDto<>(mapper.userToUserResponseDto(user)),
                    HttpStatus.OK);
        }*/


}
