package example.domain.comment.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.dto.CommentDeleteDto;
import example.domain.comment.dto.CommentPatchDto;
import example.domain.comment.dto.CommentPostDto;
import example.domain.comment.entity.Comment;
import example.domain.comment.mapper.CommentMapper;
import example.domain.comment.service.CommentService;
import example.domain.feedPost.service.feedPostService;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.entity.FeedPost;
import example.global.response.MultiResponseDto;
import example.global.response.SingleResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import example.domain.artistPost.service.artistPostService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping(value = "/", produces = {MediaType.APPLICATION_JSON_VALUE})
@AllArgsConstructor
public class CommentController {
    private CommentService commentService;
    private feedPostService feedPostService;
    private artistPostService artistPostService;
    private FansRepository fansRepository;
    private CommentMapper mapper;
    private ArtistRepository artistRepository;




    @PostMapping("feed/{feedPostId}/comment")
    public ResponseEntity<?> feedPostComment(@PathVariable("feedPostId") int feedPostId,
                                             @Valid @RequestBody CommentPostDto requestBody) {
        if (fansRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Fans findFan = fansRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
            Comment comment = commentService.createComment(
                    mapper.commentPostDtoToComment(findFeedPost, findFan, requestBody));
            return new ResponseEntity<>(mapper.commentToCommentFanResponseDto(comment), HttpStatus.CREATED);

        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
            Comment comment = commentService.createComment(
                    mapper.commentPostDtoToComment(findFeedPost, findArtist, requestBody));
            return new ResponseEntity<>(mapper.commentToCommentArtistResponseDto(comment), HttpStatus.CREATED);
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }


    // artistPost 댓글 작성
    @PostMapping("artist/{artistPostId}/comment")
    public ResponseEntity<?> artistPostComment(@PathVariable("artistPostId") int artistPostId,
                                               @Valid @RequestBody CommentPostDto requestBody) {
        if (fansRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Fans findFan = fansRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment comment = commentService.createComment(
                    mapper.commentPostDtoToComment(findFan, findArtistPost, requestBody));
            return new ResponseEntity<>(mapper.commentToCommentFanResponseDto(comment), HttpStatus.CREATED);

        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment comment = commentService.createComment(
                    mapper.commentPostDtoToComment(findArtist, findArtistPost, requestBody));
            return new ResponseEntity<>(mapper.commentToCommentArtistResponseDto(comment), HttpStatus.CREATED);
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }




    @GetMapping("feed/{feedPostId}/comment")
    public ResponseEntity getAllFansComment(@PathVariable("feedPostId") int feedPostId,
                                            @RequestParam(defaultValue = "1") @Positive int page,
                                            @RequestParam(defaultValue = "16") @Positive int size) {
        Page<Comment> feedComments = commentService.findAllCommentsByFeedPostId(feedPostId, page - 1, size);
        List<Comment> list = feedComments.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), feedComments), HttpStatus.OK);
    }




    @GetMapping("artist/{artistPostId}/comment") // artistPost 댓글
    public ResponseEntity getAllArtistComment(@PathVariable("artistPostId") int artistPostId,
                                              @RequestParam(defaultValue = "1") @Positive int page,
                                              @RequestParam(defaultValue = "16") @Positive int size) {
        Page<Comment> artistComments = commentService.findAllCommentsByArtistPostId(artistPostId, page - 1, size);
        List<Comment> list = artistComments.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), artistComments), HttpStatus.OK);
    }




    // 방법 2
    @PatchMapping("feed/{feedPostId}/comment/{commentId}")
    public ResponseEntity<?> patchFeedPostComment(@PathVariable("feedPostId") @Positive @NotNull int feedPostId,
                                                  @PathVariable("commentId") @Positive @NotNull int commentId,
                                                  @Valid @RequestBody CommentPatchDto requestBody) {
        if (fansRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Fans findFan = fansRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
            // 해당하는 feedPost 정보 조회
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
            Comment comment = mapper.commentPatchDtoToComment(findFan, findFeedPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);

            return new ResponseEntity<>(mapper.commentToCommentFanResponseDto(updateComment), HttpStatus.OK);

        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
            // 해당하는 feedPost 정보 조회
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
            Comment comment = mapper.commentPatchDtoToComment(findArtist, findFeedPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);

            return new ResponseEntity<>(mapper.commentToCommentArtistResponseDto(updateComment), HttpStatus.OK);

        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }



    //  방법2
    @PatchMapping("artist/{artistPostId}/comment/{commentId}")
    public ResponseEntity<?> patchArtistPostComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
                                                    @PathVariable("commentId") @Positive @NotNull int commentId,
                                                    @Valid @RequestBody CommentPatchDto requestBody) {
        if (fansRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Fans findFan = fansRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
            // 해당하는 artistPost 정보 조회
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment comment = mapper.commentPatchDtoToComment(findFan, findArtistPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);

            return new ResponseEntity<>(mapper.commentToCommentFanResponseDto(updateComment), HttpStatus.OK);

        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
            // 해당하는 artistPost 정보 조회
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment comment = mapper.commentPatchDtoToComment(findArtist, findArtistPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);

            return new ResponseEntity<>(mapper.commentToCommentArtistResponseDto(updateComment), HttpStatus.OK);

        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }




    // 방법 2)
    @DeleteMapping("feed/{feedPostId}/comment/{commentId}")
    public ResponseEntity<?> deleteFansComment(@PathVariable("feedPostId") @Positive @NotNull int feedPostId,
                                               @PathVariable("commentId") @Positive int commentId,
                                               @Valid @RequestBody CommentDeleteDto requestBody) {
        if (fansRepository.existsByEmail(requestBody.getEmail())) { // 이메일 주소를 가진 팬 정보가 있다면
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId); // feedPostId에 해당하는 feedPost 정보 조회
            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회

            if (findComment.getFans().getEmail().equals(requestBody.getEmail()) && findFeedPost.getFans().getEmail().equals(requestBody.getEmail())) { //comment의 팬 이메일 정보와 요청받은 이메일 정보가 같다면
                commentService.deleteFeedPostComment(findFeedPost, commentId);
//                return ResponseEntity.ok("삭제 성공");
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }
        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회

            if (findComment.getArtist().getEmail().equals(requestBody.getEmail()) && findComment.getArtist().getEmail().equals(requestBody.getEmail())) { //comment의 팬 이메일 정보와 요청받은 이메일 정보가 같다면
                commentService.deleteFeedPostComment(findFeedPost, commentId);
//                return ResponseEntity.ok("삭제 성공");
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }




    //    방법 2)
    @DeleteMapping("artist/{artistPostId}/comments/{commentId}")
    public ResponseEntity<?> deleteArtistComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
                                              @PathVariable("commentId") @Positive int commentId,
                                              @Valid @RequestBody CommentDeleteDto requestBody) {
        if (fansRepository.existsByEmail(requestBody.getEmail())) { // 이메일 주소를 가진 팬 정보가 있다면
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId); // artistPostId에 해당하는 artistPost 정보 조회
            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회

            if (findComment.getFans().getEmail().equals(requestBody.getEmail())) { //comment의 팬 이메일 정보와 요청받은 이메일 정보가 같다면
                commentService.deleteArtistPostComment(findArtistPost, commentId);
//                return ResponseEntity.ok("삭제 성공");
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }
        } else if (artistRepository.existsByEmail(requestBody.getEmail())) { //아티스트 DB에 이메일 주소 가진 아티스트 정보가 있다면
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회

            if (findComment.getArtist().getEmail().equals(requestBody.getEmail())) { //comment의 아티스 이메일 정보와 요청받은 이메일 정보가 같다면
                commentService.deleteArtistPostComment(findArtistPost, commentId);
//                return ResponseEntity.ok("삭제 성공");
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }
}