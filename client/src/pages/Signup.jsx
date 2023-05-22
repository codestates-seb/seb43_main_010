import styled from 'styled-components';
import Signup from '../components/Signup/Signup';
import { getCookie } from '../components/Login/LoginMaterial/setCookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ViewBox = styled.div`
  height: 100vh;
  background-color: var(--light-gray-100);
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const token = getCookie();
  //컴포넌트를 그리다 말고 실행되면 오류가 나므로 useEffect에서 실행해주자
  useEffect(() => {
    if (token) {
      alert('로그인되어있음');
      navigate('/');
    }
  }, []);

  return (
    <ViewBox>
      <Signup />
    </ViewBox>
  );
};

export default SignupPage;
