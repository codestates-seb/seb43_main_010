package example.domain.artist.entity;

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
    private String profile = "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800";

    @Column(name = "\"group\"", nullable = false)
    private String group;

    @Column
    private String role="ARTIST";

}