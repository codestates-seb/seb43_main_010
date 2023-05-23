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
import example.domain.group.entity.Group;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.entity.FeedPost;
import example.global.response.MultiResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import example.domain.artistPost.service.artistPostService;
import example.domain.group.repository.GroupRepository;
import example.domain.feedPost.repository.feedPostRepository;
import example.domain.artistPost.repository.artistPostRepository;
import example.domain.comment.repository.CommentRepository;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

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
    private GroupRepository groupRepository;
    private feedPostRepository feedPostRepository;
    private artistPostRepository artistPostRepository;
    private CommentRepository commentRepository;


    //feedPost 댓글 작성
    @PostMapping("feed/{groupId}/{feedPostId}/comment")
    public ResponseEntity<?> feedPostComment(@PathVariable("groupId") @Positive int groupId,
                                             @PathVariable("feedPostId") int feedPostId,
                                             @Valid @RequestBody CommentPostDto requestBody) {
        // 그룹 조회
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        // 게시글 조회
        FeedPost feedPost = feedPostRepository.findById(feedPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));

        // 댓글 등록 사용자 확인
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
    @PostMapping("artist/{groupId}/{artistPostId}/comment")
    public ResponseEntity<?> artistPostComment(@PathVariable("groupId") @Positive int groupId,
                                               @PathVariable("artistPostId") int artistPostId,
                                               @Valid @RequestBody CommentPostDto requestBody) {
        // 그룹 조회
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        // 게시글 조회
        ArtistPost artistPost = artistPostRepository.findById(artistPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));

        // 댓글 등록 사용자 확인
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


    // feedPost 댓글 리스트 조회(무한 스크롤)
    @GetMapping("feed/{groupId}/{feedPostId}/comment")
    public ResponseEntity getAllFeedComment(@PathVariable("groupId") @Positive int groupId,
                                            @PathVariable("feedPostId") int feedPostId,
                                            @RequestParam(defaultValue = "1") @Positive int page,
                                            @RequestParam(defaultValue = "16") @Positive int size) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        FeedPost feedPost = feedPostRepository.findById(feedPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));

        if (feedPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
        }

        Page<Comment> feedComments = commentService.findAllCommentsByFeedPostId(feedPostId, page - 1, size);
        List<Comment> list = feedComments.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), feedComments), HttpStatus.OK);
    }


    // feedPost 댓글 상세 조회
    @GetMapping("feed/{groupId}/{feedPostId}/comment/{commentId}")
    public ResponseEntity<?> getFeedComment(@PathVariable("groupId") @Positive int groupId,
                                            @PathVariable("feedPostId") int feedPostId,
                                            @PathVariable("commentId") int commentId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        FeedPost feedPost = feedPostRepository.findById(feedPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));

        if (feedPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
        }

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));


//        if (comment.getGroup().getId() == groupId && comment.getFeedPost().getId() == feedPostId) {
//            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
//        }
        return new ResponseEntity<>(mapper.commentToUserCommentResponseDto(comment), HttpStatus.OK);
    }







    // artistPost 댓글 리스트 조회(무한 스크롤)
    @GetMapping("artist/{groupId}/{artistPostId}/comment")
    public ResponseEntity getAllArtistsComment(@PathVariable("groupId") @Positive int groupId,
                                            @PathVariable("artistPostId") int artistPostId,
                                            @RequestParam(defaultValue = "1") @Positive int page,
                                            @RequestParam(defaultValue = "16") @Positive int size) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        ArtistPost artistPost = artistPostRepository.findById(artistPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND));

        if (artistPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND);
        }

        Page<Comment> artistComments = commentService.findAllCommentsByArtistPostId(artistPostId, page - 1, size);
        List<Comment> list = artistComments.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), artistComments), HttpStatus.OK);
    }


    // artistPost 댓글 상세 조회
    @GetMapping("artist/{groupId}/{artistPostId}/comment/{commentId}")
    public ResponseEntity<?> getArtistComment(@PathVariable("groupId") @Positive int groupId,
                                            @PathVariable("artistPostId") int artistPostId,
                                            @PathVariable("commentId") int commentId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        ArtistPost artistPost = artistPostRepository.findById(artistPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND));

        if (artistPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
        }

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));


