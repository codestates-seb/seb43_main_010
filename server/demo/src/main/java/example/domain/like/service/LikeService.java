package example.domain.like.service;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.like.dto.ArtistLikeRequestDto;
import example.domain.like.entity.Like;
import example.domain.like.repository.LikeRepository;
import example.global.exception.DuplicateResourceException;
import example.global.exception.NotFoundException;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.entity.FeedPost;
import example.domain.like.dto.FanLikeRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import example.domain.feedPost.repository.feedPostRepository;
import org.springframework.transaction.annotation.Transactional;
import example.domain.artistPost.repository.artistPostRepository;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;
    private final feedPostRepository feedPostRepository;
    private final artistPostRepository artistPostRepository;

    // feedPost 좋아요
    @Transactional // 트랜잭션 처리 중 예외 발생(작업 중 하나라도 실패) -> 모든 작업 롤백
    public void insert(FanLikeRequestDto fanLikeRequestDto) throws Exception {
        Fans fans = fansRepository.findById(fanLikeRequestDto.getFanId())
                .orElseThrow(() -> new NotFoundException("Could not found fan id : " + fanLikeRequestDto.getFanId()));
        FeedPost feedPost = feedPostRepository.findById(fanLikeRequestDto.getFeedPostId())
                .orElseThrow(() -> new NotFoundException("Could not found feedPost id : " + fanLikeRequestDto.getFeedPostId()));

        // 이미 좋아요 되어 있으면 에러 반환
        if (likeRepository.findByFansAndFeedPost(fans, feedPost).isPresent()){
            // todo 409 에러로 변경
            throw new DuplicateResourceException("already exist data by fan id :" + fans.getFanId() + " ,"
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

    // artistPost 좋아요
    @Transactional // 트랜잭션 처리 중 예외 발생(작업 중 하나라도 실패) -> 모든 작업 롤백
    public void insert(ArtistLikeRequestDto artistLikeRequestDto) throws Exception {
        Artist artist = artistRepository.findById(artistLikeRequestDto.getArtistId())
                .orElseThrow(() -> new NotFoundException("Could not found artist id : " + artistLikeRequestDto.getArtistId()));
        ArtistPost artistPost = artistPostRepository.findById(artistLikeRequestDto.getArtistPostId())
                .orElseThrow(() -> new NotFoundException("Could not found artistPost id : " + artistLikeRequestDto.getArtistPostId()));

        // 이미 좋아요 되어 있으면 에러 반환
        if (likeRepository.findByArtistAndArtistPost(artist, artistPost).isPresent()){
            // todo 409 에러로 변경
            throw new DuplicateResourceException("already exist data by artist id :" + artist.getArtistId() + " ,"
                    + "artistPost id : " + artistPost.getId());
        }

        // like 객체 생성
        Like like= Like.builder()
                .artistPost(artistPost)
                .artist(artist)
                .build();

        likeRepository.save(like);
        artistPostRepository.addLikeCount(artistPost);
    }


    // feedPost 좋아요 취소
    @Transactional
    public void delete(FanLikeRequestDto fanLikeRequestDto){
        Fans fans = fansRepository.findById(fanLikeRequestDto.getFanId())
                .orElseThrow(() -> new NotFoundException("Could not found fan id : " + fanLikeRequestDto.getFanId()));
        FeedPost feedPost = feedPostRepository.findById(fanLikeRequestDto.getFeedPostId())
                .orElseThrow(() -> new NotFoundException("Could not found feedPost id : " + fanLikeRequestDto.getFeedPostId()));
        Like like = likeRepository.findByFansAndFeedPost(fans, feedPost)
                .orElseThrow(() -> new NotFoundException("Could not found like id"));

        likeRepository.delete(like);
        feedPostRepository.subLikeCount(feedPost);
    }

    // artistPost 좋아요 취소
    @Transactional
    public void delete(ArtistLikeRequestDto artistLikeRequestDto){
        Artist artist = artistRepository.findById(artistLikeRequestDto.getArtistId())
                .orElseThrow(() -> new NotFoundException("Could not found artist id : " + artistLikeRequestDto.getArtistId()));
        ArtistPost artistPost = artistPostRepository.findById(artistLikeRequestDto.getArtistPostId())
                .orElseThrow(() -> new NotFoundException("Could not found artistPost id : " + artistLikeRequestDto.getArtistPostId()));
        Like like = likeRepository.findByArtistAndArtistPost(artist, artistPost)
                .orElseThrow(() -> new NotFoundException("Could not found like id"));

        likeRepository.delete(like);
        artistPostRepository.subLikeCount(artistPost);
    }

}
