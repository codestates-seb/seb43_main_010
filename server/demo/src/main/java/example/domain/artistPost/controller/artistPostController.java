package example.domain.artistPost.controller;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.artistPost.dto.artistPostDto;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.artistPost.mapper.artistPostMapper;
import example.domain.artistPost.service.artistPostService;
import example.domain.group.entity.Group;
import example.domain.group.repository.GroupRepository;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.global.response.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import example.domain.group.repository.GroupRepository;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/artist")
public class artistPostController {
    private artistPostMapper mapper;
    private ArtistRepository artistRepository;
    private artistPostService service;
    private GroupRepository groupRepository;

    public artistPostController(artistPostMapper mapper, ArtistRepository artistRepository, artistPostService service, GroupRepository groupRepository) {
        this.mapper = mapper;
        this.artistRepository = artistRepository;
        this.service = service;
        this.groupRepository = groupRepository;
    }

    // artistPost 등록
    @PostMapping("/{groupId}")
    public ResponseEntity postArtistPost(@PathVariable("groupId") @Positive int groupId,
                                        @Valid @RequestBody artistPostDto.Post requestBody) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));

        ArtistPost artistPost = mapper.artistPostDtoToArtist(requestBody, artist);
        artistPost.setGroup(group);

        ArtistPost savedArtistPost = service.createArtistPost(artistPost);

        ArtistPost saveArtistPost = service.createArtistPost(artistPost);
        return new ResponseEntity<>(mapper.artistToArtistResponseDto(saveArtistPost),
                HttpStatus.OK);
    }


    // artistPost 상세 조회
    @GetMapping("/{groupId}/{artistPostId}")
    public ResponseEntity getArtist(@PathVariable("groupId") @Positive int groupId,
                                    @PathVariable("artistPostId") @Positive int artistPostId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        ArtistPost artistPost = service.findArtistPost(artistPostId);

        if (artistPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND);
        }

        return new ResponseEntity<>(mapper.artistToArtistResponseDto(artistPost),
                HttpStatus.OK);
    }



    // artistPost 수정
    @PatchMapping("/{groupId}/{artistPostId}")
    public ResponseEntity patchArtistPost(@PathVariable("groupId") @Positive int groupId,
                                        @PathVariable("artistPostId") @Positive int artistPostId,
                                        @Valid @RequestBody artistPostDto.Patch requestBody) {
        ArtistPost findArtistPost = service.findArtistPost(artistPostId);
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (findArtistPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND);
        }

        ArtistPost artistPost = mapper.artistPatchDtoToArtist(findArtistPost, requestBody, artist);
        artistPost.setGroup(group);


        ArtistPost updateArtistPost = service.updateArtistPost(artistPost);

        return new ResponseEntity<>(mapper.artistToArtistResponseDto(updateArtistPost), HttpStatus.OK);
    }


    // artistPost 삭제
    @DeleteMapping("/{groupId}/{artistPostId}")
    public ResponseEntity deleteArtistPost(@PathVariable("groupId") @Positive int groupId,
                                         @PathVariable("artistPostId") @Positive int artistPostId,
                                         @Valid @RequestBody artistPostDto.Delete requestBody) {
        Artist artist = artistRepository.findById(requestBody.getArtistId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        if (group.getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND);
        }

        ArtistPost findArtistPost = service.findArtistPost(artistPostId);


        if (findArtistPost.getGroup().getId() != groupId) {
            throw new BusinessLogicException(ExceptionCode.ARTISTPOST_NOT_FOUND);
        }

        service.deleteArtistPost(artist, findArtistPost);
        return ResponseEntity.ok("artistPost 게시글 삭제 성공");
    }




    // artistPost 리스트 조회(무한 스크롤)
    @GetMapping("/{groupId}")
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
