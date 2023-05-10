import styled from 'styled-components';
import logo from '../../assets/svg-file/white-logo.svg';
import { Link } from 'react-router-dom';

import RightIcon from './HeadMaterial/RightIcon';

const HeadBlock = styled.header`
  width: 100%;
  height: 80px;
  background-color: var(--dark-blue-900);
  position: fixed;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    width: 132px;
    margin-left: 51px;
    cursor: pointer;
  }

  // 로그인했을 때만 보이는 곳. 주석 처리할 예정
  .artist-box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

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
`;

const Head = () => {
  return (
    <HeadBlock>
      <LeftBox>
        <Link to='/'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
        </Link>

        {/* <div className="artist-box">
          <span className="artist-name">BTS</span>
          <div className="down">
            <i className="i-down-icon" />
          </div>
        </div> */}
      </LeftBox>

      {/* 오른쪽 search, bell, people, ques 아이콘들이 있는 곳 => RightIcon 컴포넌트 */}
      <RightIcon />
    </HeadBlock>
  );
};

export default Head;
