package example.domain.feedPost.service;

import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.feedPost.entity.FeedPost;
import example.domain.feedPost.repository.feedPostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
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

    public FeedPost findFeedPost(int feedId){
        Optional<FeedPost> optionalPost = feedPostRepository.findById(feedId); // findById : Optional<T> 객체 반환
        return optionalPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEEDPOST_NOT_FOUND));
    }

    // 최신글 순으로 조회
    @Transactional(readOnly = true)
    public Page<FeedPost> findAllFeedPost(int page, int size){
        Page<FeedPost> feedPosts = feedPostRepository.findAll((PageRequest.of(page, size, Sort.by("feedPostId").descending())));

        return feedPosts;
    }

    public FeedPost updateFeedPost(FeedPost feedPost){
        FeedPost findFeedPost = findFeedPost(feedPost.getId());

        if(feedPost.getFans().getId() != findFeedPost.getFans().getId()) {
            throw new BusinessLogicException(ExceptionCode.FEEDPOST_AUTHOR_NOT_MATCH);
        }else{
            Optional.ofNullable(feedPost.getContent()).ifPresent(content -> findFeedPost.setContent(content));
            Optional.ofNullable(feedPost.getImg()).ifPresent(img -> findFeedPost.setImg(img));
            findFeedPost.setModifiedAt(LocalDateTime.now());
        }

        return feedPostRepository.save(findFeedPost);
    }

    public void deleteFeedPost(int feedId){
        FeedPost findFeedPost = findFeedPost(feedId);
        feedPostRepository.delete(findFeedPost);
    }

}
