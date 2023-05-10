package example.domain.comment.controller;

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
import example.global.response.SingleResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/comments")
@AllArgsConstructor
public class CommentController {
    private CommentService commentService;
    private FansRepository fansRepository;
    private FansMapper fansMapper;
    private CommentMapper mapper;
    private feedPostRepository feedPostRepository;
    private CommentRepository commentRepository;


    // 댓글 작성
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto requestBody){
        Fans fans = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        FeedPost findFeedPost = feedPostRepository.findById(requestBody.getFeedPostId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        Comment feedPost = commentService.createComment(
                mapper.commentPostDtoToComment(requestBody, fans, findFeedPost));

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(feedPost), HttpStatus.CREATED);
    }


    // 댓글 리스트 조회(무한 스크롤) > 수정 필요러
    @GetMapping("/{group_id}") // 무한 스크롤
    public ResponseEntity<List<Comment>> getItems(@RequestParam(value = "lastId", required = false) Integer lastId) {
        int pageSize = 10; // 한 페이지에 보여줄 데이터의 양
        List<Comment> comments;
        if (lastId == null) {
            comments = commentRepository.findFirst10ByOrderByIdDesc(); // 마지막 10개의 피드 게시물 반환
        } else {
            comments = commentRepository.findByIdLessThanOrderByIdDesc(lastId, PageRequest.of(0, pageSize)); // 마지막 id보다 작은 항목 반환
        }
        return ResponseEntity.ok(comments);
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
