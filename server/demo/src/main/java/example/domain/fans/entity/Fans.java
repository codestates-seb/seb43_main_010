package example.domain.fans.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import example.domain.artist.entity.Artist;
import example.domain.community.entity.Community;
import example.domain.group.entity.Group;
import example.global.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "FANS")
public class Fans extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer FanId;

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
    @JsonIgnore
    @OneToMany(mappedBy = "fans")
    private List<Community> communitys=new ArrayList<>();

    public void addCommunity(Community community) {
        communitys.add(community);
    }

    //@Column
    //private String community;
    @Column
    private String role="USER";

    public Fans(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}