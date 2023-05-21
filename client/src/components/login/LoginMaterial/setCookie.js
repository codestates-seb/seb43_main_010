//리프레시 토큰을 위한 저장소라고 해두자
import { Cookies } from 'react-cookie';
import axios from 'axios';

const cookies = new Cookies();

//Refresh Token을 Cookie에 저장하기 위한 함수
// 리프레시 토큰은 1주일로 잡자
const setAccessToken = (accessToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 1);
  // const token = accessToken.slice(7); //공백없는애
  return cookies.set('accessToken', accessToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};

//Cookie에 저장된 Refresh Token 값을 갖고 오기 위한 함수.
const getCookie = () => {
  return cookies.get('accessToken');
};

//Cookie 삭제를 위한 함수. 로그아웃 시 사용
const removeCookie = () => {
  return cookies.remove('accessToken', { sameSite: 'strict', path: '/' });
};

//사용자 정보 가져오기 위한 API 콜 여러곳에서 쓰임
const getUserInfo = () => {
  const myCookie = cookies.get('accessToken');
  // axios.post
};

export { setAccessToken, getCookie, removeCookie };
