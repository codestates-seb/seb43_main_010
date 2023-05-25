import styled from 'styled-components';
import SignupLogo from '../Login/LoginMaterial/LoginLogo';
import SignupForm from './SignupMaterial/SignupForm';
import Footer from '../Login/Footer';

//브라우저 뷰를 담당하는 뷰 박스컨트롤 (로그인 페이지 박스 + 푸터를 담기위함)
const Body = styled.div`
  background-color: var(--light-gray-100);
  @media screen and (min-width: 768px) {
    padding-top: 40px;
  }
  @media screen and (min-width: 600px) and (max-width: 767px) {
    max-width: 860px;
  }
  @media screen and (max-width: 599px) {
    min-width: 260px;
    max-width: 860px;
  }
`;

//div 2개가 담기는 컨테이너
const SignupPageBox = styled.div`
  background-color: var(--white-100);
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    width: 494px;
    margin: 0 auto;
    border: 1px solid var(--light-gray-100);
    border-radius: 1rem;
  }
  @media screen and (min-width: 600px) and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (max-width: 599px) {
    min-width: 260px;
  }
`;

const Signup = () => {
  return (
    <Body>
      <SignupPageBox>
        <SignupLogo />
        <SignupForm />
      </SignupPageBox>
      <Footer></Footer>
    </Body>
  );
};

export default Signup;
