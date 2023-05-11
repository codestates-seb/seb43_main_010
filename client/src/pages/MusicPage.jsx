import styled from 'styled-components';
import Head from '../components/Head/Head';
import Music from '../components/Music/Music';
import Nav from '../components/Nav/Nav';

const MusicPageBlock = styled.div`
  min-height: 100vh;
  background-color: var(--dark-blue-900);
`;

const MusicPage = () => {
  return (
    <MusicPageBlock>
      <Nav />
      <Head />
      <Music />
    </MusicPageBlock>
  );
};

export default MusicPage;
