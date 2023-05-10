import styled from 'styled-components';
import Head from '../components/Head/Head';
import Join from '../components/Join/Join';

const JoinPageBlock = styled.div`
  min-height: 100vh;
  background-color: var(--light-gray-100);
`;

const JoinPage = () => {
  return (
    <JoinPageBlock>
      <Head />
      <Join />
    </JoinPageBlock>
  );
};

export default JoinPage;
