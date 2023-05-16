import styled from 'styled-components';
import Login from '../components/Login/Login';
import { getCookie } from '../components/Login/LoginMaterial/setCookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const ViewBox = styled.div`
  height: 100vh;
  background-color: var(--light-gray-100);
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const token = getCookie();
  useEffect(() => {
    if (token) {
      alert('로그인되어있음');
      navigate('/');
    }
  }, []);
  return (
    <ViewBox>
      <Login />
    </ViewBox>
  );
};

export default LoginPage;
