import styled from 'styled-components';
import profileImg from '../../assets/jpg-file/profile-img.jpg';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

const JoinBox = styled.div`
  width: 448px;
  height: 332px;
  border-radius: 15px;
  background-color: var(--white-100);
  box-shadow: 0 0 32px rgba(19, 28, 35, 8%);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .profil-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: no-repeat url('${profileImg}');
    background-size: 100px 100px;
  }

  .done {
    width: 378px;
    height: 50px;
    border-radius: 9px;
    color: var(--skyblue-500);
    font-size: 16px;
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: var(--skyblue-100);
      transition: 0.15s;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    color: var(--gray-950);
    font-weight: 800;
    margin-bottom: 11px;
  }

  input {
    width: 378px;
    height: 56px;
    padding-left: 18px;
    border-radius: 9px;
    margin-bottom: 20px;

    color: var(--gray-950);
    font-size: 15px;
    text-shadow: 0 0 0 var(--gray-950);
    background-color: var(--light-gray-100);
    caret-color: var(--skyblue-500);

    &:focus {
      outline: none;
    }
    &:hover {
      background-color: var(--light-gray-150);
      transition: 0.15s;
    }
  }
`;

const Join = () => {
  const [commuNickname, setCommuNickname] = useState('');

  const { groupId } = useParams();
  const navigate = useNavigate();

  const updateNickname = (e) => {
    setCommuNickname(e.target.value);
  };

  const submitNickname = (e) => {
    e.preventDefault();
    // !!!여기에서 commuNickname을 서버에 전송해야 함!!!
    navigate(`/feed/${groupId}`);
  };

  return (
    <JoinBlock>
      <RealJoinBlock>
        <p className='top-txt-box'>
          <span className='bold'>BTS</span> 루미안 멤버가 되어 더 많은 컨텐츠를 즐겨보세요!
          <br />
          커뮤니티에서 사용할 닉네임을 입력해 주세요.
        </p>

        <JoinBox>
          <div className='profil-img'></div>
          <Form onSubmit={submitNickname}>
            <label htmlFor='nickname'>닉네임</label>
            {/* 나중에 여기서 defaultValue를 유저 닉네임으로 바꾸어야 함 */}
            <input onChange={updateNickname} defaultValue='TATA-V' type='text' id='nickname' name='nickname' autoComplete='off' required />
            <button className='done'>완료</button>
          </Form>
        </JoinBox>
      </RealJoinBlock>
    </JoinBlock>
  );
};

export default Join;
