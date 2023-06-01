package example.global.config.jwt;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.user.entity.User;
import example.global.config.auth.PrincipalDetails;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private FansRepository fansRepository;
    private ArtistRepository artistRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,
                                  FansRepository fansRepository ,ArtistRepository artistRepository) {
        super(authenticationManager);
        this.fansRepository = fansRepository;
        this.artistRepository = artistRepository;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);
        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        String token = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
        String email = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token).getClaim("email").asString();
        if (email != null) {
            User user = new User();
            Optional<Fans> fansEntity  = fansRepository.findByEmail(email);
            Optional<Artist> artistEntity = artistRepository.findByEmail(email);
            if(fansEntity.isPresent()){
                Fans fans=fansEntity.get();
                user.setEmail(fans.getEmail());
                user.setPassword(fans.getPassword());
                user.setRole(fans.getRole());
            }
            if(artistEntity.isPresent()){
                Artist artist=artistEntity.get();
                user.setEmail(artist.getEmail());
                user.setPassword(artist.getPassword());
                user.setRole(artist.getRole());
            }

            PrincipalDetails principalDetails = new PrincipalDetails(user);
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}
