package example.domain.comment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import example.domain.comment.entity.Comment;
import example.domain.comment.entity.QComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@RequiredArgsConstructor
@Repository
public class commentRepositoryImpl implements commentCustomRepository{

    private final EntityManager entityManager;
    private final JPAQueryFactory queryFactory;

    @Override
    public void addLikeCount(Comment selectedComment) {
        QComment qComment = QComment.comment;
        queryFactory.update(qComment)
                .set(qComment.likeCount, qComment.likeCount.add(1))
                .where(qComment.eq(selectedComment))
                .execute();
    }

    @Override
    public void subLikeCount(Comment selectedComment) {
        QComment qComment = QComment.comment;
        queryFactory.update(qComment)
                .set(qComment.likeCount, qComment.likeCount.subtract(1))
                .where(qComment.eq(selectedComment))
                .execute();
    }
}
