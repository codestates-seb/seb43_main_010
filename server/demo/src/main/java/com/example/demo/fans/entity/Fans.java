package com.example.demo.fans.entity;

import com.example.demo.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "FANS")
public class Fans extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;


    @Column(nullable = false, updatable = false,unique = true,columnDefinition = "VARCHAR(30)")
    private String email;

    @Column(nullable = false,columnDefinition = "VARCHAR(15)")
    private String password;

    @Column(nullable = false,columnDefinition = "VARCHAR(20)")
    private String name;

    @Column(nullable = false,columnDefinition = "VARCHAR(20)")
    private String nickname;

    @Column(nullable = true)
    private String profile = "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800";

    @Column(nullable = true)
    private String community;

    @Column
    private String role="USER";

    public Fans(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}