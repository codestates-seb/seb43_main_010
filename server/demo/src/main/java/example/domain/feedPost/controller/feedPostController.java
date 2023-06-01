package example.domain.feedPost.controller;

import example.domain.group.entity.Group;
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
import example.domain.group.repository.GroupRepository;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/feed")
public class feedPostController {
    private feedPostMapper mapper;
    private FansRepository fansRepository;
    private feedPostService service;
    private GroupRepository groupRepository;


    public feedPostController(feedPostMapper mapper, FansRepository fansRepository, feedPostService service, GroupRepository groupRepository) {
        this.mapper = mapper;
        this.fansRepository = fansRepository;
        this.service = service;
        this.groupRepository = groupRepository;
    }

    // feedPost 등록
    @PostMapping("/{groupId}")
    public ResponseEntity postFeedPost(@PathVariable("groupId") @Positive int groupId,
                                       @Valid @RequestBody feedPostDto.Post requestBody) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));
        Fans fans = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));

        FeedPost feedPost = mapper.feedPostDtoToFeed(requestBody, fans);
        feedPost.setGroup(group);

        FeedPost savedFeedPost = service.createFeedPost(feedPost);

        FeedPost saveFeedPost = service.createFeedPost(feedPost);
        return new ResponseEntity<>(mapper.feedToFeedResponseDto(saveFeedPost),
                HttpStatus.OK);
    }




    // feedPost 상세 조회
    @GetMapping("/{groupId}/{feedPostId}") // 경로 변수 안에는 entity 클래스의 식별자 들어감
    public ResponseEntity getFeed(@PathVariable("groupId") @Positive int groupId,
                                  @PathVariable("feedPostId") @Positive int feedPostId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        FeedPost feedPost = service.findFeedPost(feedPostId);

        if (feedPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
        }

        return new ResponseEntity<>(mapper.feedToFeedResponseDto(feedPost),
                HttpStatus.OK);
    }





//    // feedPost 수정
    @PatchMapping("/{groupId}/{feedPostId}")
    public ResponseEntity patchFeedPost(@PathVariable("groupId") @Positive int groupId,
                                        @PathVariable("feedPostId") @Positive int feedPostId,
                                        @Valid @RequestBody feedPostDto.Patch requestBody) {
        FeedPost findFeedPost = service.findFeedPost(feedPostId);
        Fans fan = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (findFeedPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
        }

        FeedPost feedPost = mapper.feedPatchDtoToFeed(findFeedPost, requestBody, fan);
        feedPost.setGroup(group);

        FeedPost updateFeedPost = service.updateFeedPost(feedPost);

        return new ResponseEntity<>(mapper.feedToFeedResponseDto(updateFeedPost), HttpStatus.OK);
    }



    // feedPost 삭제
    @DeleteMapping("/{groupId}/{feedPostId}")
    public ResponseEntity deleteFeedPost(@PathVariable("groupId") @Positive int groupId,
                                         @PathVariable("feedPostId") @Positive int feedPostId,
                                         @Valid @RequestBody feedPostDto.Delete requestBody) {
        Fans fan = fansRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        FeedPost findFeedPost = service.findFeedPost(feedPostId);


        if (findFeedPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND);
        }

        service.deleteFeedPost(fan, findFeedPost);
        return ResponseEntity.ok("feedPost 게시글 삭제 성공");
    }



    // feedPost 리스트 조회(무한 스크롤)
    @GetMapping("/{groupId}")
    public ResponseEntity getFeedPosts(@PathVariable("groupId") int groupId,
                                       @Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<FeedPost> pageFeedPosts = service.findFeedPosts(groupId,page -1, size);
        List<FeedPost> list = pageFeedPosts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        mapper.feedPostsToFeedResponseDtos(list), pageFeedPosts), HttpStatus.OK);
    }
}
