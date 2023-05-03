import styled from 'styled-components';
import Music from '../components/Music/Music';

const ViewBox = styled.div`
  height: 100vh;
  background-color: var(--dark-blue-900);
`;

const MusicPage = () => {
  return (
    <ViewBox>
      <Music />
    </ViewBox>
  );
};

export default MusicPage;
