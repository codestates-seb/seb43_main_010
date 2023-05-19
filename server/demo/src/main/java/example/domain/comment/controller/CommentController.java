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
    private GroupRepository groupRepository;
    private feedPostRepository feedPostRepository;
    private artistPostRepository artistPostRepository;


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




//    @PostMapping("feed/{feedPostId}/comment")
//    public ResponseEntity<?> feedPostComment(@PathVariable("feedPostId") int feedPostId,
//                                             @Valid @RequestBody CommentPostDto requestBody) {
//        if (fansRepository.existsByEmail(requestBody.getEmail())) {
//            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
//            Fans findFan = fansRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
//                    new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
//            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
//            Comment comment = commentService.createComment(
//                    mapper.commentPostDtoToComment(findFeedPost, findFan, requestBody));
//            return new ResponseEntity<>(mapper.commentToCommentFanResponseDto(comment), HttpStatus.CREATED);
//
//        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
//            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
//            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
//                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
//            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
//            Comment comment = commentService.createComment(
//                    mapper.commentPostDtoToComment(findFeedPost, findArtist, requestBody));
//            return new ResponseEntity<>(mapper.commentToCommentArtistResponseDto(comment), HttpStatus.CREATED);
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }


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
                    mapper.commentPostDtoToComment(findFan,findArtistPost,requestBody));
            return new ResponseEntity<>(mapper.commentToCommentFanResponseDto(comment), HttpStatus.CREATED);

        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment comment = commentService.createComment(
                    mapper.commentPostDtoToComment(findArtist,findArtistPost,requestBody));
            return new ResponseEntity<>(mapper.commentToCommentArtistResponseDto(comment), HttpStatus.CREATED);
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }


    // feedPost 댓글 리스트 조회(무한 스크롤)
//    @GetMapping("feed/{feedPostId}/comment")
//    public ResponseEntity getAllFansComment(@PathVariable("feedPostId") int feedPostId,
//                                            @RequestParam(defaultValue = "1") @Min(1) int page,
//                                            @RequestParam(defaultValue = "16") @Min(1) int size) {
//        Page<Comment> feedComments = commentService.findAllCommentsByFeedPostId(feedPostId, page - 1, size);
//
//        if (feedComments == null) {
//            // 적절한 예외 처리 또는 오류 응답을 수행하십시오.
//        }
//
//        List<Comment> list = feedComments.getContent();
//        List<CommentUserResponseDto> commentResponseDtos = mapper.commentsToUserCommentResponseDtos(list);
//
//        return new ResponseEntity<>(new MultiResponseDto<>(commentResponseDtos, feedComments), HttpStatus.OK);
//    }


//    @GetMapping("feed/{feedPostId}/comment")
//    public ResponseEntity getAllFansComment(@PathVariable("feedPostId") int feedPostId,
//                                            @RequestParam(defaultValue = "1") @Positive int page,
//                                            @RequestParam(defaultValue = "16") @Positive int size) {
//        Page<Comment> feedComments = commentService.findAllCommentsByFeedPostId(feedPostId, page - 1, size);
//        List<Comment> list = feedComments.getContent();
//
//        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), feedComments), HttpStatus.OK);
//    }

    @GetMapping("feed/{groupId}/{feedPostId}/comment")
    public ResponseEntity getAllFansComment(@PathVariable("groupId") @Positive int groupId,
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

    // artistPost 댓글 리스트 조회(무한 스크롤)

//    @GetMapping("artist/{artistPostId}/comment") // artistPost 댓글
//    public ResponseEntity<MultiResponseDto<CommentUserResponseDto>> getAllArtistComment(@PathVariable("artistPostId") int artistPostId,
//                                              @RequestParam(defaultValue = "1") @Positive int page,
//                                              @RequestParam(defaultValue = "16") @Positive int size) {
//        Page<Comment> artistComments = commentService.findAllCommentsByArtistPostId(artistPostId, page - 1, size);
////        List<Comment> comments = new ArrayList<>();
//        List<Comment> list = artistComments.getContent();
//
////        if (artistComments != null) {
////            comments = artistComments.getContent();
////        }
//
////        List<CommentResponseDto.User> commentResponseDtos = mapper.commentsToUserCommentResponseDtos(comments);
//
//        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), artistComments), HttpStatus.OK);
//    }



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
//    @GetMapping("artist/{artistPostId}/comment") // artistPost 댓글
//    public ResponseEntity getAllArtistComment(@PathVariable("artistPostId") int artistPostId,
//                                              @RequestParam(defaultValue = "1") @Positive int page,
//                                              @RequestParam(defaultValue = "16") @Positive int size) {
//        Page<Comment> artistComments = commentService.findAllCommentsByArtistPostId(artistPostId, page - 1, size);
//        List<Comment> list = artistComments.getContent();
//
//        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), artistComments), HttpStatus.OK);
//    }


    // feedPost 에서 댓글 수정

//    @PatchMapping("feed/{feedPostId}/comment/{commentId}")
//    public ResponseEntity<?> patchFeedPostComment(@PathVariable("feedPostId") @Positive int feedPostId,
//                                                  @PathVariable("commentId") @Positive int commentId,
//                                                  @Valid @RequestBody CommentPatchDto requestBody) {
//        Fans findFan = commentService.findFansByEmail(requestBody.getEmail());
//        Artist findArtist = commentService.findArtistByEmail(requestBody.getEmail());
//
//        FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
//
//        Comment comment;
//        if (findFan != null) {
//            comment = mapper.commentPatchDtoToComment(findFan, findFeedPost, requestBody);
//            Comment updateComment = commentService.updateComment(commentId, comment);
//            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentFanResponseDto(updateComment)), HttpStatus.OK);
//        } else if (findArtist != null) {
//            comment = mapper.commentPatchDtoToComment(findArtist, findFeedPost, requestBody);
//            Comment updateComment = commentService.updateComment(commentId, comment);
//            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentArtistResponseDto(updateComment)), HttpStatus.OK);
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }

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


    // artistPost 에서 댓글 수정
