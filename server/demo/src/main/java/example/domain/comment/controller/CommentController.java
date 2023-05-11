package example.domain.comment.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.dto.CommentPatchDto;
import example.domain.comment.dto.CommentPostDto;
import example.domain.comment.entity.Comment;
import example.domain.comment.mapper.CommentMapper;
import example.domain.comment.repository.CommentRepository;
import example.domain.comment.service.CommentService;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.fans.entity.Fans;
import example.domain.fans.mapper.FansMapper;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.entity.FeedPost;
import example.global.response.MultiResponseDto;
import example.global.response.SingleResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import example.domain.artistPost.repository.artistPostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import example.domain.feedPost.repository.feedPostRepository;

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
    private FansRepository fansRepository;
    private FansMapper fansMapper;
    private CommentMapper mapper;
    private feedPostRepository feedPostRepository;
    private artistPostRepository artistPostRepository;
    private ArtistRepository artistRepository;
    private CommentRepository commentRepository;


    // feedPost 댓글 작성
    @PostMapping("fans/comments")
    public ResponseEntity feedPostComment(@Valid @RequestBody CommentPostDto requestBody){
        Fans fans = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        FeedPost findFeedPost = feedPostRepository.findById(requestBody.getFeedPostId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));
        Comment comment = commentService.createComment(
                mapper.commentPostDtoToComment(requestBody, fans, findFeedPost));

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
    }


    // artistPost 댓글 작성
    @PostMapping("artist/comments")
    public ResponseEntity artistPostComment(@Valid @RequestBody CommentPostDto requestBody){
        Fans fans = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        ArtistPost findArtistPost = artistPostRepository.findById(requestBody.getArtistPostId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND));
        Comment comment = commentService.createComment(
                mapper.commentPostDtoToComment(requestBody, fans, findArtistPost));

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
    }


    // feedPost 댓글 리스트 조회(무한 스크롤)
    @GetMapping("fans/{feedPost-id}/comments")
    public ResponseEntity getAllFansComment(@RequestParam(defaultValue = "1") @Positive int page,
                                            @RequestParam(defaultValue = "16") @Positive int size) {
        Page<Comment> fansComments = commentService.findAllCommentsByFeedPostId(page -1, size);
        List<Comment> list = fansComments.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToCommentResponseDtos(list), fansComments), HttpStatus.OK);
    }


    // artistPost 댓글 리스트 조회(무한 스크롤)
    @GetMapping("artist/{artistPost-id}/comments") // artistPost 댓글
    public ResponseEntity getAllArtistComment(@RequestParam(defaultValue = "1") @Positive int page,
                                            @RequestParam(defaultValue = "16") @Positive int size) {
        Page<Comment> artistComments = commentService.findAllCommentsByArtistPostId(page -1, size);
        List<Comment> list = artistComments.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToCommentResponseDtos(list), artistComments), HttpStatus.OK);
    }



    /**
     댓글 수정
     자기가 작성한 답만 수정,삭제 가능
     자기 답 아닌데 접근 ->  예외 발생
     **/

    @PatchMapping("comment_id")
    public ResponseEntity patchComment(@PathVariable("comment_id") @Positive @NotNull int commentId,
                                       @Valid @RequestBody CommentPatchDto requestBody){
        requestBody.setCommentId(commentId);
        Fans fans = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        Comment findComment = commentRepository.findById(requestBody.getCommentId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        Comment comment = mapper.commentPatchDtoToComment(requestBody, fans, findComment.getFeedPost());
        Comment updateComment = commentService.updateComment(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentResponseDto(updateComment)), HttpStatus.OK);
    }

    // 댓글 삭제
    @DeleteMapping("/{comment_id}")
    public ResponseEntity deleteComment(@PathVariable("comment_id") @Positive int commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
