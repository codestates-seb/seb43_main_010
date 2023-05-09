package example.domain.artist.service;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArtistService {
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public ArtistService(FansRepository fansRepository, ArtistRepository artistRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.fansRepository = fansRepository;
        this.artistRepository = artistRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public Artist createArtist(Artist artist) {
        verifyExistsEmail(artist.getEmail());
        artist.setPassword(bCryptPasswordEncoder.encode(artist.getPassword()));
        return artistRepository.save(artist);
    }
    private void verifyExistsEmail(String email) {
        Optional<Fans> fans = fansRepository.findByEmail(email);
        Optional<Artist> artist = artistRepository.findByEmail(email);
        if (fans.isPresent()) throw new BusinessLogicException(ExceptionCode.FANS_EXISTS);
        if (artist.isPresent()) throw new BusinessLogicException(ExceptionCode.ARTIST_EXISTS);
    }
}
