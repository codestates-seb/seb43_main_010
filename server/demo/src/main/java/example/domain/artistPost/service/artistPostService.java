package example.domain.artistPost.service;

import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.artistPost.repository.artistPostRepository;
import example.domain.feedPost.entity.FeedPost;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class artistPostService {
    private artistPostRepository artistPostRepository;

    public artistPostService(artistPostRepository artistPostRepository) {
        this.artistPostRepository = artistPostRepository;
    }

    public ArtistPost createArtistPost(ArtistPost artistPost) {
        return artistPostRepository.save(artistPost);
    }

    public ArtistPost findArtistPost(int artistId) {
        return artistPostRepository.findById(artistId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND));
    }


    public ArtistPost updateArtistPost(ArtistPost artistPost) {
        ArtistPost findArtistPost = findArtistPost(artistPost.getId());

        if (artistPost.getArtist().getId() != findArtistPost.getArtist().getId()) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_AUTHOR_NOT_MATCH);
        } else {
            Optional.ofNullable(artistPost.getContent()).ifPresent(content -> findArtistPost.setContent(content));
            Optional.ofNullable(artistPost.getImg()).ifPresent(img -> findArtistPost.setImg(img));
            findArtistPost.setCreatedAt(LocalDateTime.now());
        }

        return artistPostRepository.save(findArtistPost);
    }

    public void deleteArtistPost(Artist artist, ArtistPost artistPost) {
        ArtistPost findArtistPost = findArtistPost(artistPost.getId());
        if (artist.getId() != findArtistPost.getArtist().getId()) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_AUTHOR_NOT_MATCH);
        }
        artistPostRepository.delete(findArtistPost);
    }
}
/*
    public Page<ArtistPost> findArtistPosts(int groupId, int page, int size){
        Page<FeedPost> artistPosts = artistPostRepository.findAllByArtistGroupId(groupId, PageRequest.of(page, size, Sort.by("id").descending()));

        return artistPosts;
//        return artistPostRepository.findAll(PageRequest.of(page, size,Sort.by("id").descending()));
    }
}
/*
 */
