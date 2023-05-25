import styled from 'styled-components';
import Head from '../components/Head/Head';
import Nav from '../components/Nav/Nav';
import Music from '../components/Music/Music';

const MusicPageBlock = styled.div`
  min-height: 100vh;
  background-color: var(--dark-blue-800);
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
