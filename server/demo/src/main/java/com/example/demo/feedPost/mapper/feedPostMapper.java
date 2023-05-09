package com.example.demo.feedPost.mapper;

import com.example.demo.fans.entity.Fans;
import com.example.demo.feedPost.dto.feedPostDto;
import com.example.demo.feedPost.dto.feedPostResponseDto;
import com.example.demo.feedPost.entity.feedPost;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface feedPostMapper {
    // feedPostDto.Post -> feedPost
    default feedPost feedPostDtoToFeed(feedPostDto.Post requestBody, Fans fans){
        feedPost feedPost = new feedPost(requestBody.getContent(), requestBody.getImg(), fans);
        return feedPost;
    }

    // feedPost -> feedPostDto.Response
    feedPostResponseDto feedToFeedResponseDto(feedPost feedPost);
    List<feedPostResponseDto> feedPostsToFeedResponseDtos(List<feedPost> feedPosts);

    // feedPostDto.Patch -> feedPost
    default feedPost feedPatchDtoToFeed(feedPostDto.Patch requestBody, Fans fans){
        feedPost feedPost = new feedPost(requestBody.getContent(), requestBody.getImg(), fans);
        feedPost.setId(requestBody.getFeedPostId());
        return feedPost;
    }
}
