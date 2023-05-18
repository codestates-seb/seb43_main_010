package example.domain.feedPost.service;

import example.domain.fans.entity.Fans;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.feedPost.entity.FeedPost;
import example.domain.feedPost.repository.feedPostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class feedPostService {
    private feedPostRepository feedPostRepository;

    public feedPostService(feedPostRepository feedPostRepository){
        this.feedPostRepository = feedPostRepository;
    }

    public FeedPost createFeedPost(FeedPost feedPost){
        return feedPostRepository.save(feedPost);
    }

    public FeedPost findFeedPost(int feedPostId){
        return feedPostRepository.findById(feedPostId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));
    }

    public FeedPost updateFeedPost(FeedPost feedPost){
        FeedPost findFeedPost = findFeedPost(feedPost.getId());

        if(feedPost.getFans().getFanId() != findFeedPost.getFans().getFanId()) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_AUTHOR_NOT_MATCH);
        }else{ // feedPost의 content가 null이 아니라면, findFeedPost의 content를 feedPost의 content로 설정
            Optional.ofNullable(feedPost.getContent()).ifPresent(content -> findFeedPost.setContent(content));
            Optional.ofNullable(feedPost.getImg()).ifPresent(img -> findFeedPost.setImg(img));
            findFeedPost.setCreatedAt(LocalDateTime.now());
        }

        return feedPostRepository.save(findFeedPost);
    }

    public void deleteFeedPost(Fans fan, FeedPost feedPost){
        FeedPost findFeedPost = findFeedPost(feedPost.getId());
        if(fan.getFanId() != findFeedPost.getFans().getFanId()) { //  fanId와 findFeedPost의 작성자 ID를 비교하여 일치하지 않으면
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_AUTHOR_NOT_MATCH);
        }
        feedPostRepository.delete(findFeedPost);
    }


    //    @Transactional(readOnly = true)
//    public Page<FeedPost> findFeedPosts(int groupId, int page, int size){
//        Page<FeedPost> feedPosts = feedPostRepository.findAllByFeedGroupId(groupId, PageRequest.of(page, size, Sort.by("id").descending()));
//
//        return feedPosts;
////        return feedPostRepository.findAll(PageRequest.of(page, size,Sort.by("id").descending()));
//    }


//     팬 검증 메서드
//    private Fans findFan(int fanId) {
//        return fansRepository.findById(fanId).orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.FANS_NOT_FOUND));
//    }

//    public feedPostResponseDto getFeedById(int feedPostId) {
//        Optional<FeedPost> optionalFeedPost = feedPostRepository.findById(feedPostId);
//        FeedPost feedPost = optionalFeedPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));
//
//        feedPostResponseDto responseDto = new feedPostResponseDto();
//        responseDto.setFeedPostId(feedPost.getId());
//        return responseDto;
//    }
}
