import styled from 'styled-components';
import profileImg from '../../../assets/jpg-file/profile-img.jpg';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../Login/LoginMaterial/setCookie';
import axios from 'axios';

const JoinFormBlock = styled.div`
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

const JoinForm = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { groupId } = useParams();
  const navigate = useNavigate();

  const submitNickname = (e) => {
    e.preventDefault();
    // !!!여기에서 commuNickname을 서버에 전송해야 함!!!
    const token = getCookie();
    const baseAPI = process.env.REACT_APP_API_URL;
    // 그룹 추가
    axios.post(`${baseAPI}/home/check/${groupId}`, {}, { headers: { Authorization: `${token}` } }).then(() => {
      navigate(`/music/${groupId}`);
    });
  };

  return (
    <JoinFormBlock>
      <div className='profil-img'></div>
      <Form onSubmit={submitNickname}>
        <label htmlFor='nickname'>닉네임</label>
        {/* 나중에 여기서 defaultValue를 유저 닉네임으로 바꾸어야 함 */}
        <input value={currentUser.nickname} type='text' id='nickname' name='nickname' autoComplete='off' readOnly />
        <button className='done'>완료</button>
      </Form>
    </JoinFormBlock>
  );
};

export default JoinForm;
