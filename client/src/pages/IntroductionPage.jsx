import styled from 'styled-components';
import HeadMain from '../components/Head/HeadMain';
import Introduction from '../components/Introduction/Introduction';

const IntroductionPageBlock = styled.div`
  min-height: 100vh;
  background-color: var(--light-gray-100);
`;

const IntroductionPage = () => {
  return (
    <>
      <IntroductionPageBlock>
        <HeadMain />
        <Introduction />
      </IntroductionPageBlock>
    </>
  );
};

export default IntroductionPage;
