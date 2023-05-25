import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignupInput from './SignupInput';
import SignupImgInput from './SignupImgInput';
import ArtistInput from './ArtistInput';
import { useNavigate } from 'react-router-dom';
import { resetInputs, setCalssification } from '../../../reducer/signupSlice';
import axios from 'axios';
import { emailValidation, pwdValidation, checkPwdValidation, commonValidation } from '../validation.js';
import SwitchButton from './SignupSwitchBtn';

//div : h1 form div(btn)
const SignupFormBox = styled.div`
  /* min-height: 178px; */
  min-width: 310px;
  padding: 0 24px;
  @media screen and (min-width: 768px) {
    width: 494px;
    padding: 0 48px;
  }
`;
// h1
const Title = styled.div`
  cursor: default;
  font-size: 26px;
  font-weight: 700;
  line-height: 36.4px;
  color: rgb(32, 36, 41);
  /* height: 73px; */
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
//
const UserCheck = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: rgb(32, 36, 41);
  display: flex;
  gap: 10px;
  align-items: center;
`;

//Inputform Box
const InputBox = styled.div`
  /* height: 170px; */
  font-weight: 500;
  hr {
    border: none;
    margin: 10px 0;
  }
  @media screen and (min-width: 768px) {
    width: 395px;
  }
`;

//submtBtn Box
const BtnBox = styled.div`
  margin: 60px 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  @media screen and (min-width: 768px) {
    width: 396px;
  }
`;
const SignupBtn = styled.button`
  border-radius: 0.5rem;
  padding: 4px 6px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22.4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #95c788, #1cbec8);
  color: rgb(255, 255, 255);
  /* transition: all 2s linear; 왜안되냐*/

  &:hover {
  }
`;

const LoginForm = () => {
  // 일반유저인지 아티스트인지 알기위한 상태관리  f: 일반인, t:아티스트
  const isArtist = useSelector((state) => state.signup.calssification);
  //회원가입 확인 시 상태를 post에 날리기 위해 모든 전역 상태 가져오기
  const fanUser = useSelector((state) => state.signup.fan);
  const artist = useSelector((state) => state.signup.artist);

  // switch 클릭시 setUser
  const handleChange = () => {
    onReset();
    dispatch(setCalssification(!isArtist));
    onInputReset();
  };

  // 확인 버튼 클릭과 취소 클릭 시 경로를 주기 위함
  const navigate = useNavigate();

  // eslint-disable-next-line no-undef
  const API = `${process.env.REACT_APP_API_URL}`;

  //이때 회원가입 버튼 클릭
  const onClickSubmit = async (e) => {
    e.preventDefault();
    //아티스트인지 팬인지 구분해서 날리기
    let body = {};
    if (isArtist) {
      if (
        emailValidation(artist.email)[0] === false ||
        pwdValidation(artist.password)[0] === false ||
        checkPwdValidation(artist.password, artist.passwordCheck) === false ||
        commonValidation(artist.name) === false ||
        commonValidation(artist.nickname) === false
      ) {
        alert('올바른 정보를 입력해주세요!');
        return;
      }
      body = { ...artist };
      delete body.passwordCheck;
      //여기서 pwd암호화하기
      await axios
        .post(`${API}/signup/artist`, body)
        .then((res) => {
          alert('회원가입 성공');
          onReset();
          onInputReset();
          navigate('/login');
        })
        .catch((e) => {
          alert('회원가입 실패');
          return;
        });
    } else {
      if (
        emailValidation(fanUser.email)[0] === false ||
        pwdValidation(fanUser.password)[0] === false ||
        checkPwdValidation(fanUser.password, fanUser.passwordCheck) === false ||
        commonValidation(fanUser.name) === false ||
        commonValidation(fanUser.nickname) === false
      ) {
        alert('올바른정보를 입력해주세요!');
        return;
      }
      body = { ...fanUser };
      delete body.passwordCheck;
      await axios
        .post(`${API}/signup/fans`, body)
        .then((res) => {
          alert('회원가입 성공');
          onReset();
          onInputReset();
          navigate('/login');
        })
        .catch((e) => {
          alert('회원가입 실패');
          return;
        });
    }
  };
  const onClickCancle = () => {
    onReset();
    onInputReset();
    navigate('/login');
  };
  const dispatch = useDispatch();
  // 리듀서 state 초기화
  const onReset = () => {
    dispatch(resetInputs());
  };

  const emailRef = useRef();
  const pwdRef = useRef();
  const pwdCheckRef = useRef();
  const nameRef = useRef();
  const nicknnameRef = useRef();

  const onInputReset = () => {
    emailRef.current.value = '';
    pwdRef.current.value = '';
    pwdCheckRef.current.value = '';
    nameRef.current.value = '';
    nicknnameRef.current.value = '';
  };

  return (
    <>
      <SignupFormBox>
        <Title>
          {isArtist ? '아티스트로 회원가입' : '팬으로 회원가입'}
          <UserCheck>
            가입유형
            <SwitchButton handleChange={handleChange} />
          </UserCheck>
        </Title>
        <InputBox>
          <SignupInput emailRef={emailRef} pwdRef={pwdRef} pwdCheckRef={pwdCheckRef} nameRef={nameRef} nicknnameRef={nicknnameRef} />
          <SignupImgInput label={'프로필 이미지'} name={isArtist ? 'artist' : 'fan'} />
          <hr></hr>
          <ArtistInput />
        </InputBox>
        <BtnBox>
          <SignupBtn onClick={onClickSubmit}>확인</SignupBtn>
          <SignupBtn onClick={onClickCancle}>취소</SignupBtn>
        </BtnBox>
      </SignupFormBox>
    </>
  );
};

export default LoginForm;
