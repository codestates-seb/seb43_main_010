package com.example.demo.feedPost.repository;

import com.example.demo.feedPost.entity.feedPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface feedPostRepository extends JpaRepository<feedPost, Integer>, feedPostCustomRepository {

    List<feedPost> findFirst10ByOrderByIdDesc();
    List<feedPost> findByIdLessThanOrderByIdDesc(Long id, Pageable pageable);

//    feedPost findByTitle(String title);
}
