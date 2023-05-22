import styled from 'styled-components';
import LoginLogo from './LoginMaterial/LoginLogo';
import LoginForm from './LoginMaterial/LoginForm';
import Footer from './Footer';

//브라우저 뷰를 담당하는 뷰 박스컨트롤 (로그인 페이지 박스 + 푸터를 담기위함)
const Body = styled.div`
  background-color: var(--light-gray-100);

  @media screen and (min-width: 768px) {
    padding-top: 40px;
    height: 966px;
  }
  @media screen and (min-width: 600px) and (max-width: 767px) {
    max-width: 860px;
    min-height: 946px;
    /* max-height: 1057px; */
  }
  @media screen and (max-width: 599px) {
    min-width: 260px;
    max-width: 860px;
    min-height: 1040px;
    /* max-height: 1150px; */
  }
`;

//div 2개가 담기는 컨테이너
const LoginPageBox = styled.div`
  background-color: var(--white-100);
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    width: 494px;
    height: 756px;
    margin: 0 auto;
    border: 1px solid var(--light-gray-100);
    border-radius: 1rem;
  }
  @media screen and (min-width: 600px) and (max-width: 767px) {
    width: 100%;
    min-height: 758px;
    max-height: 834px;
  }
  @media screen and (max-width: 599px) {
    min-width: 260px;
    min-height: 758px;
    max-height: 834px;
  }
`;

const Login = () => {
  return (
    <Body>
      <LoginPageBox>
        <LoginLogo />
        <LoginForm />
      </LoginPageBox>
      <Footer></Footer>
    </Body>
  );
};

export default Login;
