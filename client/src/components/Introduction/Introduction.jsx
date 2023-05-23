import styled from 'styled-components';
import LUMIAN from '../../assets/png-file/Luminae+Via.png';

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--light-gray-100);
`;

const IntroductionBlock = styled.div`
  align-items: flex-start;
  text-align: left;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-top: 165px;
  color: #131c23;
`;

const Hr = styled.hr`
  width: 135px;
  height: 6px;
  background: #131c23;
  margin: 15px 0 38px 1px;
`;

const Text = styled.div`
  font-size: 17px;
  /* font-weight: 500; */
  text-shadow: 0 0 0 #353a3f;
  text-align: justify;
  line-height: 112.5%;
  margin-bottom: 25px;
  color: #353a3f;
`;

const Title2 = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 39px;
  color: #131c23;
`;

const Image = styled.img`
  width: 645px;
  height: 93px;
  margin-top: 55px;
  margin-bottom: 33px;
`;

const Introduction = () => {
  return (
    <>
      <Body>
        <IntroductionBlock>
          <Title>OVERVIEW</Title>
          <Hr />
          <Text>
            해당 웹사이트는 위버스에서 영감을 받아 만들어졌습니다.
            <br />
            Lumian은 아티스트와 팬 간의 경계를 허물고, 함께 소통할 수 있는 공간입니다.
            <br />
          </Text>
          <Text>
            소셜 네트워크와 같은 커뮤니티 기능을 통해 팬들은 아티스트와 쉽게 대화를 나눌 수 있으며,
            <br />
            아티스트 노래 추천 기능을 제공하고 있어서 팬들은 아티스트가 추천하는 곡을 들을 수 있습니다.
          </Text>
          <Image src={LUMIAN} alt='LUMIAN' />
          <Title2>빛 + 길</Title2>
          <Text>Lumian은 라틴어 Luminae와 via를 합쳐서 만든 이름으로, 빛이 가득한 길을 의미합니다.</Text>
          <Text>
            빛은 영감과 창의성을 상징하는 요소로, Luminae과 via는 아티스트와
            <br />팬 간의 관계를 나타내며, 빛이 가득한 길로 함께 나아가는 것을 상징합니다.
          </Text>
        </IntroductionBlock>
      </Body>
    </>
  );
};

export default Introduction;
