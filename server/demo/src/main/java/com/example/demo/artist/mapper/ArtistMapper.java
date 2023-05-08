package com.example.demo.artist.mapper;

import com.example.demo.artist.dto.ArtistPostDto;
import com.example.demo.artist.dto.ArtistResponseDto;
import com.example.demo.artist.entity.Artist;
import org.mapstruct.Mapper;
import org.springframework.util.StringUtils;

@Mapper(componentModel = "spring")
public interface ArtistMapper {

    default Artist artistPostDtoToUser(ArtistPostDto artistPostDto) {
        Artist artist = new Artist();
        artist.setEmail(artistPostDto.getEmail());
        artist.setPassword(artistPostDto.getPassword());
        artist.setName(artistPostDto.getName());
        artist.setNickname(artistPostDto.getNickname());
        artist.setGroup(artistPostDto.getGroup());
        if (StringUtils.hasText(artistPostDto.getProfile())) {
            artist.setProfile(artistPostDto.getProfile());
        }
        return artist;
    }

    default ArtistResponseDto artistToArtistResponseDto(Artist artist) {
        ArtistResponseDto artistResponseDto = new ArtistResponseDto();
        return artistResponseDto;
    }
}