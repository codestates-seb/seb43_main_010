package example.domain.like.controller;

import example.domain.like.dto.ArtistLikeRequestDto;
import example.domain.like.dto.FanLikeRequestDto;
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


    // feedPost 좋아요 기능
    @PostMapping("/{feedPostId}")
    public ResponseResult<?> insert(@RequestBody @Valid FanLikeRequestDto fanLikeRequestDto)throws Exception{
        likeService.insert(fanLikeRequestDto);
        return success(null);
    }

    // artistPost 좋아요 기능
    @PostMapping("/artistPost")
    public ResponseResult<?> insert(@RequestBody @Valid ArtistLikeRequestDto artistLikeRequestDto)throws Exception{
        likeService.insert(artistLikeRequestDto);
        return success(null);
    }



    // feedPost 좋아요 취소 기능
    @DeleteMapping("/feedPost")
    public ResponseResult<?> delete(@RequestBody @Valid FanLikeRequestDto fanLikeRequestDto){
        likeService.delete(fanLikeRequestDto);
        return success(null);
    }

    // artistPost 좋아요 취소 기능
    @DeleteMapping("/artistPost")
    public ResponseResult<?> delete(@RequestBody @Valid ArtistLikeRequestDto artistLikeRequestDto){
        likeService.delete(artistLikeRequestDto);
        return success(null);
    }

}
