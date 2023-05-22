import { getCookie } from './Login/LoginMaterial/setCookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

//로그인 여부 판단 후 페이지 접근 허가 또는 login 페이지로 이동
const authFn = () => {
  // const navigate = useNavigate();
  // const token = getCookie();
  // useEffect(() => {
  //   if (!token) {
  //     alert('로그인 후 사용하세요');
  //     navigate('/login');
  //   }
  // }, []);
};

export default authFn;
