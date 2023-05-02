import styled from 'styled-components';
import kakaoLogo from '../../../assets/png-file/kakaoLogo.png';

//div : h1 form div(btn)
const LoginFormBox = styled.div`
  /* min-height: 178px; */
  padding: 0 24px;
  @media screen and (min-width: 768px) {
    width: 494px;
    padding: 0 48px;
  }
`;
// h1
const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  line-height: 36.4px;
  color: rgb(32, 36, 41);
  /* height: 73px; */
  margin-bottom: 20px;
  //로고 이미지
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
    input {
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
  margin-top: 60px;
  height: 210px;
  @media screen and (min-width: 768px) {
    width: 396px;
  }
  .or-tag {
    font-size: 14px;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
    color: rgb(68, 68, 68);
    &::before,
    &::after {
      content: '';
      flex-grow: 1;
      background: rgba(0, 0, 0, 0.35);
      height: 1px;
      font-size: 0px;
      line-height: 0px;
    }
    &::before {
      margin-right: 16px;
    }
    &::after {
      margin-left: 16px;
    }
  }
`;
const LoginBtn = styled.button`
  border-radius: 0.3rem;
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

const SignupBtn = styled.button`
  margin: 20px auto;
  padding: 4px 6px;
  width: 183px;
  height: 45px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22.4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #95c788, #1cbec8);
  color: #fff;
  /* transition: all 2s linear; 왜안되냐*/
  border-radius: 0.25rem;

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
const KakaoBtn = styled.div`
  margin-top: 16px;
  /* height: 48px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = () => {
  return (
    <>
      <LoginFormBox>
        <Title>
          루미안 계정으로
          <br />
          로그인이나 회원가입 해주세요
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
          </InputBox>
        </form>
        <BtnBox>
          <LoginBtn>로그인</LoginBtn>
          <CustomLink>
            <span className='forgot-pwd'>비밀번호를 잊어버리셨나요?</span>
          </CustomLink>
          <SignupBtn>회원가입</SignupBtn>
          <div className='or-tag'>혹은</div>
          <KakaoBtn>
            <img src={kakaoLogo} alt='카카오로고'></img>
          </KakaoBtn>
        </BtnBox>
      </LoginFormBox>
    </>
  );
};

export default LoginForm;
