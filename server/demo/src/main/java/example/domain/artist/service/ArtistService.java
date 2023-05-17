package example.domain.artist.service;

import example.domain.artist.entity.Artist;
import example.domain.artist.repository.ArtistRepository;
import example.domain.fans.repository.FansRepository;
import example.domain.group.entity.Group;
import example.domain.group.repository.GroupRepository;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;




@Service
@AllArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final FansRepository fansRepository;

    private final GroupRepository groupRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
/*
    public ArtistService(FansRepository fansRepository,ArtistRepository artistRepository,BCryptPasswordEncoder bCryptPasswordEncoder){
        this.fansRepository = fansRepository;
        this.artistRepository = artistRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
*/

    public Artist createArtist(Artist artist) {
        verifyExistsEmail(artist.getEmail());
        if(groupRepository.existsByGroupName(artist.getGroup())){
            Group group_info = groupRepository.findByGroupName(artist.getGroup()).get();
            artist.setGroups(group_info);
            group_info.addArtist(artist);
            group_info.setProfile(artist.getGroupProfile());
        }else{
            Group group_info = new Group();
            artist.setGroups(group_info);
            group_info.setArtists(new ArrayList<>());
            group_info.addArtist(artist);
            group_info.setGroupName(artist.getGroup());
            group_info.setProfile(artist.getGroupProfile());
            groupRepository.save(group_info);
        }
        artist.setPassword(bCryptPasswordEncoder.encode(artist.getPassword()));
        return artistRepository.save(artist);
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
