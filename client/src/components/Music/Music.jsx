import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import cdImg from '../../assets/png-file/cd-img.png';
import bookMark from '../../assets/svg-file/bookmark.svg';
import moonVerified from '../../assets/svg-file/moon-verified-icon.svg';
import playIcon from '../../assets/svg-file/play-icon.svg';
import stopIcon from '../../assets/svg-file/stop-icon.svg';
import profileImg from '../../assets/jpg-file/profile-img.jpg';
import Head from '../Head/Head';
import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';

const Body = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--dark-blue-900);
`;

const MusicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 218px;
  @media screen and (max-width: 1024px) {
    margin-left: 0;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const CdImgBox = styled.div`
  position: relative;
  width: 513px;
  height: 513px;
  background-image: url(${cdImg});
  animation: ${({ isPlaying }) =>
    isPlaying
      ? css`
          ${spin} 20s linear infinite
        `
      : 'none'};
  @media screen and (max-width: 1024px) {
    width: 313px;
    height: 313px;
  }
  @media screen and (min-width: 768px) {
    background-size: cover;
    background-position: center;
    width: 213px;
    height: 213px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const AritistBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 519px;
  margin-left: 68px;
  position: relative;
`;

const MusicBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 316px;
  height: 82px;
  background-color: var(--black-900);
  border-radius: 15px;
  padding: 0 20px;
  font-size: 17px;
  font-weight: bold;
  color: var(--gray-blue-300);
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const MusicBoxImg = styled.img`
  width: 46px;
  height: 46px;
  margin-right: 10px;
`;

const MusicTitle = styled.span`
  font-size: 16.5px;
  font-weight: bold;
  color: var(--white-100);
`;

const MusicSinger = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--gray-blue-300);
`;

const BookMark = styled.img`
  width: 29px;
  height: 30px;
  position: absolute;
  right: 173px;
  top: 15px;
  @media screen and (max-width: 1024px) {
    right: 5px;
    top: 15px;
    margin-right: 170px;
  }
  @media screen and (max-width: 768px) {
    right: 5px;
    top: 15px;
    margin-right: 120px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 519px;
  height: 162px;
  background-color: var(--black-900);
  border-radius: 15px;
  padding: 18px 18px;
  font-size: 13px;
  color: var(--gray-blue-300);
  margin-top: 12px;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-right: 20px;
  }
  @media screen and (min-width: 768px) {
    width: 100%;
    margin-right: 20px;
  }
`;

const TextBoxImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: var(--white-100);
  margin-right: 5px;
`;

const MoonVerified = styled.img`
  width: 10px;
  height: 12px;
`;

const Text = styled.div`
  width: 397px;
  white-space: pre-wrap; //텍스트 줄 바꿈 유지
  font-size: 13px;
  line-height: 112.5%;
  margin-top: 30px;
`;

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [profileImage, setProfileImage] = useState(profileImg);
  // const [musicTitle, setMusicTitle] = useState('');
  // const [musicSinger, setMusicSinger] = useState('');
  // const [userName, setUserName] = useState('');
  // const [textValue, setTextValue] = useState('');

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Body>
      <Head />
      <Nav />
      <MusicContainer>
        <CdImgBox isPlaying={isPlaying}>
          <IconWrapper onClick={handlePlayToggle}>
            <img src={isPlaying ? stopIcon : playIcon} alt={isPlaying ? 'stop' : 'play'} />
          </IconWrapper>
        </CdImgBox>
        <AritistBox>
          <MusicBox>
            <MusicBoxImg src={profileImg} alt='profile' />
            <MusicInfo>
              <MusicTitle>Love Over And Over Again</MusicTitle>
              <MusicSinger>Switch</MusicSinger>
            </MusicInfo>
          </MusicBox>
          <BookMark src={bookMark} alt='bookmark' />
          <TextBox>
            <TextBoxImg src={profileImg} alt='profile' />
            <UserName>뷔</UserName>
            <MoonVerified src={moonVerified} alt='verified' />
            <Text>
              저는 여유와 힐링이 느껴지는 곡이 좋습니다. 어렸을 때 부터 그런 여유있는 곡들을 많이 들어왔어가지고 여러분들께도 같이 공유하고 소개시켜
              드리고 싶었습니다. Switch의 love over and again 이라는 곡이예요. 제가 이런 노래를 들을때는 뭔가 어.. 여유를 가지고 싶고 나름의 힐링도
              가지고 싶고 뭔가 내적 댄스도 추고 싶은 그런 LP에 있으면 좋을법한 음악이예요.
            </Text>
          </TextBox>
        </AritistBox>
      </MusicContainer>
      {/* <Footer /> */}
    </Body>
  );
};

export default Music;
