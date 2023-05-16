package example.domain.comment.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.dto.CommentDeleteDto;
import example.domain.comment.dto.CommentPatchDto;
import example.domain.comment.dto.CommentPostDto;
import example.domain.comment.dto.CommentResponseDto;
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
import java.util.ArrayList;
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


////     feedPost 댓글 작성 (pathVariable -> api 주소로 가지고 온다. requestBody -> 요정 받은거 이용)
//    @PostMapping("feed/{feedPostId}/comment")
//    public ResponseEntity<CommentResponseDto> feedPostComment(@PathVariable("feedPostId") int feedPostId,
//                                                              @Valid @RequestBody CommentPostDto requestBody){
//        Fans fans = fansRepository.findById(requestBody.getUserId())
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
//        Artist artist = artistRepository.findById(requestBody.getUserId()) // requestBody
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
//        FeedPost findFeedPost = service.findFeedPost(feedPostId); // pathVariable
//        Comment comment = commentService.createComment(
//                mapper.commentPostDtoToComment(requestBody, fans, artist, findFeedPost));
//
//        return new ResponseEntity<>(mapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
//    }


//    @PostMapping("feed/{feedPostId}/comment")
//    public ResponseEntity<CommentResponseDto> feedPostComment(@PathVariable("feedPostId") int feedPostId,
//                                                              @Valid @RequestBody CommentPostDto requestBody){
//        if (requestBody.getUserType() == CommentPostDto.UserType.FANS) {
//            Fans fans = fansRepository.findById(requestBody.getUserId())
//                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
//            Comment comment = commentService.createComment(
//                    mapper.commentPostDtoToComment(requestBody, fans, null, service.findFeedPost(feedPostId)));
//            return new ResponseEntity<>(mapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
//        } else if (requestBody.getUserType() == CommentPostDto.UserType.ARTIST) {
//            Artist artist = artistRepository.findById(requestBody.getUserId())
//                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
//            Comment comment = commentService.createComment(
//                    mapper.commentPostDtoToComment(requestBody, null, artist, service.findFeedPost(feedPostId)));
//            return new ResponseEntity<>(mapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }
/*
    userId = 1 (로그인 된 Id : 보안)(userId만 받아서 구분해서 보낼 방법 X)
    아티스트, 팬 구분해서 등록 -> post 때문
    방법 : 로그인된 정보에서 이메일을 빼와야 된다.(수진님께 받아와야됨 또는 프론트분께 request로 받아야됨) //(Authentication..?).getprincipal.-> 이메일 뽑아옴
            팬 이메일, 아티스트 이메일 을 뽑아온 이메일과 비교(if 문으로 선택)-> 하나로 선택
            팬 레파지토리, 아티스트 레파지토리 이메일이 존재하는지 검색
            선택된게 팬이면 -> fanresponseDto로 빼옴
            아티스트면 -> artistresponseDto로로 빼옴
            userId 로 통일해서 response 가능
    // 이메일로 보내주실수 있나요? > 아티스트 레파지토리 이메일이 존재하는지 검색 >  Dto 를 펜즈로 보내줌.


*/

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


    // feedPost 댓글 리스트 조회(무한 스크롤)
    @GetMapping("feed/{feedPostId}/comment")
    public ResponseEntity<MultiResponseDto<CommentResponseDto.User>> getAllCommentsByFeedPostId(@PathVariable("feedPostId") int feedPostId,
                                                        @RequestParam(defaultValue = "1") @Positive int page,
                                                        @RequestParam(defaultValue = "16") @Positive int size) {
        Page<Comment> feedComments = commentService.findAllCommentsByFeedPostId(feedPostId, page - 1, size);
        List<Comment> comments = new ArrayList<>();

        if (feedComments != null) {
            comments = feedComments.getContent();
        }

        List<CommentResponseDto.User> commentResponseDtos = mapper.commentsToUserCommentResponseDtos(comments);

        return new ResponseEntity<>(new MultiResponseDto<CommentResponseDto.User>(commentResponseDtos, feedComments), HttpStatus.OK);
    }


