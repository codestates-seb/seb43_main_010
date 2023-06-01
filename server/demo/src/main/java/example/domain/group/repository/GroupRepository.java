package example.domain.group.repository;

import example.domain.artist.entity.Artist;
import example.domain.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    Optional<Group> findByGroupName(String groupName);
    Optional<Group> findById(Integer id);
    boolean existsByGroupName(String groupName);
}
