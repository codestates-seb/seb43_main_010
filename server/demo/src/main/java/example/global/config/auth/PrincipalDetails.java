package example.global.config.auth;

import example.domain.fans.entity.Fans;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.Collection;


public class PrincipalDetails implements UserDetails {
    private Fans fans;
    public PrincipalDetails(Fans fans){
        this.fans = fans;
    }
    public Fans getFans(){
        return fans;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(()->fans.getRole());
        return authorities;
    }
    @Override
    public String getPassword() {
        return fans.getPassword();
    }
    @Override
    public String getUsername() {
        return fans.getEmail();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
