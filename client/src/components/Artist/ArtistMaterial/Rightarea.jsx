import styled from 'styled-components';
import MiniFoot from '../../Foot/MiniFoot';
import { useSelector } from 'react-redux';
const RightContainer = styled.div`
  width: 353px;
  height: 468px;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  margin-left: 39px;
`;

const RightMyPageBox = styled.div`
  width: 353px;
  height: 171px;
  padding: 24px 20px 28px;
  background-color: var(--light-gray-100);
  border-radius: 15px;
  color: var(--white-100);
  box-shadow: 0 0 12px rgb(19, 28, 35, 10%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  :hover {
    background-color: var(--light-gray-150);
  }

  .user-profile {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 15px 15px 0 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }
  }
  .user-nickname {
    font-size: 19px;
    font-weight: 900;
    line-height: 23px;
    color: var(--dark-blue-900);
  }
`;

const StyledMiniFoot = styled(MiniFoot)`
  transform: translateX(11px) translateY(34px);
`;

const RightArea = ({ currentUser }) => {
  return (
    <RightContainer>
      <RightMyPageBox>
        {/* 로그인 유저의 닉네임과 프로필 보여주기 */}
        <div className='user-profile'>
          {/* <img src={''} alt='프로필이미지'></img> */}
          <img src={currentUser.profile} alt='프로필이미지'></img>
        </div>
        {/* <div className='user-nickname'>nickname</div> */}
        <div className='user-nickname'>{currentUser.nickname}</div>
      </RightMyPageBox>
      <StyledMiniFoot />
    </RightContainer>
  );
};

export default RightArea;
