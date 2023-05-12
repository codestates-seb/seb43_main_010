package example.domain.fans.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FansResponseDto {
    private int id;
    private String email;
    private String nickname;
    private String role;

}
