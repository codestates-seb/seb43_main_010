package example.domain.artistPost.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.dto.artistPostDto;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.artistPost.mapper.artistPostMapper;
import example.domain.artistPost.repository.artistPostRepository;
import example.domain.artistPost.service.artistPostService;
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
@RequestMapping("/artists")
public class artistPostController {
        private artistPostMapper mapper;
        private ArtistRepository artistRepository;
        private artistPostService service;
        private artistPostRepository artistPostRepository;

        public artistPostController(artistPostMapper mapper, ArtistRepository artistRepository, artistPostService service, artistPostRepository artistPostRepository) {
            this.mapper = mapper;
            this.artistRepository = artistRepository;
            this.service = service;
            this.artistPostRepository = artistPostRepository;
        }

        @PostMapping("/ask")
        public ResponseEntity postArtistPost(@Valid @RequestBody artistPostDto.Post requestBody) {
            Artist artist = artistRepository.findById(requestBody.getArtistId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
            ArtistPost artistPost = mapper.artistPostDtoToArtist(requestBody, artist);
            ArtistPost saveArtistPost = service.createArtistPost(artistPost);
            return new ResponseEntity<>(mapper.artistToArtistResponseDto(saveArtistPost),
                    HttpStatus.OK);
        }


        // artist post 상세 조회
        @GetMapping("{artist-id}")
        public ResponseEntity getArtist(
                @PathVariable("artist-id") @Positive int artistPostId) {
            ArtistPost artistPost = service.findArtistPost(artistPostId);
            return new ResponseEntity<>(
                    new SingleResponseDto<>(mapper.artistToArtistResponseDto(artistPost)),
                    HttpStatus.OK);
        }


    // artistPost 리스트 조회(무한 스크롤)
    @GetMapping("/new_artistPost")
    public ResponseEntity getAllFeedPost(@RequestParam(defaultValue = "1") @Positive int page,
                                         @RequestParam(defaultValue = "16") @Positive int size) {
        Page<ArtistPost> artistPosts = service.findAllArtistPost(page -1, size);
        List<ArtistPost> list = artistPosts.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.artistPostsToArtistResponseDtos(list), artistPosts), HttpStatus.OK);
    }


        @DeleteMapping("/{artist_id}")
        public ResponseEntity deleteArtistPost(@PathVariable("artist_id") @Positive int artistPostId) {
            service.deleteArtistPost(artistPostId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

}
