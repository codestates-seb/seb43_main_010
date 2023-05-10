import styled from 'styled-components';
import BigImgBox from './MainMaterial/BigImgBox';
import fillMoon from '../../assets/png-file/fill-moon-icon.png';
import moon from '../../assets/png-file/moon-icon.png';
import { Link } from 'react-router-dom';

// 임시 데이터
import data from './data';

import Card from './MainMaterial/Card';

const MainBlock = styled.div`
  padding: 80px 0 212px 0;

  @media screen and (max-width: 965px) {
    .my-cards,
    .new-cards,
    .card-block {
      width: 430px;
    }
  }
  @media screen and (min-width: 966px) and (max-width: 1187px) {
    .my-cards,
    .new-cards,
    .card-block {
      width: 652px;
    }
  }
  @media screen and (min-width: 1188px) and (max-width: 1409px) {
    .my-cards,
    .new-cards,
    .card-block {
      width: 874px;
    }
  }
  @media screen and (min-width: 1410px) {
    .my-cards,
    .new-cards,
    .card-block {
      width: 1096px;
    }
  }
`;

const MyArtistCardsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyArtistCards = styled.div`
  width: 1096px;
  height: auto;
  margin-top: 67px;

  display: flex;
  justify-content: start;
  flex-direction: column;

  .my-artist {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 22px;
  }

  .fill-moon {
    width: 32.9px;
  }

  .my-artist-txt {
    font-size: 25px;
    font-weight: 700;
    transform: translateX(7px);
    margin-bottom: 2.25px;
  }
`;

const CardBlock = styled.ul`
  width: 1096px;
  height: auto;
  display: flex;
  gap: 23px 14px;
  flex-wrap: wrap;
`;

const NewArtistCardsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewArtistCards = styled.div`
  width: 1096px;
  height: auto;
  margin-top: 67px;

  display: flex;
  justify-content: start;
  flex-direction: column;

  .new-artist {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 22px;
  }

  .moon {
    width: 32.9px;
  }

  .new-artist-txt {
    font-size: 25px;
    font-weight: 700;
    transform: translateX(7px);
    margin-bottom: 2.25px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Main = () => {
  const filteredData = data.allGroup.filter((group) => {
    return !data.myGroup.some((myGroup) => myGroup.groupId === group.groupId);
  });

  return (
    <>
      <MainBlock>
        {/* 메인메이지에 큰 이미지 => BigImgBox  */}
        <BigImgBox />

        {/* My artist가 없으면 안보이게 처리해야 함 */}
        {data.myGroup.length === 0 ? null : (
          <MyArtistCardsBlock>
            <MyArtistCards className='my-cards'>
              <div className='my-artist'>
                <div className='fill-moon'>
                  <img src={fillMoon} alt='fill-moon' />
                </div>
                <span className='my-artist-txt'>My artist</span>
              </div>

              <CardBlock className='card-block'>
                {/* 여기서 My artist가 있으면 map 돌려야 함 => Card 컴포넌트*/}
                {data.myGroup.map((el) => (
                  <Link to={`/feed/${el.groupId}`} key={el.groupId}>
                    <Card key={el.groupId} groupName={el.groupName} groupImg={el.groupImg} grouplogoImg={el.grouplogoImg} />
                  </Link>
                ))}
              </CardBlock>
            </MyArtistCards>
          </MyArtistCardsBlock>
        )}

        <NewArtistCardsBlock>
          <NewArtistCards className='new-cards'>
            <div className='new-artist'>
              <div className='moon'>
                <img src={moon} alt='fill-moon' />
              </div>
              <span className='new-artist-txt'>Find a new artist!</span>
            </div>

            <CardBlock className='card-block'>
              {/* 여기서 artist들을 map 돌려야 함 => Card 컴포넌트 */}
              {filteredData.map((el) => (
                <StyledLink to={`/join/${el.groupId}`} key={el.groupId}>
                  <Card groupName={el.groupName} groupImg={el.groupImg} grouplogoImg={el.grouplogoImg} />
                </StyledLink>
              ))}
            </CardBlock>
          </NewArtistCards>
        </NewArtistCardsBlock>
      </MainBlock>
    </>
  );
};

export default Main;