//    @GetMapping("feed/{feedPostId}/comments")
//    public ResponseEntity getAllFansComment(@PathVariable("feedPostId") int feedPostId,
//                                            @RequestParam(defaultValue = "1") @Positive int page,
//                                            @RequestParam(defaultValue = "16") @Positive int size) {
//        Page<Comment> feedComments = commentService.findAllCommentsByFeedPostId(feedPostId, page - 1, size);
//        List<Comment> list = feedComments.getContent();
//
//        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), feedComments), HttpStatus.OK);
//    }


    // artistPost 댓글 리스트 조회(무한 스크롤)

    @GetMapping("artist/{artistPostId}/comment") // artistPost 댓글
    public ResponseEntity<MultiResponseDto<CommentResponseDto.User>> getAllArtistComment(@PathVariable("artistPostId") int artistPostId,
                                              @RequestParam(defaultValue = "1") @Positive int page,
                                              @RequestParam(defaultValue = "16") @Positive int size) {
        Page<Comment> artistComments = commentService.findAllCommentsByArtistPostId(artistPostId, page - 1, size);
        List<Comment> comments = new ArrayList<>();

        if (artistComments != null) {
            comments = artistComments.getContent();
        }

        List<CommentResponseDto.User> commentResponseDtos = mapper.commentsToUserCommentResponseDtos(comments);

        return new ResponseEntity<>(new MultiResponseDto<CommentResponseDto.User>(commentResponseDtos, artistComments), HttpStatus.OK);
    }

//    @GetMapping("artist/{artistPostId}/comments") // artistPost 댓글
//    public ResponseEntity getAllArtistComment(@PathVariable("artistPostId") int artistPostId,
//                                              @RequestParam(defaultValue = "1") @Positive int page,
//                                              @RequestParam(defaultValue = "16") @Positive int size) {
//        Page<Comment> artistComments = commentService.findAllCommentsByArtistPostId(artistPostId, page - 1, size);
//        List<Comment> list = artistComments.getContent();
//
//        return new ResponseEntity(new MultiResponseDto<>(mapper.commentsToUserCommentResponseDtos(list), artistComments), HttpStatus.OK);
//    }


    // feedPost 에서 댓글 수정

    @PatchMapping("feed/{feedPostId}/comment/{commentId}")
    public ResponseEntity<?> patchFeedPostComment(@PathVariable("feedPostId") @Positive @NotNull int feedPostId,
                                                  @PathVariable("commentId") @Positive @NotNull int commentId,
                                                  @Valid @RequestBody CommentPatchDto requestBody) {
        Fans findFan = commentService.findFansByEmail(requestBody.getEmail());
        Artist findArtist = commentService.findArtistByEmail(requestBody.getEmail());

        FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);

        Comment comment;
        if (findFan != null) {
            comment = mapper.commentPatchDtoToComment(findFan, findFeedPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);
            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentFanResponseDto(updateComment)), HttpStatus.OK);
        } else if (findArtist != null) {
            comment = mapper.commentPatchDtoToComment(findArtist, findFeedPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);
            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentArtistResponseDto(updateComment)), HttpStatus.OK);
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }

    // 방법 2
//    @PatchMapping("feed/{feedPostId}/comment/{commentId}")
//    public ResponseEntity<?> patchFeedPostComment(@PathVariable("feedPostId") @Positive @NotNull int feedPostId,
//                                                  @PathVariable("commentId") @Positive @NotNull int commentId,
//                                                  @Valid @RequestBody CommentPatchDto requestBody) {
//        if (fansRepository.existsByEmail(requestBody.getEmail())) {
//            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
//            Fans findFan = fansRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
//                    new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
//            // 해당하는 feedPost 정보 조회
//            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
//            Comment comment = mapper.commentPatchDtoToComment(findFan, findFeedPost, requestBody);
//            Comment updateComment = commentService.updateFanComment(commentId, comment);
//
//            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentFanResponseDto(updateComment)), HttpStatus.OK);
//
//        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
//            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
//            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
//                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
//            // 해당하는 feedPost 정보 조회
//            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId);
//            Comment comment = mapper.commentPatchDtoToComment(findArtist, findFeedPost, requestBody);
//            Comment updateComment = commentService.updateArtistComment(commentId, comment);
//
//            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentArtistResponseDto(updateComment)), HttpStatus.OK);
//
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }


    // artistPost 에서 댓글 수정
    @PatchMapping("artist/{artistPostId}/comment/{commentId}")
    public ResponseEntity<?> patchArtistPostComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
                                                    @PathVariable("commentId") @Positive @NotNull int commentId,
                                                    @Valid @RequestBody CommentPatchDto requestBody) {
        Fans findFan = commentService.findFansByEmail(requestBody.getEmail());
        Artist findArtist = commentService.findArtistByEmail(requestBody.getEmail());

        ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);

        Comment comment;
        if (findFan != null) {
            comment = mapper.commentPatchDtoToComment(findFan, findArtistPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);
            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentFanResponseDto(updateComment)), HttpStatus.OK);
        } else if (findArtist != null) {
            comment = mapper.commentPatchDtoToComment(findArtist, findArtistPost, requestBody);
            Comment updateComment = commentService.updateComment(commentId, comment);
            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentArtistResponseDto(updateComment)), HttpStatus.OK);
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }
    //  방법2