//    @PatchMapping("artist/{artistPostId}/comment/{commentId}")
//    public ResponseEntity<?> patchArtistPostComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
//                                                    @PathVariable("commentId") @Positive @NotNull int commentId,
//                                                    @Valid @RequestBody CommentPatchDto requestBody) {
//        Fans findFan = commentService.findFansByEmail(requestBody.getEmail());
//        Artist findArtist = commentService.findArtistByEmail(requestBody.getEmail());
//
//        ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
//
//        Comment comment;
//        if (findFan != null) {
//            comment = mapper.commentPatchDtoToComment(findFan, findArtistPost, requestBody);
//            Comment updateComment = commentService.updateComment(commentId, comment);
//            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentFanResponseDto(updateComment)), HttpStatus.OK);
//        } else if (findArtist != null) {
//            comment = mapper.commentPatchDtoToComment(findArtist, findArtistPost, requestBody);
//            Comment updateComment = commentService.updateComment(commentId, comment);
//            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentArtistResponseDto(updateComment)), HttpStatus.OK);
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }
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

    // feedPost 댓글 삭제

//    @DeleteMapping("feed/{feedPostId}/comment/{commentId}")
//    public ResponseEntity<?> deleteFansComment(@PathVariable("feedPostId") @Positive @NotNull int feedPostId,
//                                               @PathVariable("commentId") @Positive int commentId,
//                                               @Valid @RequestBody CommentDeleteDto requestBody) {
//        String userEmail = requestBody.getEmail();
//        Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회
//
//        if (findComment.getFans().getEmail().equals(userEmail) || findComment.getArtist().getEmail().equals(userEmail)) {
//            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId); // feedPostId에 해당하는 feedPost 정보 조회
//            commentService.deleteFeedPostComment(findFeedPost, commentId, userEmail);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } else {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//        }
//    }

    @DeleteMapping("feed/{feedPostId}/comment/{commentId}")
    public ResponseEntity<String> deleteFansComment(@PathVariable("feedPostId") @Positive @NotNull int feedPostId,
                                                    @PathVariable("commentId") @Positive int commentId,
                                                    @Valid @RequestBody CommentDeleteDto requestBody) {
        if (fansRepository.existsByEmail(requestBody.getEmail())) {
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
            Comment findComment = commentService.findVerifiedComment(commentId);

            if (findComment.getFan().getEmail().equals(requestBody.getEmail())) {
                commentService.deleteFeedPostComment(findFeedPost, commentId);
                return ResponseEntity.ok("삭제 성공"); // 삭제 성공 시 응답 본문에 "삭제 성공" 메시지 반환
            } else {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }
        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
            Comment findComment = commentService.findVerifiedComment(commentId);

            if (findComment.getArtist().getEmail().equals(requestBody.getEmail())) {
                commentService.deleteFeedPostComment(findFeedPost, commentId);
                return ResponseEntity.ok("삭제 성공"); // 삭제 성공 시 응답 본문에 "삭제 성공" 메시지 반환
            } else {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }

//    // feedPost의 댓글 삭제 - 메세지 없이 (작동 됨)
//    @DeleteMapping("feed/{feedPostId}/comment/{commentId}")
//    public ResponseEntity<?> deleteFansComment(@PathVariable("feedPostId") @Positive @NotNull int feedPostId,
//                                            @PathVariable("commentId") @Positive int commentId,
//                                            @Valid @RequestBody CommentDeleteDto requestBody) {
//        if (fansRepository.existsByEmail(requestBody.getEmail())) { // 이메일 주소를 가진 팬 정보가 있다면
//            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId); // feedPostId에 해당하는 feedPost 정보 조회
//            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회
//
//            if (findComment.getFans().getEmail().equals(requestBody.getEmail())) { //comment의 팬 이메일 정보와 요청받은 이메일 정보가 같다면
//                commentService.deleteFeedPostComment(findFeedPost, commentId);
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            } else {
//                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//            }
//        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
//            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
//            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회
//
//            if (findComment.getArtist().getEmail().equals(requestBody.getEmail())) { //comment의 팬 이메일 정보와 요청받은 이메일 정보가 같다면
//                commentService.deleteFeedPostComment(findFeedPost, commentId);
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            } else {
//                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//            }
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }

    // artistPost 댓글 삭제

//    @DeleteMapping("artist/{artistPostId}/comment/{commentId}")
//    public ResponseEntity deleteArtistComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
//                                              @PathVariable("commentId") @Positive int commentId,
//                                              @Valid @RequestBody CommentDeleteDto requestBody) {
//        String userEmail = requestBody.getEmail();
//        Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회
//
//        if (findComment.getFans().getEmail().equals(userEmail) || findComment.getArtist().getEmail().equals(userEmail)) {
//            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId); // feedPostId에 해당하는 feedPost 정보 조회
//            commentService.deleteArtistPostComment(findArtistPost, commentId, userEmail);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } else {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//        }
//    }

    @DeleteMapping("artist/{artistPostId}/comments/{commentId}")
    public ResponseEntity deleteArtistComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
                                              @PathVariable("commentId") @Positive int commentId,
                                              @Valid @RequestBody CommentDeleteDto requestBody) {
        if (fansRepository.existsByEmail(requestBody.getEmail())) { // 이메일 주소를 가진 팬 정보가 있다면
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId); // artistPostId에 해당하는 artistPost 정보 조회
            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회

            if (findComment.getFan().getEmail().equals(requestBody.getEmail())) { //comment의 팬 이메일 정보와 요청받은 이메일 정보가 같다면
                commentService.deleteArtistPostComment(findArtistPost, commentId); //
                return ResponseEntity.ok("삭제 성공"); // 삭제 성공 시 응답 본문에 "삭제 성공" 메시지 반환
            } else {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }
        } else if (artistRepository.existsByEmail(requestBody.getEmail())) { //아티스트 DB에 이메일 주소 가진 아티스트 정보가 있다면
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회

            if (findComment.getArtist().getEmail().equals(requestBody.getEmail())) { //comment의 아티스 이메일 정보와 요청받은 이메일 정보가 같다면
                commentService.deleteArtistPostComment(findArtistPost, commentId);
                return ResponseEntity.ok("삭제 성공"); // 삭제 성공 시 응답 본문에 "삭제 성공" 메시지 반환
            } else {
                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
            }
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }





