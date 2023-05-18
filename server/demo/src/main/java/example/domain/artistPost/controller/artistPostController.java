package example.domain.artistPost.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.dto.artistPostDto;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.artistPost.mapper.artistPostMapper;
import example.domain.artistPost.service.artistPostService;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

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
        return new ResponseEntity<>(mapper.artistToArtistResponseDto(saveArtistPost),
                HttpStatus.OK);
    }


    // artistPost 상세 조회
    @GetMapping("/{artistPostId}")
    public ResponseEntity getArtist(@PathVariable("artistPostId") @Positive int artistPostId) {
        ArtistPost artistPost = service.findArtistPost(artistPostId);
        return new ResponseEntity<>(mapper.artistToArtistResponseDto(artistPost),
                HttpStatus.OK);
    }


    // artistPost 수정
    @PatchMapping("/{artistPostId}")
    public ResponseEntity patchArtistPost(@PathVariable("artistPostId") @Positive int artistPostId,
                                        @Valid @RequestBody artistPostDto.Patch requestBody) {
        ArtistPost findArtistPost = service.findArtistPost(artistPostId);
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        ArtistPost artistPost = mapper.artistPatchDtoToArtist(findArtistPost, requestBody, artist);
        ArtistPost updateArtistPost = service.updateArtistPost(artistPost);

        return new ResponseEntity<>(mapper.artistToArtistResponseDto(updateArtistPost), HttpStatus.OK);
    }


    @DeleteMapping("/{artistPostId}")
    public ResponseEntity<String> deleteArtistPost(@PathVariable("artistPostId") @Positive int artistPostId,
                                                @Valid @RequestBody artistPostDto.Delete requestBody) {
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        ArtistPost findArtistPost = service.findArtistPost(artistPostId);
        try {
            service.deleteArtistPost(artist, findArtistPost);
            return ResponseEntity.ok("삭제 성공");
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.DELETE_FAILE);
        }
    }
}


//    // artistPost 삭제 (메세지 x) 잘동 잘됨
//    @DeleteMapping("/{artistPostId}")
//    public ResponseEntity deleteArtistPost(@PathVariable("artistPostId") @Positive int artistPostId,
//                                         @Valid @RequestBody artistPostDto.Delete requestBody) {
//        Artist artist = artistRepository.findById(requestBody.getArtistId())
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
//        ArtistPost findArtistPost = service.findArtistPost(artistPostId);
//        service.deleteArtistPost(artist, findArtistPost);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//}


/*
    // artistPost 리스트 조회(무한 스크롤)
    @GetMapping("{groupId}")
    public ResponseEntity getArtistPosts(@PathVariable("groupId") int groupId,
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