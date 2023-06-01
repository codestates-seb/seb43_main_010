package example.domain.userDetails.dto;

import javax.validation.constraints.NotBlank;

public class UserDetailsPostDto {
    private @NotBlank String nickname;
    private String profile;

    public String getNickname() {
        return this.nickname;
    }

    public String getProfile() {
        return this.profile;
    }

    public void setNickname(final String nickname) {
        this.nickname = nickname;
    }

    public void setProfile(final String profile) {
        this.profile = profile;
    }

    public UserDetailsPostDto(final String nickname, final String profile) {
        this.nickname = nickname;
        this.profile = profile;
    }

    public UserDetailsPostDto() {
    }
}
