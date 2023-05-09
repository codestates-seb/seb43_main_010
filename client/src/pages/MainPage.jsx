import styled from 'styled-components';
import Head from '../components/Head/Head';
import Main from '../components/Main/Main';
import Foot from '../components/Foot/Foot';

const MainPageBlock = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: var(--light-gray-100);
`;

const MainPage = () => {
  return (
    <MainPageBlock>
      <Head />
      <Main />
      <Foot />
    </MainPageBlock>
  );
};

export default MainPage;
