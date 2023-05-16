package example.domain.user.service;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import example.domain.user.entity.User;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService {
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;

    public UserService(FansRepository fansRepository, ArtistRepository artistRepository){
        this.fansRepository = fansRepository;
        this.artistRepository = artistRepository;
    }

    public void checkFans(User user) {
        verifyExistsEmail(user.getEmail());
    }
    private void verifyExistsEmail(String email) {
        Optional<Fans> fans = fansRepository.findByEmail(email);
        Optional<Artist> artist = artistRepository.findByEmail(email);
        if (fans.isPresent()) throw new BusinessLogicException(ExceptionCode.FANS_EXISTS);
        if (artist.isPresent()) throw new BusinessLogicException(ExceptionCode.ARTIST_EXISTS);
    }
}