// artistPost의 댓글 삭제 - 메세지 없이 (작동 됨)
//    @DeleteMapping("artist/{artistPostId}/comments/{commentId}")
//    public ResponseEntity deleteArtistComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
//                                              @PathVariable("commentId") @Positive int commentId,
//                                              @Valid @RequestBody CommentDeleteDto requestBody) {
//        if (fansRepository.existsByEmail(requestBody.getEmail())) { // 이메일 주소를 가진 팬 정보가 있다면
//            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId); // artistPostId에 해당하는 artistPost 정보 조회
//            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회
//
//            if (findComment.getFans().getEmail().equals(requestBody.getEmail())) { //comment의 팬 이메일 정보와 요청받은 이메일 정보가 같다면
//                commentService.deleteArtistPostComment(findArtistPost, commentId); //
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            } else {
//                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//            }
//        } else if (artistRepository.existsByEmail(requestBody.getEmail())) { //아티스트 DB에 이메일 주소 가진 아티스트 정보가 있다면
//            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
//            Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회
//
//            if (findComment.getArtist().getEmail().equals(requestBody.getEmail())) { //comment의 아티스 이메일 정보와 요청받은 이메일 정보가 같다면
//                commentService.deleteArtistPostComment(findArtistPost, commentId);
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            } else {
//                throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//            }
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }
}
