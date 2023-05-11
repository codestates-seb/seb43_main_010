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
import example.domain.feedPost.repository.feedPostRepository;
import org.springframework.data.domain.Page;
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
    @GetMapping("/new_post")
    public ResponseEntity getAllFeedPost(@RequestParam(defaultValue = "1") @Positive int page,
                                         @RequestParam(defaultValue = "16") @Positive int size) {
        Page<FeedPost> feedPosts = service.findAllFeedPost(page -1, size);
        List<FeedPost> list = feedPosts.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.feedPostsToFeedResponseDtos(list), feedPosts), HttpStatus.OK);
    }



    @DeleteMapping("/{feed_id}")
    public ResponseEntity deleteFeedPost(@PathVariable("feed_id") @Positive int feedPostId) {
        service.deleteFeedPost(feedPostId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
