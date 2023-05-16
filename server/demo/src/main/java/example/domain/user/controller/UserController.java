package example.domain.user.controller;

import example.domain.fans.dto.FansPostDto;
import example.domain.fans.entity.Fans;
import example.domain.fans.mapper.FansMapper;
import example.domain.fans.service.FansService;
import example.domain.user.dto.UserPostDto;
import example.domain.user.entity.User;
import example.domain.user.mapper.UserMapper;
import example.domain.user.service.UserService;
import example.global.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping
@Validated
@Slf4j
public class UserController {

    private UserService userService;
    private UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }


    @PostMapping("/email")
    public ResponseEntity postEmail(@Valid @RequestBody UserPostDto userDto) {
        User user = mapper.userPostDtoToUser(userDto);
        userService.checkFans(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
