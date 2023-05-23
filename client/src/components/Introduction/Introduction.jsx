import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--light-gray-100);
`;

const IntroductionBlock = styled.div`
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-top: 165px;
`;

const Hr = styled.hr`
  width: 135px;
  height: 6px;
  background: #131c23;
`;

const Content = styled.div`
  font-size: 17px;
  text-shadow: 0 0 0 #353a3f;
  text-align: justify;
  padding: 20px;
`;

const Introduction = () => {
  return (
    <>
      <Body>
        <IntroductionBlock>
          <Title>OVERVIEW</Title>
          <Hr />
          <Content>
            해당 웹사이트는 위버스에서 영감을 받아 만들어졌습니다.
            <br />
            Lumian은 아티스트와 팬 간의 경계를 허물고, 함께 소통할 수 있는 공간입니다.
            <br />
          </Content>
          <Content>
            소셜 네트워크와 같은 커뮤니티 기능을 통해 팬들은 아티스트와 쉽게 대화를 나눌 수 있으며,
            <br />
            아티스트 노래 추천 기능을 제공하고 있어서 팬들은 아티스트가 추천하는 곡을 들을 수 있습니다.
          </Content>
        </IntroductionBlock>
      </Body>
    </>
  );
};

export default Introduction;
