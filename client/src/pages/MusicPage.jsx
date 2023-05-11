import styled from 'styled-components';
import Head from '../components/Head/Head';
import Nav from '../components/Nav/Nav';
import Music from '../components/Music/Music';
import MiniFoot from '../components/Foot/MiniFoot';

const MusicPageBlock = styled.div`
  min-height: 100vh;
  background-color: var(--dark-blue-900);
`;

const StyledFoot = styled(MiniFoot)`
  background-color: var(--dark-blue-900);
`;

const MusicPage = () => {
  return (
    <MusicPageBlock>
      <Nav />
      <Head />
      <Music />
      <StyledFoot />
    </MusicPageBlock>
  );
};

export default MusicPage;
