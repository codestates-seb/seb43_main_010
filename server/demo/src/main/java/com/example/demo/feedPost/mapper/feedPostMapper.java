package com.example.demo.feedPost.mapper;

import com.example.demo.feedPost.dto.feedPostDto;
import com.example.demo.feedPost.dto.feedPostResponseDto;
import com.example.demo.feedPost.entity.feedPost;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface feedPostMapper {
    // feedPostDto.Post -> feedPost
    feedPost feedPostDtoToFeed(feedPostDto.Post feedPostDto);

    // feedPost -> feedPostDto.Response
    feedPostResponseDto feedToFeedResponseDto(feedPost feedPost);

    // feedPostDto.Patch -> feedPost
    feedPost feedPatchDtoToFeed(feedPostDto.Patch feedPatchDto);
}
