//리프레시 토큰을 위한 저장소라고 해두자

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

//Refresh Token을 Cookie에 저장하기 위한 함수
// 리프레시 토큰은 1주일로 잡자
const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set('refreshToken', refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};

//Cookie에 저장된 Refresh Token 값을 갖고 오기 위한 함수.
const getCookie = () => {
  return cookies.get('refreshToken');
};

//Cookie 삭제를 위한 함수. 로그아웃 시 사용
const removeCookie = () => {
  return cookies.remove('refreshToken', { sameSite: 'strict', path: '/' });
};

export { setRefreshToken, getCookie, removeCookie };
