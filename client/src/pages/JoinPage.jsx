import styled from 'styled-components';
import HeadMain from '../components/Head/HeadMain';
import Join from '../components/Join/Join';

const JoinPageBlock = styled.div`
  min-height: 100vh;
  background-color: var(--light-gray-100);
`;

const JoinPage = () => {
  return (
    <JoinPageBlock>
      <HeadMain />
      <Join />
    </JoinPageBlock>
  );
};

export default JoinPage;
