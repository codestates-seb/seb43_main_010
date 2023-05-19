package example.domain.artistPost.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.artistPost.entity.QArtistPost;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@RequiredArgsConstructor
@Repository
public class artistPostRepositoryImpl implements artistPostCustomRepository{

    private final EntityManager entityManager;
    private final JPAQueryFactory queryFactory;
    @Override
    public void addLikeCount(ArtistPost selectedArtistPost) {
        QArtistPost qArtistPost = QArtistPost.artistPost;
        queryFactory.update(qArtistPost)
                .set(qArtistPost.likeCount, qArtistPost.likeCount.add(1))
                .where(qArtistPost.eq(selectedArtistPost))
                .execute();
    }

    @Override
    public void subLikeCount(ArtistPost selectedArtistPost) {
        QArtistPost qArtistPost = QArtistPost.artistPost;
        queryFactory.update(qArtistPost)
                .set(qArtistPost.likeCount, qArtistPost.likeCount.subtract(1))
                .where(qArtistPost.eq(selectedArtistPost))
                .execute();
    }
}