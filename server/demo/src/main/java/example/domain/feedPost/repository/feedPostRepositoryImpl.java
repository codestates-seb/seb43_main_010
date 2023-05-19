package example.domain.feedPost.repository;

import example.domain.feedPost.entity.FeedPost;
import example.domain.feedPost.entity.QFeedPost;
import example.domain.feedPost.repository.feedPostCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;


@RequiredArgsConstructor
@Repository
public class feedPostRepositoryImpl implements feedPostCustomRepository {

    private final EntityManager entityManager;
    private final JPAQueryFactory queryFactory;
    @Override
    public void addLikeCount(FeedPost selectedFeedPost) {
        QFeedPost qFeedPost = QFeedPost.feedPost;
        queryFactory.update(qFeedPost)
                .set(qFeedPost.likeCount, qFeedPost.likeCount.add(1))
                .where(qFeedPost.eq(selectedFeedPost))
                .execute();
    }

    @Override
    public void subLikeCount(FeedPost selectedFeedPost) {
        QFeedPost qFeedPost = QFeedPost.feedPost;
        queryFactory.update(qFeedPost)
                .set(qFeedPost.likeCount, qFeedPost.likeCount.subtract(1))
                .where(qFeedPost.eq(selectedFeedPost))
                .execute();
    }
}
