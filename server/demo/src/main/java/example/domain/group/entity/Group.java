package example.domain.group.entity;

import example.domain.artist.entity.Artist;
import example.global.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "GROUPS")
public class Group extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "groups")
    private List<Artist> artists;

    public void addArtist(Artist artist) {
        artists.add(artist);
    }

    @Column(nullable = false,columnDefinition = "VARCHAR(20)")
    private String groupName;

    @Column
    @Lob
    private String profile;



}
