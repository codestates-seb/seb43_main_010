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
    public ResponseEntity<String> likeFeedPost(@PathVariable("groupId") Integer groupId,
                                    @PathVariable("feedPostId") Integer feedPostId,
                                    @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {

            likeRequestDto.setFeedPostId(feedPostId);
            likeService.insertFeedFanLike(groupId, likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {

            likeRequestDto.setFeedPostId(feedPostId);
            likeService.insertFeedArtistLike(groupId, likeRequestDto);
        } else {

            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }


        return ResponseEntity.ok().body("feedPost 좋아요 성공");
    }




    // artistPost 좋아요 기능 (fan, artist 둘다 가능)
    @PostMapping("artist/{groupId}/{artistPostId}/like")
    public ResponseEntity<String> likeArtistPost(@PathVariable("groupId") Integer groupId,
                                            @PathVariable("artistPostId") Integer artistPostId,
                                            @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {

            likeRequestDto.setArtistPostId(artistPostId);
            likeService.insertArtistFanLike(groupId,likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {

            likeRequestDto.setArtistPostId(artistPostId);
            likeService.insertArtistArtistLike(groupId, likeRequestDto);
        } else {

            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        return ResponseEntity.ok().body("artistPost 좋아요 성공");
    }




    // feedPost 좋아요 취소 기능
    @DeleteMapping("feed/{groupId}/{feedPostId}/cancelLike")
    public ResponseEntity<String> likeFeedDelete(@PathVariable("groupId") Integer groupId,
                                    @PathVariable("feedPostId") Integer feedPostId,
                                    @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {

            likeRequestDto.setFeedPostId(feedPostId);
            likeService.deleteFeedFanLike(groupId, likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {

            likeRequestDto.setFeedPostId(feedPostId);
            likeService.deleteFeedArtistLike(groupId, likeRequestDto);
        } else {

            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        return ResponseEntity.ok().body("feedPost 좋아요 취소");
    }




    // artistPost 좋아요 취소 기능
    @DeleteMapping("artist/{groupId}/{artistPostId}/cancelLike")
    public ResponseEntity<String> likeArtistDelete(@PathVariable("groupId") Integer groupId,
                                              @PathVariable("artistPostId") Integer artistPostId,
                                              @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {

            likeRequestDto.setArtistPostId(artistPostId);
            likeService.deleteArtistFanLike(groupId, likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {

            likeRequestDto.setArtistPostId(artistPostId);
            likeService.deleteArtistArtistLike(groupId, likeRequestDto);
        } else {

            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }


        return ResponseEntity.ok().body("artistPost 좋아요 취소");
    }






    // feedPost 에서 Comment 좋아요 기능 (fan, artist 둘다 가능)
    @PostMapping("feed/{groupId}/{feedPostId}/comment/{commentId}/like")
    public ResponseEntity<String> likeFeedComment(@PathVariable("groupId") Integer groupId,
                                                  @PathVariable("feedPostId") Integer feedPostId,
                                                  @PathVariable("commentId") Integer commentId,
                                                  @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {
            // fanLikeRequestDto 처리
            // fanLikeRequestDto에 feedPostId와 commentId 설정
            likeRequestDto.setFeedPostId(feedPostId);
            likeRequestDto.setCommentId(commentId);
            likeRequestDto.setGroupId(groupId);
            likeService.insertFeedCommentFanLike(likeRequestDto); // 댓글에 팬 좋아요 추가
        }

        if (likeRequestDto.getArtistId() != null) {
            // artistLikeRequestDto 처리
            // artistLikeRequestDto에 feedPostId와 commentId 설정
            likeRequestDto.setFeedPostId(feedPostId);
            likeRequestDto.setCommentId(commentId);
            likeRequestDto.setGroupId(groupId);
            likeService.insertFeedCommentArtistLike(likeRequestDto); // 댓글에 아티스트 좋아요 추가
        }

        // fanId나 artistId가 둘 다 null인 경우에 대한 처리
        if (likeRequestDto.getFanId() == null && likeRequestDto.getArtistId() == null) {
            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        return ResponseEntity.ok().body("feed comment 좋아요 성공");
    }







    // artistPost 에서 Comment 좋아요 기능 (fan, artist 둘다 가능)
    @PostMapping("artist/{groupId}/{artistPostId}/comment/{commentId}/like")
    public ResponseEntity<String> likeArtistComment(@PathVariable("groupId") Integer groupId,
                                                  @PathVariable("artistPostId") Integer artistPostId,
                                                  @PathVariable("commentId") Integer commentId,
                                                  @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        if (likeRequestDto.getFanId() != null) {
            // fanLikeRequestDto 처리
            // fanLikeRequestDto에 feedPostId와 commentId 설정
            likeRequestDto.setArtistPostId(artistPostId);
            likeRequestDto.setCommentId(commentId);
            likeRequestDto.setGroupId(groupId);
            likeService.insertArtistCommentFanLike(likeRequestDto); // 댓글에 팬 좋아요 추가
        }

        if (likeRequestDto.getArtistId() != null) {
            // artistLikeRequestDto 처리
            // artistLikeRequestDto에 feedPostId와 commentId 설정
            likeRequestDto.setArtistPostId(artistPostId);
            likeRequestDto.setCommentId(commentId);
            likeRequestDto.setGroupId(groupId);
            likeService.insertArtistCommentArtistLike(likeRequestDto); // 댓글에 아티스트 좋아요 추가
        }

        // fanId나 artistId가 둘 다 null인 경우에 대한 처리
        if (likeRequestDto.getFanId() == null && likeRequestDto.getArtistId() == null) {
            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        return ResponseEntity.ok().body("artist comment 좋아요 성공");
    }





    // feedPost 에서 Comment 좋아요 취소 (fan, artist 둘다 가능)
    @DeleteMapping("feed/{groupId}/{feedPostId}/comment/{commentId}/cancelLike")
    public ResponseEntity<String> likeFeedCommentDelete(@PathVariable("groupId") Integer groupId,
                                                        @PathVariable("feedPostId") Integer feedPostId,
                                                        @PathVariable("commentId") Integer commentId,
                                                        @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        // fanLikeRequestDto나 artistLikeRequestDto에서 groupId 설정
        likeRequestDto.setGroupId(groupId);
        likeRequestDto.setFeedPostId(feedPostId);
        likeRequestDto.setCommentId(commentId);

        if (likeRequestDto.getFanId() != null) {
            likeService.deleteFeedCommentFanLike(likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {
            likeService.deleteFeedCommentArtistLike(likeRequestDto);
        } else {
            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        return ResponseEntity.ok().body("feedPost comment 좋아요 취소");
    }




    // artistPost 에서 Comment 좋아요 취소 (fan, artist 둘다 가능)
    @DeleteMapping("artist/{groupId}/{artistPostId}/comment/{commentId}/cancelLike")
    public ResponseEntity<String> likeArtistCommentDelete(@PathVariable("groupId") Integer groupId,
                                                          @PathVariable("artistPostId") Integer artistPostId,
                                                          @PathVariable("commentId") Integer commentId,
                                                          @RequestBody @Valid LikeRequestDto likeRequestDto) throws Exception {
        likeRequestDto.setGroupId(groupId);
        likeRequestDto.setArtistId(artistPostId);
        likeRequestDto.setCommentId(commentId);

        if (likeRequestDto.getFanId() != null) {
            likeService.deleteArtistCommentFanLike(likeRequestDto);
        } else if (likeRequestDto.getArtistId() != null) {
            likeService.deleteArtistCommentArtistLike(likeRequestDto);
        } else {
            throw new IllegalArgumentException("Invalid request. Either fanId or artistId should be provided.");
        }

        return ResponseEntity.ok().body("artistPost comment 좋아요 취소");
    }
}