//        if (comment.getGroup().getId() == groupId && comment.getFeedPost().getId() == feedPostId) {
//            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
//        }
        return new ResponseEntity<>(mapper.commentToUserCommentResponseDto(comment), HttpStatus.OK);
    }


    // feedPost 에서 댓글 수정
    @PatchMapping("feed/{groupId}/{feedPostId}/comment/{commentId}")
    public ResponseEntity<?> patchFeedPostComment(@PathVariable("groupId") @Positive int groupId,
                                                  @PathVariable("feedPostId") @Positive @NotNull int feedPostId,
                                                  @PathVariable("commentId") @Positive @NotNull int commentId,
                                                  @Valid @RequestBody CommentPatchDto requestBody) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        FeedPost feedPost = feedPostRepository.findById(feedPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));

        if (feedPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
        }

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



    // artistPost 에서 댓글 수정
    @PatchMapping("artist/{groupId}/{artistPostId}/comment/{commentId}")
    public ResponseEntity<?> patchArtistPostComment(@PathVariable("groupId") @Positive int groupId,
                                                  @PathVariable("artistPostId") @Positive @NotNull int artistPostId,
                                                  @PathVariable("commentId") @Positive @NotNull int commentId,
                                                  @Valid @RequestBody CommentPatchDto requestBody) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        ArtistPost artistPost = artistPostRepository.findById(artistPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND));

        if (artistPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND);
        }

        if (fansRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Fans findFan = fansRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
            // 해당하는 feedPost 정보 조회
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment comment = mapper.commentPatchDtoToComment(findFan, findArtistPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);

            return new ResponseEntity<>(mapper.commentToCommentFanResponseDto(updateComment), HttpStatus.OK);

        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
            // 해당하는 feedPost 정보 조회
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment comment = mapper.commentPatchDtoToComment(findArtist, findArtistPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);

            return new ResponseEntity<>(mapper.commentToCommentArtistResponseDto(updateComment), HttpStatus.OK);

        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }


    // feedPost 댓글 삭제
    @DeleteMapping("feed/{groupId}/{feedPostId}/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("groupId") @Positive int groupId,
                                           @PathVariable("feedPostId") @Positive @NotNull int feedPostId,
                                           @PathVariable("commentId") @Positive int commentId,
                                           @Valid @RequestBody CommentDeleteDto requestBody) {
        FeedPost feedPost = feedPostRepository.findById(feedPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));

        if (feedPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
        }

        Comment findComment = commentService.findVerifiedComment(commentId);

        Optional<Fans> optionalFan = fansRepository.findByEmail(requestBody.getEmail());
        if (optionalFan.isPresent()) {
            Fans fan = optionalFan.get();

            if (findComment.getFan() == null || !findComment.getFan().equals(fan)) {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }

            commentService.deletePostComment(findComment);
            return ResponseEntity.ok("feedPost 댓글 삭제 성공");
        }

        Optional<Artist> optionalArtist = artistRepository.findByEmail(requestBody.getEmail());
        if (optionalArtist.isPresent()) {
            Artist artist = optionalArtist.get();

            if (findComment.getArtist() == null || !findComment.getArtist().equals(artist)) {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }

            commentService.deletePostComment(findComment);
            return ResponseEntity.ok("feedPost 댓글 삭제 성공");
        }

        throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
    }




// artistPost 에서 댓글 삭제
    @DeleteMapping("artist/{groupId}/{artistPostId}/comment/{commentId}")
    public ResponseEntity<?> deleteArtistComment(@PathVariable("groupId") @Positive int groupId,
                                                 @PathVariable("artistPostId") @Positive @NotNull int artistPostId,
                                                 @PathVariable("commentId") @Positive int commentId,
                                                 @Valid @RequestBody CommentDeleteDto requestBody) {
        ArtistPost artistPost = artistPostRepository.findById(artistPostId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND));

        if (artistPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND);
        }

        Comment findComment = commentService.findVerifiedComment(commentId);

        Optional<Fans> optionalFan = fansRepository.findByEmail(requestBody.getEmail());
        if (optionalFan.isPresent()) {
            Fans fan = optionalFan.get();

            if (findComment.getFan() == null || !findComment.getFan().equals(fan)) {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }

            commentService.deletePostComment(findComment);
            return ResponseEntity.ok("feedPost 댓글 삭제 성공");
        }

        Optional<Artist> optionalArtist = artistRepository.findByEmail(requestBody.getEmail());
        if (optionalArtist.isPresent()) {
            Artist artist = optionalArtist.get();

            if (findComment.getArtist() == null || !findComment.getArtist().equals(artist)) {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }

            commentService.deletePostComment(findComment);
            return ResponseEntity.ok("feedPost 댓글 삭제 성공");
        }

        throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
    }

}
