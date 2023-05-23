import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import leftIcon from '../../../assets/svg-file/left-icon.svg';
import rightIcon from '../../../assets/svg-file/right-icon.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 임시 데이터
import data from '../../Main/data.js';
import NoticeArtLi from './NoticeArtLi';
import NoticeArtContentLi from './NoticeArtContentLi.jsx';
import NoticeArtContentAllLi from './NoticeArtContentAllLi.jsx';

const NoticeBlock = styled.div`
  position: absolute;
  top: 103%;
  right: 0%;

  overflow-x: hidden;
  width: 470px;
  min-height: 258px;
  overflow-y: auto;
  border-radius: 14px;
  box-shadow: 0 0 20px rgba(19, 28, 35, 15%);
  padding: 21px 20px 0 20px;
  background-color: var(--white-100);

  .notice-not {
    color: var(--light-gray-350);
    font-size: 16px;
    font-weight: 600;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 18px;
  }

  .notice-box {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 430px;
      height: 2px;
      top: 151%;
      background-color: var(--light-gray-200);
    }
  }

  .notice-txt {
    font-size: 21px;
    font-weight: 800;
    padding-bottom: 34px;
  }

  .art-list {
    display: flex;
    height: 30px;
    font-size: 14px;
    font-weight: 800;
    scroll-behavior: smooth;

    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    li {
      color: var(--gray-blue-400);
      transform: translateY(1px);
      flex-shrink: 0;

      button {
        font-size: 14px;
        font-weight: 800;
        width: auto;
        height: 30px;
        padding: 0 15px 0px 15px;
        border-radius: 0%;
        transform: translateY(-1px);

        display: flex;
        justify-content: center;
        align-items: start;

        &:hover {
          background-color: transparent;
        }
      }
    }
  }

  .noti-bottom {
    width: 450px;
    min-height: 149px;
    max-height: 65vh;
    overflow-y: auto;
    transform: translateY(-2px);
  }
`;

const Button = styled.button`
  color: ${({ selected }) => (selected ? `var(--dark-blue-900)` : `color: var(--gray-blue-400)`)};
  border-bottom: ${({ selected }) => (selected ? `2px solid var(--skyblue-500);` : `none`)};
`;

const LRButton = styled.button`
  position: absolute;
  top: 111%;
  transform: translateY(-50%);
  width: 46px;
  height: 44px;
  padding: 5px;
  z-index: 1;
`;

const LeftButton = styled(LRButton)`
  left: -20px;
  background: no-repeat url('${leftIcon}');
  background-size: 9px 14px;
  background-position: 56% 50%;
  background-color: var(--white-100);
  display: ${({ leftBtnHide }) => (leftBtnHide ? 'none' : 'block')};

  &::before {
    content: '';
    position: absolute;
    top: 0%;
    right: -43%;
    height: 44px;
    width: 20px;
    background: linear-gradient(to left, transparent, var(--white-100));
  }
`;

const RightButton = styled(LRButton)`
  right: -20px;
  background: no-repeat url('${rightIcon}');
  background-size: 9px 14px;
  background-position: 48% 50%;
  background-color: var(--white-100);
  display: ${({ rightBtnHide }) => (rightBtnHide ? 'none' : 'block')};

  &::before {
    content: '';
    position: absolute;
    top: 0%;
    left: -43%;
    height: 44px;
    width: 20px;
    background: linear-gradient(to left, var(--white-100), transparent);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Notice = ({ openNotice, setOpenNotice }) => {
  const [selected, setSelected] = useState('전체');
  const [leftBtnHide, setLeftBtnHide] = useState(true);
  const [rightBtnHide, setRightBtnHide] = useState(false);
  const [isScroll, setIsScroll] = useState(true);

  const noticeRef = useRef(null);
  const containerRef = useRef(null);

  const { myCommunity } = useSelector((state) => state.community);
  const { allGroup } = useSelector((state) => state.color);

  const myGroupIds = new Set(myCommunity);

  // My artist, 여기는 내 아티스트
  const filteredMyCommuData = allGroup.filter((el) => {
    return myGroupIds.has(el.groupId);
  });

  useEffect(() => {
    const clickOutside = (e) => {
      if (openNotice && noticeRef.current && !noticeRef.current.contains(e.target)) {
        setOpenNotice(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [openNotice]);

  const selectAllTxt = () => {
    setSelected('전체');
  };

  // 가로 스크롤이 없는 경우
  useEffect(() => {
    if (containerRef.current.scrollWidth <= 430) {
      setRightBtnHide(true);
      setIsScroll(false);
    }
  }, []);

  // 왼쪽
  const scrollLeft = () => {
    const container = containerRef.current;

    if (container) {
      container.scrollLeft -= 200;

      if (container.scrollLeft === 0) {
        setLeftBtnHide(true);
        setRightBtnHide(false);
      } else {
        setLeftBtnHide(false);
        setRightBtnHide(false);
      }
    }
  };

  // 오른쪽
  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      container.scrollLeft += 200;

      if (container.scrollLeft + containerWidth >= container.scrollWidth) {
        setRightBtnHide(true);
        setLeftBtnHide(false);
      } else {
        setRightBtnHide(false);
        setLeftBtnHide(false);
      }
    }
  };

  let prevCreatedAt = null; // 이전 항목의 createdAt 값

  return (
    <NoticeBlock ref={noticeRef}>
      {/* 위 */}
      <div className='notice-box'>
        <div className='notice-txt'>알림</div>
        <LeftButton leftBtnHide={leftBtnHide} className='left-btn' visible={false} onClick={scrollLeft}></LeftButton>
        <RightButton rightBtnHide={rightBtnHide} className='right-btn' onClick={scrollRight}></RightButton>
      </div>

      {/* 중간 */}
      <ul className='art-list' ref={containerRef}>
        <li className='all-li'>
          <Button selected={selected === '전체'} onClick={selectAllTxt} className='art-all'>
            전체
          </Button>
        </li>
        {/* 로그인 한 유저가 구독한 커뮤니티들 map돌려야 함 => NoticeArtLi 컴포넌트 */}
        {filteredMyCommuData.map((el) => (
          <NoticeArtLi
            key={el.groupId}
            isScroll={isScroll}
            setLeftBtnHide={setLeftBtnHide}
            setRightBtnHide={setRightBtnHide}
            groupName={el.groupName}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </ul>

      {/* 아래 */}
      <ul className='noti-bottom'>
        {filteredMyCommuData.length === 0 && <p className='notice-not'>30일 이내 알림이 없습니다.</p>}
        {/* 아래 아티스트 알림뜨는 곳 => NoticeArtContentAllLi, NoticeArtContentLi 컴포넌트 */}
        {selected === '전체' &&
          filteredMyCommuData.map((el) => {
            const createdAt = el.createdAt || '오늘'; // 임시로 '오늘'을 사용
            const hideDate = prevCreatedAt === createdAt; // 이전 항목과 현재 항목의 createdAt 값 비교
            prevCreatedAt = createdAt; // 현재 항목의 createdAt 값을 이전 항목으로 설정
            return (
              <StyledLink to={`/artist/${el.groupId}`} key={el.groupId}>
                <NoticeArtContentAllLi groupName={el.groupName} hide={hideDate} />
              </StyledLink>
            );
          })}
        {filteredMyCommuData.map((el) => {
          return (
            <StyledLink to={`/artist/${el.groupId}`} key={el.groupId}>
              <NoticeArtContentLi groupName={el.groupName} selected={selected} />
            </StyledLink>
          );
        })}
      </ul>
    </NoticeBlock>
  );
};

export default Notice;
