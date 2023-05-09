package example.domain.feedPost.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

public class feedPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedId;
    @Column(length = 100, nullable = false)
    private String content;
    private String img;
    @CreatedDate
    @Column(name = "created_at", updatable = false) // 한번 생성되면 업데이트 수정x
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate // 자동으로 업데이트
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    /*
    user 받아와야 사용 가능 (FK)
    @ManyToOne
    @JoinColume(name = "USER_ID")
    private User user;
     */

    /*
    like, comment 매핑 전

    private feedLike feedLike;

    private int feedComment feedComment;

     */
}
