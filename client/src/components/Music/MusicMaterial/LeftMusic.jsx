import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaying } from '../../../reducer/musicSlice';
import vImg from '../../../assets/jpg-file/artist-profile/v-profile.jpg';

// 임시 음악 데이터임
import musicData from '../musicData';

import FirstMusicUl from './FirstMusicUl';
import Label from './Label';
import MusicLi from './MusicLi';
import MiniFoot from '../../Foot/MiniFoot';
import ArtistMusicDes from './ArtistMusicDes';
import PostInputMusic from './PostInputMusic';

const LeftBlock = styled.div`
  width: 550px;
  height: auto;
  border-right: 1px solid #2a343d;
  padding-top: 20px;

  .first-music-box {
    display: flex;
  }
`;

const MusicListUl = styled.ul`
  width: 495px;
  min-height: 94px;
  max-height: 444px;
  margin-top: 18px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255, 0.08);
  box-shadow: 0 0 14px rgb(255, 255, 255, 0.03);
  backdrop-filter: blur(5px); // 나중에 보고 어울리는 값으로 수정
  padding: 12px 10px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: #ccc;
  }

  &::-webkit-scrollbar-track {
    border-radius: 20px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    bottom: 10px;
  }
`;

const FooterWrapper = styled.div`
  width: 495px;
  padding: 34px 0 71px;
  display: flex;
  justify-content: center;
`;

// 아티스트 게시글 임시 데이터
const data = {
  musicPost: [
    // {
    //   artistId: 1,
    //   nickname: `뷔`, // 작성자 닉네임
    //   content: `RM 씨의 시작으로 한 명씩 자신이 직접 선정한 플레이리스트를 공유하고 있죠. 오늘은 바로 제 차례입니다. 먼저 플레이리스트 주제를 알려드릴게요. 방탄소년단 뷔의 플레이리스트. 저는 여유와 힐링이 느껴지는 곡이 좋습니다. 어렸을 때부터 그런 여유 있는 곡들을 많이 들어와서 여러분들께도 같이 공유하고 싶었습니다. `,
    //   img: vImg,
    //   postlikeNum: 0,
    //   createdAt: `04. 05. 10:26`,
    // },
    {
      artistId: 1,
      nickname: `뷔`, // 작성자 닉네임
      content: `RM 씨의 시작으로 한 명씩 자신이 직접 선정한 플레이리스트를 공유하고 있죠. 오늘은 바로 제 차례입니다. 먼저 플레이리스트 주제를 알려드릴게요. 방탄소년단 뷔의 플레이리스트. 저는 여유와 힐링이 느껴지는 곡이 좋습니다. 어렸을 때부터 그런 여유 있는 곡들을 많이 들어와서 여러분들께도 같이 공유하고 싶었습니다. 첫 곡은 Switch의 love over and over이라는 곡과 Earth, Wind & Fire의 Septrmber이라는 곡입니다. 제가 이런 노래를 들을 때는 뭔가 어.. 여유를 가지고 싶고 그리고 나름의 힐링도 가지고 싶고 뭔가 내적 댄스도 추고 싶은 그런 LP에 있으면 되게 좋을법한 음악이에요. 그럼 듣고 오시죠!`,
      img: vImg,
      postlikeNum: 0,
      createdAt: `04. 05. 10:26`,
    },
  ],
};
const { nickname, content, img, postlikeNum, createdAt } = data.musicPost[0];

const LeftMusic = () => {
  const dispatch = useDispatch();
  const { currentMusicId } = useSelector((state) => state.music);
  // 임시 뮤직 첫번째 데이터
  const { musicId, musicTitle, singer, musicImg, musicMp3, likeNum } = musicData.playList[0];

  // 노래
  const handleMusicEnd = () => {
    if (currentMusicId === musicData.playList.length) {
      dispatch(setPlaying({ currentMusicId: 1 }));
    } else {
      dispatch(setPlaying({ currentMusicId: currentMusicId + 1 }));
    }
  };

  return (
    <>
      <LeftBlock>
        {/* 위 */}
        <div className='first-music-box'>
          {/* 맨 위 노래 =>  FirstMusicUl 컴포넌트 */}
          <FirstMusicUl
            playBoolean={musicId === currentMusicId}
            onMusicEnd={handleMusicEnd}
            musicTitle={musicTitle}
            musicId={musicId}
            singer={singer}
            musicImg={musicImg}
            musicMp3={musicMp3}
            likeNum={likeNum}
          />
          {/* 라벨 => Label 컴포넌트 */}
          <Label />
        </div>

        {/* 중간 */}
        <MusicListUl>
          {/* 여기서 2번째 음악부터 map 돌려야 함 */}
          {musicData.playList.slice(1).map((el) => (
            <MusicLi
              key={el.musicId}
              playBoolean={el.musicId === currentMusicId}
              onMusicEnd={handleMusicEnd}
              musicId={el.musicId}
              musicTitle={el.musicTitle}
              singer={el.singer}
              musicImg={el.musicImg}
              musicMp3={el.musicMp3}
              likeNum={el.likeNum}
            />
          ))}
        </MusicListUl>

        {/* 아래 */}
        {/* 아티스트의 음악 소개 => ArtistMusicDes 컴포넌트 */}
        <ArtistMusicDes nickname={nickname} content={content} img={img} likeNum={postlikeNum} createdAt={createdAt} />

        {/* 아티스트라면 보이는 input같이 생긴 PostInputMusic 컴포넌트 */}
        <PostInputMusic />

        {/* 푸터 */}
        <FooterWrapper>
          <MiniFoot />
        </FooterWrapper>
      </LeftBlock>
    </>
  );
};

export default LeftMusic;
