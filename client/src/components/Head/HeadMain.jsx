import styled from 'styled-components';
import logo from '../../assets/svg-file/white-logo.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RightIcon from './HeadMaterial/RightIcon';
import Signin from './HeadMaterial/Signin';

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

  .logo {
    width: 132px;
    margin-left: 51px;
    cursor: pointer;
  }
`;

const HeadMain = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <HeadBlock>
      <LeftBox>
        <Link to='/'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
        </Link>
      </LeftBox>

      {/* 오른쪽 search, bell, people, ques 아이콘들이 있는 곳 => RightIcon 컴포넌트 */}
      {currentUser === null ? <Signin /> : <RightIcon />}
    </HeadBlock>
  );
};

export default HeadMain;
