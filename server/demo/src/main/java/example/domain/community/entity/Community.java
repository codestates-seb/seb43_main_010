package example.domain.community.entity;

import example.domain.fans.entity.Fans;
import example.domain.group.entity.Group;
import example.global.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "COMMUNITY")
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer communityId;

    @Column
    private String groupName;

    @Column
    private Integer fanId;

    @ManyToOne
    @JoinColumn(name = "FANS_ID")
    private Fans fans;

    public void addFans(Fans fans) {
        this.fans = fans;
    }
}
