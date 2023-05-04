import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setFan, setArtist } from '../../../reducer/signupSlice';

const InputForm = styled.form`
  hr {
    border: none;
    margin: 10px 0;
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

const SignupInput = () => {
  // signup을 위한 reducer 전역상태 받아오기
  const isArtist = useSelector((state) => state.signup.calssification);
  const fanUser = useSelector((state) => state.signup.fan);
  const artist = useSelector((state) => state.signup.artist);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value, name } = e.target;
    if (isArtist) {
      dispatch(setArtist({ ...artist, [name]: value }));
    } else {
      dispatch(setFan({ ...fanUser, [name]: value }));
    }
  };
  return (
    <>
      <InputForm>
        <label htmlFor='email'>이메일</label>
        <div className='input-box'>
          <input type='email' id='email' name='email' onChange={onChange} placeholder='your@email.com'></input>
          <HrTag className='hrtag' />
        </div>
        <hr></hr>
        <label htmlFor='pwd'>비밀번호</label>
        <div className='input-box'>
          <input type='password' id='pwd' name='pwd' onChange={onChange} placeholder='영문+숫자+특수문자 최소 8자리'></input>
          <HrTag className='hrtag' />
        </div>
        <hr></hr>
        <label htmlFor='pwd-check'>비밀번호 확인</label>
        <div className='input-box'>
          <input type='password' id='pwd-check' name='pwdCheck' onChange={onChange} placeholder='비밀번호 확인'></input>
          <HrTag className='hrtag' />
        </div>
        <hr></hr>
        <label htmlFor='name'>이름</label>
        <div className='input-box'>
          <input type='text' id='pwd-check' name='name' onChange={onChange} placeholder='이름'></input>
          <HrTag className='hrtag' />
        </div>
        <hr></hr>
        <label htmlFor='nickname'>닉네임</label>
        <div className='input-box'>
          <input type='text' id='nickname' name='nickname' onChange={onChange} placeholder='닉네임'></input>
          <HrTag className='hrtag' />
        </div>
        <hr></hr>
      </InputForm>
    </>
  );
};

export default SignupInput;
