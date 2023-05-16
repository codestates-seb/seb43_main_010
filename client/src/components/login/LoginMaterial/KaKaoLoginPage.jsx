import React, { useEffect } from 'react';
import axios from 'axios';
import { setAccessToken } from './setCookie';
import { useNavigate } from 'react-router-dom';
const KaKaoLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const grant_type = 'authorization_code';
    // eslint-disable-next-line no-undef
    const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
    // eslint-disable-next-line no-undef
    const CLIENT_ID = `${process.env.REACT_APP_REST_API_APP_KEY}`;

    axios
      .post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        const { access_token } = res.data;
        const token = `Bearer ${access_token}`;
        setAccessToken(token);
        if (access_token) {
          axios
            .post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                headers: { Authorization: `Bearer ${access_token}`, 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
              },
            )
            .then((res) => {
              const { id } = res.data;
              const { email } = res.data.kakao_account;
              const { nickname, profile_image } = res.data.properties;
              //여기서 이제 회원가입으로 요청하기!!!! 아티스트냐 팬이냐 부터??.. 개오바임 프로필못줌 그냥 팬만가능하게 하기
            });
          navigate('/');
        } else {
          alert('카카오 access_token을 받아오지 못했습니다');
          navigate('/login');
        }
      });
  }, []);
  return (
    <>
      <h1>카카오 로그인 페이지</h1>
    </>
  );
};

export default KaKaoLogin;
