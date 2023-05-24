import React, { useState } from 'react';
import styled from 'styled-components';

const KakaoContainer = styled.div`
  margin-top: 35px;
  display: flex;
  align-items: center;

  button {
    margin-right: 8px;
  }
`;

const Kakao = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: 8px;
`;

const KakaoIcon = styled.i`
  width: 22px;
  height: 22px;
`;

const ConnectButton = styled.button`
  width: 74px;
  margin-left: auto;
  height: 32px;
  border: 1px solid var(--skyblue-500);
  border-radius: 4px;
  color: var(--skyblue-500);
  font-size: 13.5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    border: 3px solid var(--skyblue-600);
  }
`;

const KakaoConnect = () => {
  const [isLoading, setIsLoading] = useState(false);

  // 카카오톡 연결하기
  const kakaohandleClick = async () => {
    try {
      setIsLoading(true);

      const kakaoAppKey = 'YOUR_KAKAO_APP_KEY'; // 여기에 카카오 앱 키를 넣기
      const redirectUri = 'YOUR_REDIRECT_URI'; // 여기에 리디렉트 URI를 넣기
      const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoAppKey}&redirect_uri=${redirectUri}&response_type=code`;

      window.location.assign(authUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KakaoContainer>
      <button className='kakao'>
        <KakaoIcon className='i-kakao-icon' />
      </button>
      <Kakao>카카오톡</Kakao>
      <ConnectButton onClick={kakaohandleClick} disabled={isLoading}>
        {isLoading ? '연결 중...' : '연결하기'}
      </ConnectButton>
    </KakaoContainer>
  );
};

export default KakaoConnect;
