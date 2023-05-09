//package com.example.demo.feedPost.repository;
//
//import com.example.demo.feedPost.entity.feedPost;
//import com.example.demo.feedPost.entity.QfeedPost;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Repository;
//
//@RequiredArgsConstructor
//@Repository
//public class feedPostRepositoryImpl implements feedPostCustomRepository{
//
//    private final JPAQueryFactory queryFactory;
//    @Override
//    public void addLikeCount(feedPost selectedFeedPost) {
//        queryFactory.update(feedPost)
//                .set(feedPost.likeCount, feedPost.likeCount.add(1))
//                .where(feedPost.eq(selectedFeedPost))
//                .execute(); // 쿼리를 실행하여 레코드 수정
//    }
//
//    @Override
//    public void subLikeCount(feedPost selectedFeedPost) {
//        queryFactory.update(feedPost)
//                .set(feedPost.likeCount, feedPost.likeCount.subtract(1))
//                .where(feedPost.eq(selectedFeedPost))
//                .execute();
//    }
//}
