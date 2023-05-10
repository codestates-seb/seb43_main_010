package example.domain.feedPost.controller;

import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.dto.feedPostDto;
import example.domain.feedPost.entity.FeedPost;
import example.domain.feedPost.mapper.feedPostMapper;
import example.domain.feedPost.service.feedPostService;
import example.global.response.SingleResponseDto;
import example.domain.feedPost.repository.feedPostRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/feeds")
public class feedPostController {
    private feedPostMapper mapper;
    private FansRepository fansRepository;
    private feedPostService service;
    private example.domain.feedPost.repository.feedPostRepository feedPostRepository;

    public feedPostController(feedPostMapper mapper, FansRepository fansRepository, feedPostService service, feedPostRepository feedPostRepository) {
        this.mapper = mapper;
        this.fansRepository = fansRepository;
        this.service = service;
        this.feedPostRepository = feedPostRepository;
    }

    @PostMapping("/ask")
    public ResponseEntity postFeedPost(@Valid @RequestBody feedPostDto.Post requestBody){
        Fans fans = fansRepository.findById(requestBody.getFansId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        FeedPost feedPost = mapper.feedPostDtoToFeed(requestBody, fans);
        FeedPost saveFeedPost = service.createFeedPost(feedPost);
        return new ResponseEntity<>(mapper.feedToFeedResponseDto(saveFeedPost),
                HttpStatus.OK);
    }

//    @GetMapping("/{group_id}")
//    public ResponseEntity getFeedPost(@PathVariable("group_id") @Positive int feedId){
//        feedPost feedPost = service.findFeedPost(feedId);
//        List<feedPost> feedPosts = feedPosts.getContent();
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.feedPostsToFeedResponseDtos(feedPosts),
//                        HttpStatus.OK);
//    }

    // feed 상세 조회
    @GetMapping("{feed-id}")
    public ResponseEntity getFeed(
            @PathVariable("feed-id") @Positive int feedPostId){
        FeedPost feedPost = service.findFeedPost(feedPostId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.feedToFeedResponseDto(feedPost)),
                HttpStatus.OK);
    }


    // feed 리스트 조회(무한 스크롤)
    @GetMapping("/{group_id}")
    public ResponseEntity<List<FeedPost>> getFeeds(@RequestParam(value = "lastId", required = false) Integer lastId) {
        int pageSize = 10; // 한 페이지에 보여줄 데이터의 양
        List<FeedPost> feedPosts;
        if (lastId == null) {
            feedPosts = feedPostRepository.findFirst10ByOrderByIdDesc(); // 마지막 10개의 피드 게시물 반환
        } else {
            feedPosts = feedPostRepository.findByIdLessThanOrderByIdDesc(lastId, PageRequest.of(0, pageSize)); // 마지막 id보다 작은 항목 반환
        }
        return ResponseEntity.ok(feedPosts);
    }



//    // feed 리스트 조회(무한 스크롤)
//    @PatchMapping("/{feed_id}")
//    public ResponseEntity pathchFeedPost(@PathVariable("feed_id") @Positive int feedPostId,
//                                        @Valid @RequestBody feedPostDto.Patch requestBody) {
//        requestBody.setFeedPostId(feedPostId);
//        Fans fans = fansRepository.findById(requestBody.getFansId())
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
//        feedPost feedPost = mapper.feedPatchDtoToFeed(requestBody, fans);
//        feedPost updateFeedPost = service.updateFeedPost(feedPost);
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(mapper.feedToFeedResponseDto(updateFeedPost)),
//                HttpStatus.OK);
//    }

    @DeleteMapping("/{feed_id}")
    public ResponseEntity deleteFeedPost(@PathVariable("feed_id") @Positive int feedPostId) {
        service.deleteFeedPost(feedPostId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
