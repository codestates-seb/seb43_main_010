package example.domain.artistPost.service;

import example.domain.artistPost.entity.ArtistPost;
import example.domain.artistPost.repository.artistPostRepository;
import example.domain.feedPost.entity.FeedPost;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class artistPostService {
    private artistPostRepository artistPostRepository;

    public artistPostService(artistPostRepository artistPostRepository){
        this.artistPostRepository = artistPostRepository;
    }

    public ArtistPost createArtistPost(ArtistPost artistPost){
        return artistPostRepository.save(artistPost);
    }

    public ArtistPost findArtistPost(int artistId){
        return artistPostRepository.findById(artistId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND));
    }

    // 최신글 순으로 조회
    @Transactional(readOnly = true)
    public Page<ArtistPost> findAllArtistPost(int page, int size){
        Page<ArtistPost> artistPosts = artistPostRepository.findAll((PageRequest.of(page, size, Sort.by("artistPostId").descending())));

        return artistPosts;
    }

    public ArtistPost updateArtistPost(ArtistPost artistPost){
        ArtistPost findArtistPost = findArtistPost(artistPost.getId());

        if(artistPost.getArtist().getArtistId() != findArtistPost.getArtist().getArtistId()) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_AUTHOR_NOT_MATCH);
        }else{
            Optional.ofNullable(artistPost.getContent()).ifPresent(content -> findArtistPost.setContent(content));
            Optional.ofNullable(artistPost.getImg()).ifPresent(img -> findArtistPost.setImg(img));
            findArtistPost.setModifiedAt(LocalDateTime.now());
        }

        return artistPostRepository.save(findArtistPost);
    }

    public void deleteArtistPost(int artistId){
        ArtistPost findArtistPost = findArtistPost(artistId);
        artistPostRepository.delete(findArtistPost);
    }
}
