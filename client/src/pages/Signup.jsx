import styled from 'styled-components';
import Signup from '../components/Signup/Signup';

const ViewBox = styled.div`
  height: 100vh;
  background-color: var(--light-gray-100);
`;

const SignupPage = () => {
  return (
    <ViewBox>
      <Signup />
    </ViewBox>
  );
};

export default SignupPage;
