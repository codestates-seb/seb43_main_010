package example.domain.community.repository;

import example.domain.artist.entity.Artist;
import example.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
    List<Community> findByFanId(Integer fanId);

    List<Community> findByGroupName(String groupName);

    boolean existsByGroupName(String groupName);
}
