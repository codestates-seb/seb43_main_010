import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import SignupInput from './SignupInput';
import SignupImgInput from './SignupImgInput';
import ArtistInput from './ArtistInput';
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { resetInputs } from '../../../reducer/signupSlice';
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
  //이미지 파일 처리를 위한 상태 관리
  const [fileImg, setFileImg] = useState('');

  //useRef로 img - input 태그에 접근
  const imgInput = useRef();
  //input 태그에 클릭이벤트 매핑
  const onClickImgUpload = () => {
    imgInput.current.click();
  };
  // 일반유저인지 아티스트인지 알기위한 상태관리  f: 일반인, t:아티스트
  const [user, setUser] = useState(false);
  // 체크박스 클릭시 setUser
  const onClickCheckBox = () => {
    onReset();
    setUser(!user);
  };

  // 확인 버튼 클릭과 취소 클릭 시 경로를 주기 위함
  const navigate = useNavigate();

  const onClickConfirm = () => {
    onReset();
    navigate('/');
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
            {user ? '아티스트' : '일반인'}
            <CheckBox onClick={onClickCheckBox}>{user && <CheckIcon />}</CheckBox>
          </UserCheck>
        </Title>
        <InputBox>
          <SignupInput isArtist={user}></SignupInput>
          <SignupImgInput label={'프로필 이미지'} name={'avatar'} />
          <hr></hr>
          <ArtistInput isArtist={user} />
        </InputBox>
        <BtnBox>
          <SignupBtn onClick={onClickConfirm}>확인</SignupBtn>
          <SignupBtn onClick={onClickCancle}>취소</SignupBtn>
        </BtnBox>
      </SignupFormBox>
    </>
  );
};

export default LoginForm;
