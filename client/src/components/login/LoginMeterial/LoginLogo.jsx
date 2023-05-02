import styled from 'styled-components';
import logo from '../../../assets/svg-file/dark-blue-logo.svg';
//div 로고
const LogoBox = styled.div`
  height: 64px;

  @media screen and (min-width: 600px) {
    margin: 37px 0 10px 0;
    /* padding-left: 48px; */
  }
  @media screen and (max-width: 599px) {
    margin: 37px 0 10px 0;
    /* padding-left: 24px; */
  }
`;
const Logo = styled.div`
  width: 200px;
  height: 30px;
  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: 768px) {
    width: 211px;
    padding-left: 48px;
  }
`;

const LoginLogo = () => {
  return (
    <>
      <LogoBox>
        <Logo>
          <img src={logo} alt='로고이미지'></img>
        </Logo>
      </LogoBox>
    </>
  );
};

export default LoginLogo;
