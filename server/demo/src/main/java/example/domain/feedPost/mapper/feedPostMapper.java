package example.domain.feedPost.mapper;

import example.domain.feedPost.dto.feedPostDto;
import example.domain.feedPost.dto.feedPostResponseDto;
import example.domain.feedPost.entity.feedPost;
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
