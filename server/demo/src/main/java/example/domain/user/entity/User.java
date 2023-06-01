package example.domain.user.entity;

import example.global.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(nullable = false, updatable = false,unique = true,columnDefinition = "VARCHAR(30)")
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String role;
}