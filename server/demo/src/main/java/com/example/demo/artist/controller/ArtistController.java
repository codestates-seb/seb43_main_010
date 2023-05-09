package com.example.demo.artist.controller;

import com.example.demo.artist.dto.ArtistPostDto;
import com.example.demo.artist.entity.Artist;
import com.example.demo.artist.mapper.ArtistMapper;
import com.example.demo.artist.service.ArtistService;
import com.example.demo.response.SingleResponseDto;
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
        Artist artist = mapper.artistPostDtoToUser(artistDto);
        Artist createdArtist = artistService.createArtist(artist);
        return new ResponseEntity<>(new SingleResponseDto<>("아티스트 회원가입 성공!"), HttpStatus.CREATED);
    }
}
