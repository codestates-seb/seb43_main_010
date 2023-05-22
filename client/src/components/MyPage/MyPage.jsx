import styled from 'styled-components';
import MyProfile from './MyPageMeterial/MyProfile';
import MyInfo from './MyPageMeterial/MyInfo';
import authFn from '../auth';

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-gray-100);
`;

const MyPage = () => {
  authFn(); //로그인후 사용해주세요
  return (
    <>
      <Body>
        <MyProfile />
        <MyInfo />
      </Body>
    </>
  );
};

export default MyPage;
