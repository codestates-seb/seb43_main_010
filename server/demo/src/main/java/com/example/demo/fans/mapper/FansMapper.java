package com.example.demo.fans.mapper;

import com.example.demo.fans.dto.FansPostDto;
import com.example.demo.fans.dto.FansResponseDto;
import com.example.demo.fans.entity.Fans;
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

    default FansResponseDto fansToUserResponseDto(Fans fans) {
        FansResponseDto fansResponseDto = new FansResponseDto();
//        userResponseDto.setUserId(user.getUserId());
        //userResponseDto.setEmail(user.getEmail());
        //userResponseDto.setDisplayName(user.getDisplayName());
//        userResponseDto.setPassword(user.getPassword());
        //userResponseDto.setImage(user.getImage());
        //userResponseDto.setUserStatus(user.getUserStatus());

        return fansResponseDto;
    }
}