package example.domain.artistPost.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.dto.artistPostDto;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.artistPost.mapper.artistPostMapper;
import example.domain.artistPost.repository.artistPostRepository;
import example.domain.artistPost.service.artistPostService;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.global.response.SingleResponseDto;
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


        // artist post 리스트 조회(무한 스크롤)
        @GetMapping("/{group_id}")
        public ResponseEntity<List<ArtistPost>> getArtists(@RequestParam(value = "lastId", required = false) Long lastId) {
            int pageSize = 10; // 한 페이지에 보여줄 데이터의 양
            List<ArtistPost> artistPosts;
            if (lastId == null) {
                artistPosts = artistPostRepository.findFirst10ByOrderByIdDesc(); // 마지막 10개의 피드 게시물 반환
            } else {
                artistPosts = artistPostRepository.findByIdLessThanOrderByIdDesc(lastId, PageRequest.of(0, pageSize)); // 마지막 id보다 작은 항목 반환
            }
            return ResponseEntity.ok(artistPosts);
        }


        @DeleteMapping("/{artist_id}")
        public ResponseEntity deleteArtistPost(@PathVariable("artist_id") @Positive int artistPostId) {
            service.deleteArtistPost(artistPostId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

}
