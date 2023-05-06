import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignupInput from './SignupInput';
import SignupImgInput from './SignupImgInput';
import ArtistInput from './ArtistInput';
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { setFanId, setArtistId, resetInputs, setCalssification } from '../../../reducer/signupSlice';
import axios from 'axios';

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

// artist 체크박스
const CheckBox = styled.div`
  border: 1px solid #95c788;
  border-radius: 6px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CheckIcon = styled(BsCheckLg)`
  color: #1cbec8;
  font-size: 21px;
  margin-right: 1px;
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
  // const fanProfile = useSelector((state) => state.signup.fan.profile);
  // const artist = useSelector((state) => state.signup.artist);
  // const artistProfile = useSelector((state) => state.signup.artist.profile);
  // const artistGroupImg = useSelector((state) => state.signup.artist.groupImg);

  // 체크박스 클릭시 setUser
  const onClickCheckBox = () => {
    onReset();
    dispatch(setCalssification(!isArtist));
  };

  // 확인 버튼 클릭과 취소 클릭 시 경로를 주기 위함
  const navigate = useNavigate();

  //이때 회원가입 Post 요청 날리기
  const onClickSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ...fanUser,
      // profile: fanProfile,
    };
    await axios
      .post('http://localhost:4000/fans', body)
      .then(() => {
        console.log('성공');
        dispatch(setFanId());
      })
      .catch((e) => {
        console.log(e);
      });
    // onReset();
    // navigate('/');
  };
  const onClickCancle = () => {
    onReset();
    navigate('/login');
  };
  const dispatch = useDispatch();
  // 리듀서 state 초기화
  const onReset = () => {
    dispatch(resetInputs());
  };
  return (
    <>
      <SignupFormBox>
        <Title>
          루미안 회원가입
          <UserCheck>
            {isArtist ? '아티스트' : '일반인'}
            <CheckBox onClick={onClickCheckBox}>{isArtist && <CheckIcon />}</CheckBox>
          </UserCheck>
        </Title>
        <InputBox>
          <SignupInput />
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
