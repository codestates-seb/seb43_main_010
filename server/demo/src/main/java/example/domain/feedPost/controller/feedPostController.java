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
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/feeds")
public class feedPostController {
    private feedPostMapper mapper;
    private FansRepository fansRepository;
    private feedPostService service;


    public feedPostController(feedPostMapper mapper, FansRepository fansRepository, feedPostService service) {
        this.mapper = mapper;
        this.fansRepository = fansRepository;
        this.service = service;
    }

    @PostMapping("/ask")
    public ResponseEntity postFeedPost(@Valid @RequestBody feedPostDto.Post requestBody){
        Fans fans = fansRepository.findById(requestBody.getFansId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        FeedPost feedPost = mapper.feedPostDtoToFeed(requestBody, fans);
        FeedPost saveFeedPost = service.createFeedPost(feedPost);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.feedToFeedResponseDto(saveFeedPost)),
                HttpStatus.OK);
    }


//     feed 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity getFeed(
            @PathVariable("id") @Positive int feedPostId){
        FeedPost feedPost = service.findFeedPost(feedPostId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.feedToFeedResponseDto(feedPost)),
                HttpStatus.OK);
    }


    // feedPost 리스트 조회(무한 스크롤)
    @GetMapping
    public ResponseEntity getAllFeedPost(@RequestParam(defaultValue = "1") @Min(1) int page,
                                         @RequestParam(defaultValue = "16") @Min(1) int size) {
        Page<FeedPost> pageFeedPosts = service.findAllFeedPost(page -1, size);
        List<FeedPost> list = pageFeedPosts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.feedPostsToFeedResponseDtos(list), pageFeedPosts), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity pathFeedPost(
            @PathVariable("id") @Positive int feedPostId,
            @Valid @RequestBody feedPostDto.Patch requestBody){
        requestBody.setFeedPostId(feedPostId);
        Fans fans = fansRepository.findById(requestBody.getFansId())
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        FeedPost feedPost = mapper.feedPatchDtoToFeed(requestBody, fans);
        FeedPost updateFeedPost = service.updateFeedPost(feedPost);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.feedToFeedResponseDto(updateFeedPost)), HttpStatus.OK);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity deleteFeedPost(@PathVariable("id") @Positive int feedPostId) {
        service.deleteFeedPost(feedPostId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
