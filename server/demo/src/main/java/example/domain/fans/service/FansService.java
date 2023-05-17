package example.domain.fans.service;

import example.domain.artist.repository.ArtistRepository;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import example.domain.fans.entity.Fans;
import example.domain.fans.repository.FansRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service
public class FansService {
    private final FansRepository fansRepository;
    private final ArtistRepository artistRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public FansService(FansRepository fansRepository,ArtistRepository artistRepository,BCryptPasswordEncoder bCryptPasswordEncoder){
        this.fansRepository = fansRepository;
        this.artistRepository = artistRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Fans createFans(Fans fans) {
        verifyExistsEmail(fans.getEmail());
        fans.setPassword(bCryptPasswordEncoder.encode(fans.getPassword()));
        return fansRepository.save(fans);
    }

    private void verifyExistsEmail(String email) {
        if(fansRepository.existsByEmail(email)){
            throw new BusinessLogicException(ExceptionCode.FANS_EXISTS);
        }
        if(artistRepository.existsByEmail(email)){
            throw new BusinessLogicException(ExceptionCode.ARTIST_EXISTS);
        }
    }
}
