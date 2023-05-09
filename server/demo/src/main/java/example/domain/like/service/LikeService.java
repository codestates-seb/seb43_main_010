package example.domain.like.service;

import example.domain.like.entity.Like;
import example.domain.like.repository.LikeRepository;
import example.global.exception.DuplicateResourceException;
import example.global.exception.NotFoundException;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.entity.FeedPost;
import example.domain.like.dto.LikeRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import example.domain.feedPost.repository.feedPostRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final FansRepository fansRepository;
    private final feedPostRepository feedPostRepository;

    @Transactional // 트랜잭션 처리 중 예외 발생(작업 중 하나라도 실패) -> 모든 작업 롤백
    public void insert(LikeRequestDto likeRequestDto) throws Exception {
        Fans fans = fansRepository.findById(likeRequestDto.getFanId())
                .orElseThrow(() -> new NotFoundException("Could not found fan id : " + likeRequestDto.getFanId()));
        FeedPost feedPost = feedPostRepository.findById(likeRequestDto.getFeedPostId())
                .orElseThrow(() -> new NotFoundException("Could not found feedPost id : " + likeRequestDto.getFeedPostId()));

        // 이미 좋아요 되어 있으면 에러 반환
        if (likeRepository.findByFansAndfeedPost(fans, feedPost).isPresent()){
            // todo 409 에러로 변경
            throw new DuplicateResourceException("already exist data by fan id :" + fans.getId() + " ,"
                    + "feedPost id : " + feedPost.getId());
        }

        // like 객체 생성
        Like like = Like.builder()
                .feedPost(feedPost)
                .fans(fans)
                .build();

        likeRepository.save(like);
        feedPostRepository.addLikeCount(feedPost);
    }



    @Transactional
    public void delete(LikeRequestDto likeRequestDto){
        Fans fans = fansRepository.findById(likeRequestDto.getFanId())
                .orElseThrow(() -> new NotFoundException("Could not found fan id : " + likeRequestDto.getFanId()));
        FeedPost feedPost = feedPostRepository.findById(likeRequestDto.getFeedPostId())
                .orElseThrow(() -> new NotFoundException("Could not found post id : " + likeRequestDto.getFeedPostId()));
        Like like = likeRepository.findByFansAndfeedPost(fans, feedPost)
                .orElseThrow(() -> new NotFoundException("Could not found like id"));

        likeRepository.delete(like);
        feedPostRepository.subLikeCount(feedPost);
    }

}
