package example.domain.like.service;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.entity.Comment;
import example.domain.like.dto.LikeRequestDto;
import example.domain.like.entity.Like;
import example.domain.like.repository.LikeRepository;
import example.global.exception.DuplicateResourceException;
import example.global.exception.NotFoundException;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.entity.FeedPost;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import example.domain.feedPost.repository.feedPostRepository;
import org.springframework.transaction.annotation.Transactional;
import example.domain.artistPost.repository.artistPostRepository;
import example.domain.comment.repository.CommentRepository;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;
    private final feedPostRepository feedPostRepository;
    private final artistPostRepository artistPostRepository;
    private final CommentRepository commentRepository;

    // feedPost fan이 좋아요
    @Transactional
    public void insertFeedFanLike(Integer groupId, LikeRequestDto likeRequestDto) throws Exception {
        FeedPost feedPost = feedPostRepository.findById(likeRequestDto.getFeedPostId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getFeedPostId() + "인 피드 게시물을 찾을 수 없습니다."));

        // 특정 그룹에 속하는지 확인
        if (!feedPost.getGroup().getId().equals(groupId)) {
            throw new IllegalArgumentException("ID가 " + likeRequestDto.getFeedPostId() + "인 피드 게시물은 그룹 ID " + groupId + "에 속하지 않습니다.");
        }

        // 이미 좋아요가 되어 있는 경우 예외 처리
        if (likeRepository.findByFansAndFeedPost(feedPost.getFan(), feedPost).isPresent()) {
            // todo 409 에러로 변경
            throw new DuplicateResourceException("팬 id: " + feedPost.getFan().getFanId() + "로 이미 좋아요가 눌러진 피드 게시물 Id: " + feedPost.getId());
        }

        // like 객체 생성
        Like like = Like.builder()
                .feedPost(feedPost)
                .fans(feedPost.getFan())
                .build();

        likeRepository.save(like);
        feedPostRepository.addLikeCount(feedPost);
    }



    // feedPost artist가 좋아요
