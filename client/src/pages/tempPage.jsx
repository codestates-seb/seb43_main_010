import Head from '../components/Head/Head';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const TempBox = styled.div`
  width: 300px;
  height: 300px;
  border: 2px solid red;
  position: absolute;
  top: 100px;
  button {
    width: 100px;
    height: 50px;
    margin-right: 20px;
    border: 1px solid blue;
  }
`;

const TempPage = () => {
  const token = useSelector((state) => state.auth.accessToken);
  //전역 엑세스 토큰이 있다면 아래처럼 인증 여부 (T/F)를 알 수 있음
  const authenticated = useSelector((state) => state.auth.authenticated);

  //위 두개를 통해 로그인 한지 안한지 알 수 있음 (토큰을 가진지)
  console.log(token, authenticated);
  const navigate = useNavigate();
  const onclickLogin = () => {
    if (authenticated) {
      alert('이미 로그인했음');
      return;
    }
    navigate('/login');
  };
  const onclickSignup = () => {
    if (authenticated) {
      alert('이미 로그인했음');
      return;
    }
    navigate('/signup');
  };

  return (
    <>
      <Head />
      <TempBox>
        <button onClick={onclickLogin}>로그인</button>
        <button onClick={onclickSignup}>회원가입</button>
      </TempBox>
    </>
  );
};

export default TempPage;
