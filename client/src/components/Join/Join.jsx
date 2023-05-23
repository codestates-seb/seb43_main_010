import styled from 'styled-components';

import JoinForm from './JoinMaterial/JoinForm';

const JoinBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const RealJoinBlock = styled.div`
  width: 448px;
  height: 437px;

  .top-txt-box {
    color: var(--gray-800);
    font-size: 19px;
    text-shadow: 0 0 0 var(--gray-800);
    text-align: center;
    margin-bottom: 45px;
    line-height: 30px;
  }
  .bold {
    color: var(--gray-850);
    font-weight: 700;
  }
`;

const Join = () => {
  return (
    <JoinBlock>
      <RealJoinBlock>
        <p className='top-txt-box'>
          <span className='bold'>BTS</span> 루미안 멤버가 되어 더 많은 컨텐츠를 즐겨보세요!
          <br />
          커뮤니티에서 사용할 닉네임을 확인해 주세요.
        </p>

        {/* 커뮤니티 닉네임 입력창 => JoinForm 컴포넌트 */}
        <JoinForm />
      </RealJoinBlock>
    </JoinBlock>
  );
};

export default Join;
