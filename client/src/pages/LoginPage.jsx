import styled from 'styled-components';
import Login from '../components/Login/Login';

const ViewBox = styled.div`
  height: 100vh;
  background-color: var(--light-gray-100);
`;

const LoginPage = () => {
  return (
    <ViewBox>
      <Login />
    </ViewBox>
  );
};

export default LoginPage;
