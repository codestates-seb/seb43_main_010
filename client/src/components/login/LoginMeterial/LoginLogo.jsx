import styled from 'styled-components';
import logo from '../../../assets/logo.png';
//div 로고
const LogoBox = styled.div`
  height: 64px;

  @media screen and (min-width: 600px) {
    margin: 37px 0 10px 0;
    padding-left: 48px;
  }
  @media screen and (max-width: 599px) {
    margin: 0 0 32px 0;
    padding-left: 24px;
  }
`;
const Logo = styled.div`
  background-color: gray;
  width: 200px;
  height: 20px;
  //로고 이미지
  img {
  }
  @media screen and (min-width: 768px) {
    width: 211px;
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
