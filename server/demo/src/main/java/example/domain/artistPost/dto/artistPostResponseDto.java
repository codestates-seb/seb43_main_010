package example.domain.artistPost.dto;

import example.domain.artist.dto.ArtistResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class artistPostResponseDto {
    private ArtistResponseDto artist;
    private Integer id; // artistPostId
    private String content;
    private String img;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
