import styled from 'styled-components';
import SignupImgInput from './SignupImgInput';
import { useSelector, useDispatch } from 'react-redux';
import { setArtist } from '../../../reducer/signupSlice';
const ArtistBox = styled.div`
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

const ArtistInput = () => {
  const isArtist = useSelector((state) => state.signup.calssification);

  const artist = useSelector((state) => state.signup.artist);
  const dispatch = useDispatch();
  const onChange = (e) => {
    const { value, name } = e.target;
    if (isArtist) {
      dispatch(setArtist({ ...artist, [name]: value }));
    }
  };

  return (
    <>
      {isArtist && (
        <ArtistBox>
          <label htmlFor='group'>그룹명</label>
          <div className='input-box'>
            <input type='text' id='group' name='group' onChange={onChange} placeholder='그룹명'></input>
            <HrTag className='hrtag' />
          </div>
          <hr></hr>
          <SignupImgInput label={'그룹 이미지'} name={'group'} />
        </ArtistBox>
      )}
    </>
  );
};
export default ArtistInput;
