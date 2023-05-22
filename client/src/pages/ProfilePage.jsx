import styled from 'styled-components';
import HeadMain from '../components/Head/HeadMain';
import MyPage from '../components/MyPage/MyPage';

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
      </ProfilePageBlock>
    </>
  );
};

export default ProfilePage;
