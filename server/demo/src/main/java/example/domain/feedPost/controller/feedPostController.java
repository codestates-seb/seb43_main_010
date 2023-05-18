package example.domain.feedPost.controller;

import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.dto.feedPostDto;
import example.domain.feedPost.entity.FeedPost;
import example.domain.feedPost.mapper.feedPostMapper;
import example.domain.feedPost.service.feedPostService;
import example.global.response.MultiResponseDto;
import example.global.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/feed")
public class feedPostController {
    private feedPostMapper mapper;
    private FansRepository fansRepository;
    private feedPostService service;


    public feedPostController(feedPostMapper mapper, FansRepository fansRepository, feedPostService service) {
        this.mapper = mapper;
        this.fansRepository = fansRepository;
        this.service = service;
    }

    // feedPost 등록
    @PostMapping
    public ResponseEntity postFeedPost(@Valid @RequestBody feedPostDto.Post requestBody) {
        Fans fans = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        FeedPost feedPost = mapper.feedPostDtoToFeed(requestBody, fans);
        FeedPost saveFeedPost = service.createFeedPost(feedPost);
        return new ResponseEntity<>(mapper.feedToFeedResponseDto(saveFeedPost),
                HttpStatus.OK);
    }


    // feedPost 상세 조회
    @GetMapping("/{feedPostId}") // 경로 변수 안에는 entity 클래스의 식별자 들어감
    public ResponseEntity getFeed(@PathVariable("feedPostId") @Positive int feedPostId) {
        FeedPost feedPost = service.findFeedPost(feedPostId);
        return new ResponseEntity<>(mapper.feedToFeedResponseDto(feedPost),
                HttpStatus.OK);
    }


    // feedPost 수정
    @PatchMapping("/{feedPostId}")
    public ResponseEntity patchFeedPost(@PathVariable("feedPostId") @Positive int feedPostId,
                                        @Valid @RequestBody feedPostDto.Patch requestBody) {
        FeedPost findFeedPost = service.findFeedPost(feedPostId);
        Fans fan = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        FeedPost feedPost = mapper.feedPatchDtoToFeed(findFeedPost, requestBody, fan);
        FeedPost updateFeedPost = service.updateFeedPost(feedPost);

        return new ResponseEntity<>(mapper.feedToFeedResponseDto(updateFeedPost), HttpStatus.OK);
    }


    // feedPost 삭제
// 메세지 뺀것 잘 작동 됨.
    @DeleteMapping("/{feedPostId}")
    public ResponseEntity deleteFeedPost(@PathVariable("feedPostId") @Positive int feedPostId,
                                         @Valid @RequestBody feedPostDto.Delete requestBody) {
        Fans fan = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        FeedPost findFeedPost = service.findFeedPost(feedPostId);
        service.deleteFeedPost(fan, findFeedPost);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


//    @DeleteMapping("/{feedPostId}")
//    public ResponseEntity<String> deleteFeedPost(@PathVariable("feedPostId") @Positive int feedPostId,
//                                                 @Valid @RequestBody feedPostDto.Delete requestBody) {
//        Fans fan = fansRepository.findById(requestBody.getFanId())
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
//        FeedPost findFeedPost = service.findFeedPost(feedPostId);
//        boolean success = service.deleteFeedPost(fan, findFeedPost);
//
//        if (success) {
//            String message = "삭제 성공 되었습니다.";
//            return ResponseEntity.status(HttpStatus.NO_CONTENT)
//                    .body(message);
//        } else {
//            String message = "삭제 실패 되었습니다.";
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(message);
//        }
//    }
//}




    // feedPost 리스트 조회(무한 스크롤)
//    @GetMapping("/{groupId}")
//    public ResponseEntity getFeedPosts(@PathVariable("groupId") int groupId,
//                                        @Positive @RequestParam int page,
//                                        @Positive @RequestParam int size) {
//        Page<FeedPost> pageFeedPosts = service.findFeedPosts(groupId,page -1, size);
//        List<FeedPost> feedPosts = pageFeedPosts.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(
//                        mapper.feedPostsToFeedResponseDtos(feedPosts), pageFeedPosts), HttpStatus.OK);
//    }
}
