import styled from 'styled-components';
import Head from '../components/Head/Head';
import Music from '../components/Music/Music';
// import Foot from '../components/Foot/Foot';

const MusicPageBlock = styled.div`
  min-height: 100vh;
  background-color: var(--dark-blue-900);
`;

// const StyledFoot = styled(Foot)`
//   background-color: var(--dark-blue-900);
// `;

const MusicPage = () => {
  return (
    <MusicPageBlock>
      <Head />
      <Music />
      {/* <StyledFoot /> */}
    </MusicPageBlock>
  );
};

export default MusicPage;
