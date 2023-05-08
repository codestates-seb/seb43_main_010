package com.example.demo.artist.service;

import com.example.demo.artist.entity.Artist;
import com.example.demo.artist.repository.ArtistRepository;
import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import com.example.demo.fans.entity.Fans;
import com.example.demo.fans.repository.FansRepository;
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
