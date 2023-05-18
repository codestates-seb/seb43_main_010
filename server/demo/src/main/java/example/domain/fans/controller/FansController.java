package example.domain.fans.controller;
import example.domain.fans.dto.FansPostDto;
import example.domain.fans.entity.Fans;
import example.domain.fans.service.FansService;
import example.global.response.SingleResponseDto;
import example.domain.fans.mapper.FansMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping
@Validated
@Slf4j
public class FansController {

    private FansService fansService;
    private FansMapper mapper;

    public FansController(FansService fansService, FansMapper mapper) {
        this.fansService = fansService;
        this.mapper = mapper;
    }

    @PostMapping("/signup/fans")
    public ResponseEntity postFans(@Valid @RequestBody FansPostDto fansDto) {
        Fans fans = mapper.fansPostDtoToFans(fansDto);
        Fans createdFans = fansService.createFans(fans);
        return new ResponseEntity<>(new SingleResponseDto<>("일반유저 회원가입 성공!"), HttpStatus.CREATED);
    }


}