@Transactional
public void insertFeedArtistLike(Integer groupId, LikeRequestDto likeRequestDto) throws Exception {
    FeedPost feedPost = feedPostRepository.findById(likeRequestDto.getFeedPostId())
            .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getFeedPostId() + "인 피드 게시물을 찾을 수 없습니다."));

    // 특정 그룹에 속하는지 확인
    if (!feedPost.getGroup().getId().equals(groupId)) {
        throw new IllegalArgumentException("ID가 " + likeRequestDto.getFeedPostId() + "인 피드 게시물은 그룹 ID " + groupId + "에 속하지 않습니다.");
    }

    // 이미 좋아요가 되어 있는 경우 예외 처리
    if (likeRepository.findByArtistAndFeedPost(feedPost.getArtist(), feedPost).isPresent()) {
        // todo 409 에러로 변경
        throw new DuplicateResourceException("아티스트 ID " + feedPost.getArtist().getArtistId() + "로 이미 좋아요가 눌러진 피드 게시물 ID: " + feedPost.getId());
    }

    // 좋아요 객체 생성
    Like like = Like.builder()
            .feedPost(feedPost)
            .artist(feedPost.getArtist())
            .build();

    likeRepository.save(like);
    feedPostRepository.addLikeCount(feedPost);
}


    // artistPost fan이 좋아요
    @Transactional
    public void insertArtistFanLike(Integer groupId, LikeRequestDto likeRequestDto) throws Exception {
        ArtistPost artistPost = artistPostRepository.findById(likeRequestDto.getArtistPostId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getArtistPostId() + "인 피드 게시물을 찾을 수 없습니다."));

        // 특정 그룹에 속하는지 확인
        if (!artistPost.getGroup().getId().equals(groupId)) {
            throw new IllegalArgumentException("ID가 " + likeRequestDto.getArtistPostId() + "인 피드 게시물은 그룹 ID " + groupId + "에 속하지 않습니다.");
        }

        // 이미 좋아요가 되어 있는 경우 예외 처리
        if (likeRepository.findByFansAndArtistPost(artistPost.getFan(), artistPost).isPresent()) {
            // todo 409 에러로 변경
            throw new DuplicateResourceException("팬 id: " + artistPost.getFan().getFanId() + "로 이미 좋아요가 눌러진 피드 게시물 Id: " + artistPost.getId());
        }

        // like 객체 생성
        Like like = Like.builder()
                .artistPost(artistPost)
                .fans(artistPost.getFan())
                .build();

        likeRepository.save(like);
        artistPostRepository.addLikeCount(artistPost);
    }




    // artistPost artist가 좋아요
    @Transactional
    public void insertArtistArtistLike(Integer groupId, LikeRequestDto likeRequestDto) throws Exception {
        ArtistPost artistPost = artistPostRepository.findById(likeRequestDto.getArtistPostId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getArtistPostId() + "인 피드 게시물을 찾을 수 없습니다."));

        // 특정 그룹에 속하는지 확인
        if (!artistPost.getGroup().getId().equals(groupId)) {
            throw new IllegalArgumentException("ID가 " + likeRequestDto.getArtistPostId() + "인 피드 게시물은 그룹 ID " + groupId + "에 속하지 않습니다.");
        }

        // 이미 좋아요가 되어 있는 경우 예외 처리
        if (likeRepository.findByArtistAndArtistPost(artistPost.getArtist(), artistPost).isPresent()) {
            // todo 409 에러로 변경
            throw new DuplicateResourceException("아티스트 ID " + artistPost.getArtist().getArtistId() + "로 이미 좋아요가 눌러진 피드 게시물 ID: " + artistPost.getId());
        }

        // 좋아요 객체 생성
        Like like = Like.builder()
                .artistPost(artistPost)
                .artist(artistPost.getArtist())
                .build();

        likeRepository.save(like);
        artistPostRepository.addLikeCount(artistPost);
    }




    // feedPost에서 fan이 좋아요 취소
    @Transactional
    public void deleteFeedFanLike(Integer groupId, LikeRequestDto likeRequestDto) {
        Fans fans = fansRepository.findById(likeRequestDto.getFanId())
                .orElseThrow(() -> new NotFoundException("Could not find fan with id: " + likeRequestDto.getFanId()));

        FeedPost feedPost = feedPostRepository.findById(likeRequestDto.getFeedPostId())
                .orElseThrow(() -> new NotFoundException("Could not find feedPost with id: " + likeRequestDto.getFeedPostId()));

        // 특정 그룹에 속하는지 확인
        if (!feedPost.getGroup().getId().equals(groupId)) {
            throw new IllegalArgumentException("The feedPost with id: " + likeRequestDto.getFeedPostId()
                    + " does not belong to group with id: " + groupId);
        }

        Like like = likeRepository.findByFansAndFeedPost(fans, feedPost)
                .orElseThrow(() -> new NotFoundException("Could not find like"));

        likeRepository.delete(like);
        feedPostRepository.subLikeCount(feedPost);
    }

    // feedPost에서 artist가 좋아요 취소
    @Transactional
    public void deleteFeedArtistLike(Integer groupId, LikeRequestDto likeRequestDto) {
        Artist artist = artistRepository.findById(likeRequestDto.getArtistId())
                .orElseThrow(() -> new NotFoundException("Could not find artist with id: " + likeRequestDto.getArtistId()));

        FeedPost feedPost = feedPostRepository.findById(likeRequestDto.getFeedPostId())
                .orElseThrow(() -> new NotFoundException("Could not find feedPost with id: " + likeRequestDto.getFeedPostId()));

        // 특정 그룹에 속하는지 확인
        if (!feedPost.getGroup().getId().equals(groupId)) {
            throw new IllegalArgumentException("The feedPost with id: " + likeRequestDto.getFeedPostId()
                    + " does not belong to group with id: " + groupId);
        }

        Like like = likeRepository.findByArtistAndFeedPost(artist, feedPost)
                .orElseThrow(() -> new NotFoundException("Could not find like"));

        likeRepository.delete(like);
        feedPostRepository.subLikeCount(feedPost);
    }


    // artistPost에서 fan이 좋아요 취소
    @Transactional
    public void deleteArtistFanLike(Integer groupId, LikeRequestDto likeRequestDto) {
        Fans fans = fansRepository.findById(likeRequestDto.getFanId())
                .orElseThrow(() -> new NotFoundException("Could not find fan with id: " + likeRequestDto.getFanId()));

        ArtistPost artistPost = artistPostRepository.findById(likeRequestDto.getArtistPostId())
                .orElseThrow(() -> new NotFoundException("Could not find artistPost with id: " + likeRequestDto.getArtistPostId()));

        // 특정 그룹에 속하는지 확인
        if (!artistPost.getGroup().getId().equals(groupId)) {
            throw new IllegalArgumentException("The artistPost with id: " + likeRequestDto.getArtistPostId()
                    + " does not belong to group with id: " + groupId);
        }

        Like like = likeRepository.findByFansAndArtistPost(fans, artistPost)
                .orElseThrow(() -> new NotFoundException("Could not find like"));

        likeRepository.delete(like);
        artistPostRepository.subLikeCount(artistPost);
    }





    // artistPost에서 artist가 좋아요 취소
    @Transactional
    public void deleteArtistArtistLike(Integer groupId, LikeRequestDto likeRequestDto) {
        Artist artist = artistRepository.findById(likeRequestDto.getArtistId())
                .orElseThrow(() -> new NotFoundException("Could not find artist with id: " + likeRequestDto.getArtistId()));

        ArtistPost artistPost = artistPostRepository.findById(likeRequestDto.getArtistPostId())
                .orElseThrow(() -> new NotFoundException("Could not find artistPost with id: " + likeRequestDto.getArtistPostId()));

        // 특정 그룹에 속하는지 확인
        if (!artistPost.getGroup().getId().equals(groupId)) {
            throw new IllegalArgumentException("The artistPost with id: " + likeRequestDto.getArtistPostId()
                    + " does not belong to group with id: " + groupId);
        }

        Like like = likeRepository.findByArtistAndArtistPost(artist, artistPost)
                .orElseThrow(() -> new NotFoundException("Could not find like"));

        likeRepository.delete(like);
        artistPostRepository.subLikeCount(artistPost);
    }




    // feedPost에서 fan이 comment 좋아요
    @Transactional
    public void insertFeedCommentFanLike(LikeRequestDto likeRequestDto) throws Exception {
        Comment comment = commentRepository.findById(likeRequestDto.getCommentId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getCommentId() + "인 댓글을 찾을 수 없습니다."));

        // 특정 피드 게시물에 속하는지 확인
        if (!comment.getFeedPost().getId().equals(likeRequestDto.getFeedPostId())) {
            throw new IllegalArgumentException("ID가 " + likeRequestDto.getCommentId() + "인 댓글은 피드 게시물 ID " + likeRequestDto.getFeedPostId() + "에 속하지 않습니다.");
        }


        // 이미 좋아요가 되어 있는 경우 예외 처리
        if (likeRepository.findByFansAndComment(comment.getFan(), comment).isPresent()) {
            throw new DuplicateResourceException("팬 id: " + comment.getFan().getFanId() + "로 이미 좋아요가 눌러진 댓글 Id: " + comment.getId());
        }

        // like 객체 생성
        Like like = Like.builder()
                .comment(comment)
                .fans(comment.getFan())
                .buildWithComment();

        likeRepository.save(like);
        commentRepository.addLikeCount(comment);

    }
