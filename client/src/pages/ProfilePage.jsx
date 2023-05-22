import styled from 'styled-components';
import HeadMain from '../components/Head/HeadMain';
import MyPage from '../components/MyPage/MyPage';
// import Foot from '../components/Foot/Foot';

const ProfilePageBlock = styled.div`
  min-height: 100vh;
  background-color: var(--light-gray-100);
`;

const ProfilePage = () => {
  return (
    <>
      <ProfilePageBlock>
        <HeadMain />
        <MyPage />
        {/* <Foot /> */}
      </ProfilePageBlock>
    </>
  );
};

export default ProfilePage;
