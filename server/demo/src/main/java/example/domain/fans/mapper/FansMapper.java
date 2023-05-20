package example.domain.fans.mapper;

import example.domain.fans.dto.FansPostDto;
import example.domain.fans.dto.FansResponseDto;
import example.domain.fans.entity.Fans;
import org.mapstruct.Mapper;
import org.springframework.util.StringUtils;

@Mapper(componentModel = "spring")
public interface FansMapper {

    default Fans fansPostDtoToFans(FansPostDto fansPostDto) {
        Fans fans = new Fans();
        fans.setEmail(fansPostDto.getEmail());
        fans.setPassword(fansPostDto.getPassword());
        fans.setName(fansPostDto.getName());
        fans.setNickname(fansPostDto.getNickname());
        if (StringUtils.hasText(fansPostDto.getProfile())) {
            fans.setProfile(fansPostDto.getProfile());
        }
        return fans;
    }

    default FansResponseDto fansToFansResponseDto(Fans fans) {
        FansResponseDto fansResponseDto = new FansResponseDto();
        fansResponseDto.setFanId(fans.getFanId());
        fansResponseDto.setEmail(fans.getEmail());
        fansResponseDto.setName(fans.getName());
        fansResponseDto.setNickname(fans.getNickname());
        fansResponseDto.setProfile(fans.getProfile());
        return fansResponseDto;
    }
}