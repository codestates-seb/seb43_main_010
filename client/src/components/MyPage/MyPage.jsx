import styled from 'styled-components';
import MyProfile from './MyPageMeterial/MyProfile';
import MyInfo from './MyPageMeterial/MyInfo';

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-gray-100);
`;

const MyPage = () => {
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
