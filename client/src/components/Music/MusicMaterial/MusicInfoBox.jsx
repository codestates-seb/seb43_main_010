import React from 'react';
import styled from 'styled-components';
import bookMark from '../../../assets/svg-file/bookmark.svg';
import moonVerified from '../../../assets/svg-file/moon-verified-icon.svg';
import music from './music.jpg';
import v from './v.jpg';

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
  margin-top: 5px;
`;

const BookMark = styled.img`
  width: 29px;
  height: 30px;
  position: absolute;
  right: 173px;
  top: 15px;
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
`;

const TextBoxImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 16px;
`;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  margin-top: 11px;
  color: var(--gray-blue-300);
`;

const MusicInfoBox = () => (
  <AritistBox>
    <MusicBox>
      <MusicBoxImg src={music} alt='profile' />
      <MusicInfo>
        <MusicTitle>Love Over And Over Again</MusicTitle>
        <MusicSinger>Switch</MusicSinger>
      </MusicInfo>
    </MusicBox>
    <BookMark src={bookMark} alt='bookmark' />
    <TextBox>
      <TextBoxImg src={v} alt='profile' />
      <UserInfoWrapper>
        <UserNameWrapper>
          <UserName>뷔</UserName>
          <MoonVerified src={moonVerified} alt='verified' />
        </UserNameWrapper>
        <Text>
          저는 여유와 힐링이 느껴지는 곡이 좋습니다. 어렸을 때 부터 그런 여유있는 곡들을 많이 들어왔어가지고 여러분들께도 같이 공유하고 소개시켜
          드리고 싶었습니다. Switch의 love over and again 이라는 곡이예요. 제가 이런 노래를 들을때는 뭔가 어.. 여유를 가지고 싶고 나름의 힐링도 가지고
          싶고 뭔가 내적 댄스도 추고 싶은 그런 LP에 있으면 좋을법한 음악이예요.
        </Text>
      </UserInfoWrapper>
    </TextBox>
  </AritistBox>
);

export default MusicInfoBox;