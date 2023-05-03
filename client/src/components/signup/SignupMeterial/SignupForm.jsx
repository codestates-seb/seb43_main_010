import styled from 'styled-components';
import { useState, useRef } from 'react';
import SignupImgInput from './SignupImgInput';
import ArtistInput from './ArtistInput';
import { BsCheckLg } from 'react-icons/bs';
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

  label {
    height: 16px;
    font-size: 13px;
    line-height: 18.2px;
    color: rgb(109, 109, 109);
  }
  .input-box {
    height: 42px;
    margin: 2px 0 1px 0;
    display: flex;
    position: relative;
    > input {
      flex-grow: 1;
      font-size: 15px;
      line-height: 21px;
      color: rgb(89, 95, 99);
      border-bottom: 0.1rem solid rgb(238, 238, 238);
    }
    input:focus ~ .hrtag::after {
      width: 100%;
      z-index: 1;
    }
  }
`;
const HrTag = styled.hr`
  border: 0px solid red;
  &::after {
    content: '';
    position: absolute;
    left: 0px;
    bottom: -0.1rem;
    width: 0px;
    height: 0.1rem;
    background: linear-gradient(90deg, #95c788, #1cbec8);
    transition: all 0.3s linear 0s;
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

const CustomLink = styled.div`
  display: flex;
  justify-content: center;
  .forgot-pwd {
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    line-height: 19.6px;
    color: rgb(142, 142, 142);
    margin: 16px 0;
    &:hover {
      color: #111;
    }
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
    setUser(!user);
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
        <form>
          <InputBox>
            <label htmlFor='email'>이메일</label>
            <div className='input-box'>
              <input type='email' id='email' name='email' placeholder='your@email.com'></input>
              <HrTag className='hrtag' />
            </div>
            <hr></hr>
            <label htmlFor='pwd'>비밀번호</label>
            <div className='input-box'>
              <input type='password' id='pwd' name='pwd' placeholder='영문+숫자+특수문자 최소 8자리'></input>
              <HrTag className='hrtag' />
            </div>
            <hr></hr>
            <label htmlFor='pwd-check'>비밀번호 확인</label>
            <div className='input-box'>
              <input type='password' id='pwd-check' name='pwd-check' placeholder='비밀번호 확인'></input>
              <HrTag className='hrtag' />
            </div>
            <hr></hr>
            <label htmlFor='name'>이름</label>
            <div className='input-box'>
              <input type='text' id='pwd-check' name='name' placeholder='이름'></input>
              <HrTag className='hrtag' />
            </div>
            <hr></hr>
            <label htmlFor='nickname'>닉네임</label>
            <div className='input-box'>
              <input type='text' id='nickname' name='nickname' placeholder='닉네임'></input>
              <HrTag className='hrtag' />
            </div>
            <hr></hr>
            <SignupImgInput />
            <hr></hr>
            <ArtistInput isArtist={user} />
          </InputBox>
        </form>
        <BtnBox>
          <SignupBtn>확인</SignupBtn>
          <SignupBtn>취소</SignupBtn>
        </BtnBox>
      </SignupFormBox>
    </>
  );
};

export default LoginForm;
