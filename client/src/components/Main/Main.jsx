import styled from 'styled-components';
import BigImgBox from './MainMaterial/BigImgBox';
import fillMoon from '../../assets/png-file/fill-moon-icon.png';
import moon from '../../assets/png-file/moon-icon.png';
import { Link } from 'react-router-dom';
//쿠키 가져오기
import { getCookie } from '../Login/LoginMaterial/setCookie';
//현재 사용자 조회하기 위한 전역변수
import { useSelector, useDispatch } from 'react-redux';
// 임시 데이터
import data from './data';
import Card from './MainMaterial/Card';
import { useEffect } from 'react';
import axios from 'axios';
import { setCurrentUser } from '../../reducer/userSlice';
import { setMyCommunity, checkUserFan } from '../../reducer/communitySlice';

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
  // login한 유저 찾아오기
  const { currentUser } = useSelector((state) => state.user);
  const { myCommunity, isUserFan } = useSelector((state) => state.community);
  const { allGroup } = useSelector((state) => state.color);

  const baseAPI = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  useEffect(() => {
    const token = getCookie();
    // 로그인한 유저 찾아오기
    axios
      .get(`${baseAPI}/user`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        dispatch(setCurrentUser(res.data.data));
      });
  }, []);

  // 로그인한 유저가 가입되어 있는 커뮤니티 그룹 확인하는 곳
  // fanId라는 키를 가지고 있느냐 => 로그인한 유저가 팬이냐?
  useEffect(() => {
    const token = getCookie();
    axios.get(`${baseAPI}/home`, { headers: { Authorization: `${token}` } }).then((res) => {
      if ('fanId' in currentUser) {
        dispatch(checkUserFan(true)); // 현재 로그인한 유저는 팬
        const community = res.data.community.map((item) => item.id); // 가입되어 있는 커뮤니티의 id를 추출
        dispatch(setMyCommunity(community)); // 현재 로그인한 유저가 가입된 커뮤니티들
      } else {
        dispatch(checkUserFan(false)); // 현재 로그인한 유저는 아티스트
      }
    });
  }, [currentUser]);

  const myGroupIds = new Set(myCommunity);

  // My artist, 여기는 내 아티스트
  const filteredMyCommuData = allGroup.filter((el) => {
    return myGroupIds.has(el.groupId);
  });

  // Find a new artist!, 여기는 내 아티스트 아님
  const filteredData = allGroup.filter((el) => {
    return !myGroupIds.has(el.groupId);
  });

  return (
    <>
      <MainBlock>
        {/* 메인메이지에 큰 이미지 => BigImgBox  */}
        <BigImgBox />

        {/* My artist가 없으면 안보이게 처리해야 함 */}
        {myCommunity.length === 0 ? null : (
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
                {filteredMyCommuData.map((el) => (
                  <StyledLink to={`/music/${el.groupId}`} key={el.groupId}>
                    <Card key={el.groupId} groupName={el.groupName} groupImg={el.groupImg} grouplogoImg={el.grouplogoImg} />
                  </StyledLink>
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
                <StyledLink to={currentUser === null ? `/login` : isUserFan ? `/join/${el.groupId}` : `/music/${el.groupId}`} key={el.groupId}>
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
