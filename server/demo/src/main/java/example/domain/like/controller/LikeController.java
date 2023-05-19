package example.domain.like.controller;

import example.domain.like.dto.LikeRequestDto;
import example.domain.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import example.global.common.global.HttpResponseEntity.ResponseError.ResponseResult;

import javax.validation.Valid;

import static example.global.common.global.HttpResponseEntity.success;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class LikeController {
    private final LikeService likeService;


    // feedPost 좋아요 기능 (fan, artist 둘다 가능)
    @PostMapping("feed/{groupId}/{feedPostId}/like")
    public ResponseEntity<String> likeFanPost(@PathVariable("groupId") Integer groupId,
                                    @PathVariable("feedPostId") Integer feedPostId,
                                    @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {
            // fanLikeRequestDto 처리
            // fanLikeRequestDto에 feedPostId 설정
            likeRequestDto.setFeedPostId(feedPostId);
            likeService.insertFeedFanLike(groupId, likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {
            // artistLikeRequestDto 처리
            // artistLikeRequestDto에 artistPostId 설정
            likeRequestDto.setFeedPostId(feedPostId);
            likeService.insertFeedArtistLike(groupId, likeRequestDto);
        } else {
            // fanId나 artistId가 둘 다 null인 경우에 대한 처리
            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        // 성공 응답 반환
//        return success(null);
        return ResponseEntity.ok().body("좋아요 성공");
    }



    // artistPost 좋아요 기능 (fan, artist 둘다 가능)
    @PostMapping("artist/{groupId}/{artistPostId}/like")
    public ResponseEntity<String> likeArtistPost(@PathVariable("groupId") Integer groupId,
                                            @PathVariable("artistPostId") Integer artistPostId,
                                            @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {
            // fanLikeRequestDto 처리
            // fanLikeRequestDto에 artistPostId 설정
            likeRequestDto.setArtistPostId(artistPostId);
            likeService.insertArtistFanLike(groupId,likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {
            // artistLikeRequestDto 처리
            // artistLikeRequestDto에 artistPostId 설정
            likeRequestDto.setArtistPostId(artistPostId);
            likeService.insertArtistArtistLike(groupId, likeRequestDto);
        } else {
            // fanId나 artistId가 둘 다 null인 경우에 대한 처리
            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        // 성공 응답 반환
//        return success(null);
        return ResponseEntity.ok().body("좋아요 성공");
    }


    // feedPost 좋아요 취소 기능
    @DeleteMapping("feed/{groupId}/{feedPostId}/cancelLike")
    public ResponseEntity<String> likeFanDelete(@PathVariable("groupId") Integer groupId,
                                    @PathVariable("feedPostId") Integer feedPostId,
                                    @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {
            // fanLikeRequestDto 처리
            // fanLikeRequestDto에 feedPostId 설정
            likeRequestDto.setFeedPostId(feedPostId);
            likeService.deleteFeedFanLike(groupId, likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {
            // artistLikeRequestDto 처리
            // artistLikeRequestDto에 artistPostId 설정
            likeRequestDto.setFeedPostId(feedPostId);
            likeService.deleteFeedArtistLike(groupId, likeRequestDto);
        } else {
            // fanId나 artistId가 둘 다 null인 경우에 대한 처리
            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        // 성공 응답 반환
//        return success(null);
        return ResponseEntity.ok().body("좋아요 취소");
    }


    // artistPost 좋아요 취소 기능
    @DeleteMapping("artist/{groupId}/{artistPostId}/cancelLike")
    public ResponseEntity<String> likeArtistDelete(@PathVariable("groupId") Integer groupId,
                                              @PathVariable("artistPostId") Integer artistPostId,
                                              @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {
            // fanLikeRequestDto 처리
            // fanLikeRequestDto에 feedPostId 설정
            likeRequestDto.setArtistPostId(artistPostId);
            likeService.deleteArtistFanLike(groupId, likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {
            // artistLikeRequestDto 처리
            // artistLikeRequestDto에 artistPostId 설정
            likeRequestDto.setArtistPostId(artistPostId);
            likeService.deleteArtistArtistLike(groupId, likeRequestDto);
        } else {
            // fanId나 artistId가 둘 다 null인 경우에 대한 처리
            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        // 성공 응답 반환
//        return success(null);
        return ResponseEntity.ok().body("좋아요 취소");
    }


//
//    // artistPost 좋아요 취소 기능
//    @DeleteMapping("/artistPost")
//    public ResponseResult<?> delete(@RequestBody @Valid ArtistLikeRequestDto artistLikeRequestDto){
//        likeService.delete(artistLikeRequestDto);
//        return success(null);
//    }

}
