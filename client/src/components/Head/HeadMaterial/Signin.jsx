import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SigninBlock = styled.button`
  color: var(--dark-blue-900);
  font-size: 15px;
  font-weight: 700;
  text-shadow: 0 0 0 var(--dark-blue-900);
  margin-right: 51px;
  padding: 8px 20px 10px 22px;
  border-radius: 35px;
  background: linear-gradient(135deg, #657f88, #2c6b77);
  box-shadow: 0 0 8px rgba(122, 153, 164, 0.4);

  &:hover {
    background: linear-gradient(135deg, #7a99a4, #2f7381);
  }
`;

const Signin = () => {
  return (
    <Link to='/login'>
      <SigninBlock>Sign in</SigninBlock>
    </Link>
  );
};

export default Signin;
