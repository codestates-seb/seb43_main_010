import styled from 'styled-components';
import logo from '../../assets/svg-file/white-logo.svg';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import RightIcon from './HeadMaterial/RightIcon';
import MyArtistModal from './HeadMaterial/MyArtistModal';

const HeadBlock = styled.header`
  width: 100%;
  height: 80px;
  background-color: var(--dark-blue-900);
  position: fixed;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .left-logo-box {
    position: relative;
  }

  .logo {
    width: 132px;
    margin-left: 51px;
    cursor: pointer;
  }
`;

const ArtistBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .artist-name {
    color: var(--gray-blue-400);
    font-size: 23px;
    font-weight: 800;
    margin-left: 16px;
  }

  .i-down-icon {
    margin: 0 0 0 10px;
    font-size: 8px;
  }

  .artist-name-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Head = () => {
  const [myArtModal, setMyArttModal] = useState(false);

  const { groupId } = useParams();
  const state = useSelector((state) => state.color);

  const group3 = state.allGroup.find((el) => el.groupId === Number(groupId));
  const groupName = group3 ? group3.groupName : [];

  const toggleMyArtistModal = () => {
    setMyArttModal(!myArtModal);
  };

  return (
    <>
      <HeadBlock>
        <LeftBox>
          <div className='left-logo-box'>
            <Link to='/'>
              <div className='logo'>
                <img src={logo} alt='logo' />
              </div>
            </Link>
            {/* 헤더 왼쪽 모달창 => MyArtistModal 컴포넌트 */}
            {myArtModal ? <MyArtistModal myArtModal={myArtModal} setMyArttModal={setMyArttModal} /> : null}
          </div>

          <ArtistBox>
            <button onClick={toggleMyArtistModal} className='artist-name-box' tabIndex='-1'>
              {/* BTS 부분을 나중에 데이터 받아서 수정해줘야 함 */}
              <span className='artist-name'>{groupName}</span>
              <div className='down'>
                <i className='i-down-icon' />
              </div>
            </button>
          </ArtistBox>
        </LeftBox>
        {/* 오른쪽 search, bell, people, ques 아이콘들이 있는 곳 => RightIcon 컴포넌트 */}
        <RightIcon />
      </HeadBlock>
    </>
  );
};

export default Head;
