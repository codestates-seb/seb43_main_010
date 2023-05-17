package example.domain.comment.service;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.entity.Comment;
import example.domain.comment.repository.CommentRepository;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.feedPost.entity.FeedPost;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;

    public CommentService(CommentRepository commentRepository,FansRepository fansRepository, ArtistRepository artistRepository){
        this.commentRepository = commentRepository;
        this.fansRepository = fansRepository;
        this.artistRepository = artistRepository;
    }

    /*
    < 댓글 등록>
     */
    public Comment createComment(Comment comment) {

        return commentRepository.save(comment);
    }

    public Comment findVerifiedComment(int commentId){ // 요청된 댓글이 DB에 없으면 에러
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    public List<Comment> findVerifiedComments(int feedPostId){ // 요청된 댓글이 DB에 없으면 에러
        List<Comment> optionalComments = commentRepository.findAllByFeedPostId(feedPostId);
        return optionalComments;
    }

    // feedPost 댓글 (무한 스크롤)
    @Transactional(readOnly = true)
    public Page<Comment> findAllCommentsByFeedPostId(int feedPostId, int page, int size){
        Page<Comment> fanComments = commentRepository.findAllByFeedPostId(feedPostId, PageRequest.of(page, size, Sort.by("id").descending()));

        return fanComments;
    }

    // artistPost 댓글 (무한 스크롤)
    @Transactional(readOnly = true)
    public Page<Comment> findAllCommentsByArtistPostId(int artistPostId, int page, int size){
        Page<Comment> artistComments = commentRepository.findAllByArtistPostId(artistPostId, PageRequest.of(page, size, Sort.by("id").descending()));

        return artistComments;
    }


    public Comment updateComment(int commentId, Comment comment) {
        Comment findComment = findVerifiedComment(commentId);

        if (comment.getFans() != null && comment.getFans().getId() != findComment.getFans().getId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
        }

        if (comment.getArtist() != null && comment.getArtist().getId() != findComment.getArtist().getId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
        }

        Optional.ofNullable(comment.getContent())
                .ifPresent(commentContent -> findComment.setContent(commentContent));
        Optional.ofNullable(comment.getFeedPost())
                .ifPresent(commentFeedPost -> findComment.setFeedPost(commentFeedPost));
        Optional.ofNullable(comment.getCreatedAt())
                .ifPresent(commentCreatedAt -> findComment.setCreatedAt(commentCreatedAt));

        return commentRepository.save(findComment);
    }

//    public Comment updateFanComment(int commentId, Comment comment){
//        Comment findComment = findVerifiedComment(commentId);
//        if(comment.getFans().getId() != findComment.getFans().getId()) {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//        }else{
//            Optional.ofNullable(comment.getContent()) // 내용 수정
//                    .ifPresent(commentContent -> findComment.setContent(commentContent));
//            Optional.ofNullable(comment.getFeedPost())
//                    .ifPresent(commentFeedPost -> findComment.setFeedPost(commentFeedPost));
//            Optional.ofNullable(comment.getCreatedAt())
//                    .ifPresent(commentCreatedAt -> findComment.setCreatedAt(commentCreatedAt)); // 업데이트 날짜 수정
//
//            return commentRepository.save(findComment);
//        }
//    }
//
//    public Comment updateArtistComment(int commentId, Comment comment){
//        Comment findComment = findVerifiedComment(commentId);
//        if(comment.getArtist().getId() != findComment.getArtist().getId()) {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//        }else{
//            Optional.ofNullable(comment.getContent()) // 내용 수정
//                    .ifPresent(commentContent -> findComment.setContent(commentContent));
//            Optional.ofNullable(comment.getFeedPost())
//                    .ifPresent(commentFeedPost -> findComment.setFeedPost(commentFeedPost));
//            Optional.ofNullable(comment.getCreatedAt())
//                    .ifPresent(commentCreatedAt -> findComment.setCreatedAt(commentCreatedAt)); // 업데이트 날짜 수정
//
//            return commentRepository.save(findComment);
//        }
//    }

//    public void deleteFeedPostComment(FeedPost feedPost, int commentId, String userEmail) {
//        Comment findComment = findVerifiedComment(commentId);
//        String commentAuthorEmail = findComment.getFans().getEmail();
//        if (feedPost.getFans().getId() != findComment.getFans().getId() || feedPost.getArtist().getId() != findComment.getArtist().getId()
//                || !commentAuthorEmail.equals(userEmail)) {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//        }
//        commentRepository.delete(findComment);
//    }

    public void deleteFeedPostComment(FeedPost feedPost, int commentId){
        Comment findComment = findVerifiedComment(commentId);
        if(feedPost.getFans().getId() != findComment.getFans().getId() && feedPost.getArtist().getId() != findComment.getArtist().getId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
        }
        commentRepository.delete(findComment);
    }


//    public void deleteArtistPostComment(ArtistPost artistPost, int commentId, String userEmail) {
//        Comment findComment = findVerifiedComment(commentId);
//        String commentAuthorEmail = findComment.getFans().getEmail();
//        if (artistPost.getFans().getId() != findComment.getFans().getId() || artistPost.getArtist().getId() != findComment.getArtist().getId()
//                || !commentAuthorEmail.equals(userEmail)) {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
//        }
//        commentRepository.delete(findComment);
//    }


    public void deleteArtistPostComment(ArtistPost artistPost, int commentId){
        Comment findComment = findVerifiedComment(commentId);
        if(artistPost.getFans().getId() != findComment.getFans().getId() || artistPost.getArtist().getId() != findComment.getArtist().getId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
        }
        commentRepository.delete(findComment);
    }

    public Fans findFansByEmail(String email) {
        return fansRepository.findByEmail(email).orElse(null);
    }

    public Artist findArtistByEmail(String email) {
        return artistRepository.findByEmail(email).orElse(null);
    }
}
