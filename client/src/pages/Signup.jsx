import styled from 'styled-components';
import Signup from '../components/Signup/Signup';
import { useSelector } from 'react-redux';
import { getCookie } from '../components/Login/LoginMaterial/setCookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ViewBox = styled.div`
  height: 100vh;
  background-color: var(--light-gray-100);
`;

const SignupPage = () => {
  // 전역 엑세스 토큰 확인하는 용도 나중에 삭제 11~17
  const token = useSelector((state) => state.auth.accessToken);
  //전역 엑세스 토큰이 있다면 아래처럼 인증 여부 (T/F)를 알 수 있음
  const authenticated = useSelector((state) => state.auth.authenticated);

  //위 두개를 통해 로그인 한지 안한지 알 수 있음 (토큰을 가진지)
  console.log(token, authenticated);
  const navigate = useNavigate();
  const cookie = getCookie();
  console.log(`쿠키 = ${cookie}`);
  //컴포넌트를 그리다 말고 실행되면 오류가 나므로 useEffect에서 실행해주자
  useEffect(() => {
    if (cookie) {
      console.log('why?');
      navigate('/');
    }
  });

  return (
    <ViewBox>
      <Signup />
    </ViewBox>
  );
};

export default SignupPage;
