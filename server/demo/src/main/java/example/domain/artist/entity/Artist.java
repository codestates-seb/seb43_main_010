package example.domain.artist.entity;

import example.domain.group.entity.Group;
import example.global.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.Id;
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "ARTIST")
public class Artist extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer artistId;


    @Column(nullable = false, updatable = false,unique = true,columnDefinition = "VARCHAR(30)")
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false,columnDefinition = "VARCHAR(20)")
    private String name;

    @Column(nullable = false,columnDefinition = "VARCHAR(20)")
    private String nickname;

    @Column
    @Lob
    private String profile;

    @Column
    @Lob
    private String groupProfile;

    @Column(name = "\"GROUP\"", nullable = false)
    private String group;

    @ManyToOne
    @JoinColumn(name = "GROUP_ID")
    private Group groups;

    public void addGroup(Group groups) {
        this.groups = groups;
    }

    @Column
    private String role="ARTIST";

}