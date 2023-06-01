package example.global.config.auth;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Fans> fansEntity  = fansRepository.findByEmail(email);
        User user = new User();
        if(fansEntity.isPresent()){
            Fans fans=fansEntity.get();
            user.setEmail(fans.getEmail());
            user.setPassword(fans.getPassword());
            user.setRole(fans.getRole());
        }
        else{
            Optional<Artist> artistEntity  = artistRepository.findByEmail(email);
            if(artistEntity.isPresent()){
                Artist artist=artistEntity.get();
                user.setEmail(artist.getEmail());
                user.setPassword(artist.getPassword());
                user.setRole(artist.getRole());
            }
            else return new PrincipalDetails(null);
        }
        return new PrincipalDetails(user);
    }
}
