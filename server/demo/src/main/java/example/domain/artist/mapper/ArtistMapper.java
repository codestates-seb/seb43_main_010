package example.domain.artist.mapper;

import example.domain.artist.dto.ArtistPostDto;
import example.domain.artist.dto.ArtistResponseDto;
import example.domain.artist.entity.Artist;
import example.domain.group.repository.GroupRepository;
import org.mapstruct.Mapper;
import org.springframework.util.StringUtils;

import java.util.Optional;

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
        if (StringUtils.hasText(artistPostDto.getGroupProfile())) {
            artist.setGroupProfile(artistPostDto.getGroupProfile());
        }
        return artist;
    }

    default ArtistResponseDto artistToArtistResponseDto(Artist artist, String group_profile) {
        ArtistResponseDto artistResponseDto = new ArtistResponseDto();
        artistResponseDto.setEmail(artist.getEmail());
        artistResponseDto.setName(artist.getName());
        artistResponseDto.setNickname(artist.getNickname());
        artistResponseDto.setGroup(artist.getGroup());
        if(StringUtils.hasText(artist.getProfile())){
            artistResponseDto.setProfile(artist.getProfile());
        }
        if(StringUtils.hasText(group_profile)){
            artistResponseDto.setProfile(group_profile);
        }
        return artistResponseDto;
    }
}