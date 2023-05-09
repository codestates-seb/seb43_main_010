package com.example.demo.feedPost.controller;

import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import com.example.demo.fans.entity.Fans;
import com.example.demo.fans.repository.FansRepository;
import com.example.demo.feedPost.dto.feedPostDto;
import com.example.demo.feedPost.entity.feedPost;
import com.example.demo.feedPost.mapper.feedPostMapper;
import com.example.demo.feedPost.service.feedPostService;
import com.example.demo.response.SingleResponseDto;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.feedPost.repository.feedPostRepository;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/feed")
public class feedPostController {
    private feedPostMapper mapper;
    private FansRepository fansRepository;
    private feedPostService service;
    private feedPostRepository feedPostRepository;

    public feedPostController(feedPostMapper mapper, FansRepository fansRepository, feedPostService service, feedPostRepository feedPostRepository) {
        this.mapper = mapper;
        this.fansRepository = fansRepository;
        this.service = service;
        this.feedPostRepository = feedPostRepository;
    }

    @PostMapping
    public ResponseEntity postFeedPost(@Valid @RequestBody feedPostDto.Post requestBody){
        Fans fans = fansRepository.findById(requestBody.getFansId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        feedPost feedPost = mapper.feedPostDtoToFeed(requestBody, fans);
        feedPost saveFeedPost = service.createFeedPost(feedPost);
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

    @GetMapping("/{group_id}") // 무한 스크롤
    public ResponseEntity<List<feedPost>> getItems(@RequestParam(value = "lastId", required = false) Long lastId) {
        int pageSize = 10; // 한 페이지에 보여줄 데이터의 양
        List<feedPost> feedPosts;
        if (lastId == null) {
            feedPosts = feedPostRepository.findFirst10ByOrderByIdDesc(); // 마지막 10개의 피드 게시물 반환
        } else {
            feedPosts = feedPostRepository.findByIdLessThanOrderByIdDesc(lastId, PageRequest.of(0, pageSize)); // 마지막 id보다 작은 항목 반환
        }
        return ResponseEntity.ok(feedPosts);
    }




    @PatchMapping("/{feed_id}")
    public ResponseEntity pathchFeedPost(@PathVariable("feed_id") @Positive int feedPostId,
                                        @Valid @RequestBody feedPostDto.Patch requestBody) {
        requestBody.setFeedPostId(feedPostId);
        Fans fans = fansRepository.findById(requestBody.getFansId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        feedPost feedPost = mapper.feedPatchDtoToFeed(requestBody, fans);
        feedPost updateFeedPost = service.updateFeedPost(feedPost);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.feedToFeedResponseDto(updateFeedPost)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{feed_id}")
    public ResponseEntity deleteFeedPost(@PathVariable("feed_id") @Positive int feedPostId) {
        service.deleteFeedPost(feedPostId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
