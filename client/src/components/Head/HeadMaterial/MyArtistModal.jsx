import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MyArtist from './MyArtist';

const MyArtistModalBlock = styled.div`
  position: absolute;
  top: 170%;
  left: 108.9%;
  width: 300px;
  min-height: 120px;
  border-radius: 14px;
  background-color: var(--white-100);
  box-shadow: 0 0 15px rgba(19, 28, 35, 15%);
  padding: 0 8px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .find-new-artist {
    width: 260px;
    height: 66px;
    border-top: 1px solid var(--light-gray-200);
    display: flex;
    justify-content: center;
    align-items: center;

    .plus {
      font-size: 13px;
      i::before {
        color: var(--skyblue-600);
      }
    }

    p {
      color: var(--skyblue-600);
      font-size: 16px;
      font-weight: 900;
      margin-left: 8px;
    }
  }

  .my-artist-box {
    width: 300px;
    display: flex;
    flex-direction: column;
    max-height: 75vh;
    overflow-y: auto;
    padding: 8px 8px 0 8px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MyArtistModal = ({ myArtModal, setMyArttModal }) => {
  const artistModalRef = useRef(null);

  const { myCommunity } = useSelector((state) => state.community);
  const { allGroup } = useSelector((state) => state.color);

  const myGroupIds = new Set(myCommunity);

  // My artist, 여기는 내 아티스트
  const filteredMyCommuData = allGroup.filter((el) => {
    return myGroupIds.has(el.groupId);
  });

  useEffect(() => {
    const clickOut = (e) => {
      if (myArtModal && artistModalRef.current && !artistModalRef.current.contains(e.target)) {
        setMyArttModal(false);
      }
    };
    document.addEventListener('mousedown', clickOut);

    return () => {
      document.removeEventListener('mousedown', clickOut);
    };
  }, [myArtModal]);

  return (
    <MyArtistModalBlock ref={artistModalRef}>
      <ul className='my-artist-box'>
        {/* 현재 로그인한 유저의 커뮤니티 가입한 거를 map돌려야 함 */}
        {/* 해당 아티스트에 맞는 Link도 추가해야 함 => MyArtist 컴포넌트 */}
        {filteredMyCommuData.map((el) => (
          <StyledLink to={`/feed/${el.groupId}`} key={el.groupId}>
            <MyArtist groupId={el.groupId} grouplogoImg={el.grouplogoImg} groupName={el.groupName} />
          </StyledLink>
        ))}
      </ul>

      <StyledLink to='/'>
        <button className='find-new-artist'>
          <div className='plus'>
            <i className='i-plus-artist-icon' />
          </div>
          <p>새로운 아티스트를 만나보세요!</p>
        </button>
      </StyledLink>
    </MyArtistModalBlock>
  );
};

export default MyArtistModal;
