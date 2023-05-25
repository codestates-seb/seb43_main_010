import React, { useEffect } from 'react';
import axios from 'axios';
import { setAccessToken } from './setCookie';
import { useNavigate } from 'react-router-dom';

const KaKaoLogin = () => {
  const navigate = useNavigate();
  const API = `${process.env.REACT_APP_API_URL}`;
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
              // const { id } = res.data;
              const { email } = res.data.kakao_account;
              const { nickname, profile_image } = res.data.properties;
              //받아온 카카오 정보로 fanUser 세팅
              axios
                .post(`${API}/signup/fans`, {
                  email,
                  password: 'kakaoLogin',
                  name: nickname,
                  nickname,
                  profile: profile_image,
                })
                .then((res) => {
                  console.log(res);
                  alert('카카오 회원가입 및 로그인 성공');
                })
                .catch((e) => {
                  console.log(e);
                  alert('카카오 회원가입 실패');
                  return;
                });
            });

          navigate('/');
        } else {
          alert('카카오 로그인 실패');
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