//    @PatchMapping("artist/{artistPostId}/comment/{commentId}")
//    public ResponseEntity<?> patchArtistPostComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
//                                                    @PathVariable("commentId") @Positive @NotNull int commentId,
//                                                    @Valid @RequestBody CommentPatchDto requestBody) {
//        if (fansRepository.existsByEmail(requestBody.getEmail())) {
//            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
//            Fans findFan = fansRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
//                    new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
//            // 해당하는 artistPost 정보 조회
//            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
//            Comment comment = mapper.commentPatchDtoToComment(findFan, findArtistPost, requestBody);
//            Comment updateComment = commentService.updateFanComment(commentId, comment);
//
//            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentFanResponseDto(updateComment)), HttpStatus.OK);
//
//        } else if (artistRepository.existsByEmail(requestBody.getEmail())) {
//            // FansRepository 인터페이스에서 findByEmail() 메소드를 사용하여 이메일 주소를 가진 팬 정보를 조회함
//            Artist findArtist = artistRepository.findByEmail(requestBody.getEmail()).orElseThrow(() ->
//                    new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
//            // 해당하는 artistPost 정보 조회
//            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId);
//            Comment comment = mapper.commentPatchDtoToComment(findArtist, findArtistPost, requestBody);
//            Comment updateComment = commentService.updateArtistComment(commentId, comment);
//
//            return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentArtistResponseDto(updateComment)), HttpStatus.OK);
//
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }

    // feedPost 댓글 삭제

    @DeleteMapping("feed/{feedPostId}/comment/{commentId}")
    public ResponseEntity<?> deleteFansComment(@PathVariable("feedPostId") @Positive @NotNull int feedPostId,
                                               @PathVariable("commentId") @Positive int commentId,
                                               @Valid @RequestBody CommentDeleteDto requestBody) {
        String userEmail = requestBody.getEmail();
        Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회

        if (findComment.getFans().getEmail().equals(userEmail) || findComment.getArtist().getEmail().equals(userEmail)) {
            FeedPost findFeedPost = feedPostService.findFeedPost(feedPostId); // feedPostId에 해당하는 feedPost 정보 조회
            commentService.deleteFeedPostComment(findFeedPost, commentId, userEmail);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
        }
    }


    // 방법 2)
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

    @DeleteMapping("artist/{artistPostId}/comment/{commentId}")
    public ResponseEntity deleteArtistComment(@PathVariable("artistPostId") @Positive @NotNull int artistPostId,
                                              @PathVariable("commentId") @Positive int commentId,
                                              @Valid @RequestBody CommentDeleteDto requestBody) {
        String userEmail = requestBody.getEmail();
        Comment findComment = commentService.findVerifiedComment(commentId); // commentId에 해당하는 comment 정보 조회

        if (findComment.getFans().getEmail().equals(userEmail) || findComment.getArtist().getEmail().equals(userEmail)) {
            ArtistPost findArtistPost = artistPostService.findArtistPost(artistPostId); // feedPostId에 해당하는 feedPost 정보 조회
            commentService.deleteArtistPostComment(findArtistPost, commentId, userEmail);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
        }
    }


//    방법 2)
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