//
//
//
    // feedPost에서 artist가 comment 좋아요
    @Transactional
    public void insertFeedCommentArtistLike(LikeRequestDto likeRequestDto) throws Exception {
        Comment comment = commentRepository.findById(likeRequestDto.getCommentId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getCommentId() + "인 댓글을 찾을 수 없습니다."));

        // 특정 피드 게시물에 속하는지 확인
        if (!comment.getFeedPost().getId().equals(likeRequestDto.getFeedPostId())) {
            throw new IllegalArgumentException("ID가 " + likeRequestDto.getCommentId() + "인 댓글은 피드 게시물 ID " + likeRequestDto.getFeedPostId() + "에 속하지 않습니다.");
        }

        // 이미 좋아요가 되어 있는 경우 예외 처리
        if (likeRepository.findByArtistAndComment(comment.getArtist(), comment).isPresent()) {
            throw new DuplicateResourceException("아티스트 id: " + comment.getArtist().getArtistId() + "로 이미 좋아요가 눌러진 댓글 Id: " + comment.getId());
        }

        // like 객체 생성
        Like like = Like.builder()
                .comment(comment)
                .artist(comment.getArtist())
                .buildWithComment();

        likeRepository.save(like);
        commentRepository.addLikeCount(comment);

    }

    // artistPost fan이 comment 좋아요
    @Transactional
    public void insertArtistCommentFanLike(LikeRequestDto likeRequestDto) throws Exception {
        Comment comment = commentRepository.findById(likeRequestDto.getCommentId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getCommentId() + "인 댓글을 찾을 수 없습니다."));

        // 특정 피드 게시물에 속하는지 확인
        if (!comment.getArtistPost().getId().equals(likeRequestDto.getArtistPostId())) {
            throw new IllegalArgumentException("ID가 " + likeRequestDto.getCommentId() + "인 댓글은 피드 게시물 ID " + likeRequestDto.getArtistPostId() + "에 속하지 않습니다.");
        }


        // 이미 좋아요가 되어 있는 경우 예외 처리
        if (likeRepository.findByFansAndComment(comment.getFan(), comment).isPresent()) {
            throw new DuplicateResourceException("팬 id: " + comment.getFan().getFanId() + "로 이미 좋아요가 눌러진 댓글 Id: " + comment.getId());
        }

        // like 객체 생성
        Like like = Like.builder()
                .comment(comment)
                .fans(comment.getFan())
                .buildWithComment();

        likeRepository.save(like);
        commentRepository.addLikeCount(comment);
    }





    // artistPost artist가 comment 좋아요
    @Transactional
    public void insertArtistCommentArtistLike(LikeRequestDto likeRequestDto) throws Exception {
        Comment comment = commentRepository.findById(likeRequestDto.getCommentId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getCommentId() + "인 댓글을 찾을 수 없습니다."));

        // 특정 피드 게시물에 속하는지 확인
        if (!comment.getArtistPost().getId().equals(likeRequestDto.getArtistPostId())) {
            throw new IllegalArgumentException("ID가 " + likeRequestDto.getCommentId() + "인 댓글은 피드 게시물 ID " + likeRequestDto.getArtistPostId() + "에 속하지 않습니다.");
        }


        // 이미 좋아요가 되어 있는 경우 예외 처리
        if (likeRepository.findByArtistAndComment(comment.getArtist(), comment).isPresent()) {
            throw new DuplicateResourceException("팬 id: " + comment.getArtist().getArtistId() + "로 이미 좋아요가 눌러진 댓글 Id: " + comment.getId());
        }

        // like 객체 생성
        Like like = Like.builder()
                .comment(comment)
                .artist(comment.getArtist())
                .buildWithComment();

        likeRepository.save(like);
        commentRepository.addLikeCount(comment);
    }


    // feedPost comment에서 fan이 좋아요 취소
    @Transactional
    public void deleteFeedCommentFanLike(LikeRequestDto likeRequestDto) {
        Fans fans = fansRepository.findById(likeRequestDto.getFanId())
                .orElseThrow(() -> new NotFoundException("Could not find fan with id: " + likeRequestDto.getFanId()));

        Comment comment = commentRepository.findById(likeRequestDto.getCommentId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getCommentId() + "인 댓글을 찾을 수 없습니다."));


        Like like = likeRepository.findByFansAndComment(fans, comment)
                .orElseThrow(() -> new NotFoundException("Could not find like"));

        likeRepository.delete(like);
        commentRepository.subLikeCount(comment);
    }



    //     feedPost comment에서 artist가 좋아요 취소
    @Transactional
    public void deleteFeedCommentArtistLike(LikeRequestDto likeRequestDto) {
        Artist artist = artistRepository.findById(likeRequestDto.getArtistId())
                .orElseThrow(() -> new NotFoundException("Could not find artist with id: " + likeRequestDto.getArtistId()));

        FeedPost feedPost = feedPostRepository.findById(likeRequestDto.getFeedPostId())
                .orElseThrow(() -> new NotFoundException("Could not find feedPost with id: " + likeRequestDto.getFeedPostId()));

        Like like = likeRepository.findByArtistAndFeedPost(artist, feedPost)
                .orElseThrow(() -> new NotFoundException("Could not find like"));

        likeRepository.delete(like);
        feedPostRepository.subLikeCount(feedPost);
    }





    // artistPost fan이 comment 좋아요 취소
    @Transactional
    public void deleteArtistCommentFanLike(LikeRequestDto likeRequestDto) {
        Fans fans = fansRepository.findById(likeRequestDto.getFanId())
                .orElseThrow(() -> new NotFoundException("Could not find fan with id: " + likeRequestDto.getFanId()));

        Comment comment = commentRepository.findById(likeRequestDto.getCommentId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getCommentId() + "인 댓글을 찾을 수 없습니다."));

        Like like = likeRepository.findByFansAndComment(fans, comment)
                .orElseThrow(() -> new NotFoundException("Could not find like"));

        likeRepository.delete(like);
        commentRepository.subLikeCount(comment);
    }




    // artistPost artist가 comment 좋아요 취소

    @Transactional
    public void deleteArtistCommentArtistLike(LikeRequestDto likeRequestDto) {
        Artist artist = artistRepository.findById(likeRequestDto.getArtistId())
                .orElseThrow(() -> new NotFoundException("Could not find artist with id: " + likeRequestDto.getArtistId()));

        Comment comment = commentRepository.findById(likeRequestDto.getCommentId())
                .orElseThrow(() -> new NotFoundException("ID가 " + likeRequestDto.getCommentId() + "인 댓글을 찾을 수 없습니다."));


        Like like = likeRepository.findByArtistAndComment(artist, comment)
                .orElseThrow(() -> new NotFoundException("Could not find like"));

        likeRepository.delete(like);
        commentRepository.subLikeCount(comment);
    }

}
