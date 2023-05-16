package example.domain.artistPost.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.dto.artistPostDto;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.artistPost.mapper.artistPostMapper;
import example.domain.artistPost.repository.artistPostRepository;
import example.domain.artistPost.service.artistPostService;
import example.domain.fans.entity.Fans;
import example.domain.feedPost.dto.feedPostDto;
import example.domain.feedPost.entity.FeedPost;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.global.response.MultiResponseDto;
import example.global.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/artist")
public class artistPostController {
    private artistPostMapper mapper;
    private ArtistRepository artistRepository;
    private artistPostService service;

    public artistPostController(artistPostMapper mapper, ArtistRepository artistRepository, artistPostService service) {
        this.mapper = mapper;
        this.artistRepository = artistRepository;
        this.service = service;
    }

    // artistPost 등록
    @PostMapping
    public ResponseEntity postArtistPost(@Valid @RequestBody artistPostDto.Post requestBody) {
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        ArtistPost artistPost = mapper.artistPostDtoToArtist(requestBody, artist);
        ArtistPost saveArtistPost = service.createArtistPost(artistPost);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.artistToArtistResponseDto(saveArtistPost)),
                HttpStatus.OK);
    }


    // artistPost 상세 조회
    @GetMapping("/{artistPostId}")
    public ResponseEntity getArtist(@PathVariable("artistPostId") @Positive int artistPostId) {
        ArtistPost artistPost = service.findArtistPost(artistPostId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.artistToArtistResponseDto(artistPost)),
                HttpStatus.OK);
    }


    // artistPost 수정
    @PatchMapping("/{artistPostId}")
    public ResponseEntity patchFeedPost(@PathVariable("artistPostId") @Positive int artistPostId,
                                        @Valid @RequestBody artistPostDto.Patch requestBody) {
        ArtistPost findArtistPost = service.findArtistPost(artistPostId);
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        ArtistPost artistPost = mapper.artistPatchDtoToArtist(findArtistPost, requestBody, artist);
        ArtistPost updateArtistPost = service.updateArtistPost(artistPost);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.artistToArtistResponseDto(updateArtistPost)), HttpStatus.OK);
    }


    // artistPost 삭제
    @DeleteMapping("/{artistPostId}")
    public ResponseEntity deleteFeedPost(@PathVariable("artistPostId") @Positive int artistPostId,
                                         @Valid @RequestBody feedPostDto.Delete requestBody) {
        Artist artist = artistRepository.findById(requestBody.getFanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        ArtistPost findArtistPost = service.findArtistPost(artistPostId);
        service.deleteArtistPost(artist, findArtistPost);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


/*
    // artistPost 리스트 조회(무한 스크롤)
    @GetMapping("{groupId}")
    public ResponseEntity getFeedPosts(@PathVariable("groupId") int groupId,
                                       @Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<ArtistPost> pageArtistPosts = service.findArtistPosts(groupId,page -1, size);
        List<ArtistPost> artistPosts = pageArtistPosts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        mapper.artistPostsToArtistResponseDtos(artistPosts), pageArtistPosts), HttpStatus.OK);
    }

}
*/