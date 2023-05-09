package example.domain.like.controller;

import example.domain.like.dto.LikeRequestDto;
import example.domain.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import example.global.common.global.HttpResponseEntity.ResponseError.ResponseResult;

import javax.validation.Valid;

import static example.global.common.global.HttpResponseEntity.success;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeController {
    private final LikeService likeService;


    // 좋아요 기능
    @PostMapping
    public ResponseResult<?> insert(@RequestBody @Valid LikeRequestDto likeRequestDto)throws Exception{
        likeService.insert(likeRequestDto);
        return success(null);
    }

    // 좋아요 취소 기능
    @DeleteMapping
    public ResponseResult<?> delete(@RequestBody @Valid LikeRequestDto likeRequestDto){
        likeService.delete(likeRequestDto);
        return success(null);
    }
}
