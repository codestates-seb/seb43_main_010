package com.example.demo.like.repository;

import com.example.demo.fans.entity.Fans;
import com.example.demo.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.feedPost.entity.feedPost;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByFansAndfeedPost(Fans fans, feedPost feedpost);

}
