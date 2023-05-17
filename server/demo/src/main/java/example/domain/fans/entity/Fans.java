package example.domain.fans.entity;

import example.domain.artist.entity.Artist;
import example.domain.group.entity.Group;
import example.global.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import javax.persistence.Id;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "FANS")
public class Fans extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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
    private List<Group> community;
    public void addCommunity(Group group) {
        community.add(group);
    }

    @Column
    private String role="USER";

    public Fans(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}