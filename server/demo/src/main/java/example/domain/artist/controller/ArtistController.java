package example.domain.artist.controller;

import example.domain.artist.dto.ArtistPostDto;
import example.domain.artist.entity.Artist;
import example.domain.artist.mapper.ArtistMapper;
import example.domain.artist.service.ArtistService;
import example.global.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping
@Validated
@Slf4j
public class ArtistController {

    private ArtistService artistService;
    private ArtistMapper mapper;

    public ArtistController(ArtistService artistService, ArtistMapper mapper) {
        this.artistService = artistService;
        this.mapper = mapper;
    }

    @PostMapping("/signup/artist")
    public ResponseEntity postArtist(@Valid @RequestBody ArtistPostDto artistDto) {
        Artist artist = mapper.artistPostDtoToArtist(artistDto);
        Artist createdArtist = artistService.createArtist(artist);
        return new ResponseEntity<>(new SingleResponseDto<>("아티스트 회원가입 성공!"), HttpStatus.CREATED);
    }
}
