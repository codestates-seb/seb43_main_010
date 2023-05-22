import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFanProfile, setArtistProfile, setArtistGroupImg, resetProfile } from '../../../reducer/signupSlice';

const ImgInputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  input {
    display: none;
  }
  label {
    height: 16px;
    font-size: 13px;
    line-height: 18.2px;
    color: rgb(109, 109, 109);
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
const IconBox = styled.div`
  width: 21px;
  height: 21px;
  border: 1px solid #95c788;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    transform: scale(1.1, 1.1);
  }
  .i-plus-artist-icon::before {
    color: #1cbec8;
  }
  .i-trash-icon::before {
    color: #1cbec8;
  }
`;

const Preview = styled.div`
  margin: 25px auto 0px;
  width: 60%;
  /* border: 1px solid #95c788;
  border-radius: 5px; */

  img {
    width: 100%;
    height: 237px;
    object-fit: cover;
    /* height: 50px; */
  }

  @media screen and (max-width: 767px) {
    width: 35%;
    min-width: 165px;
    min-height: 165px;
    img {
      width: 100%;
      min-height: 165px;
    }
  }
`;

const SignupImgInput = ({ label, name }) => {
  //이미지 업로드를 위한 input 제어를 위함
  // input 태그에 접근
  const imgInput = useRef();

  //  버튼 클릭시 input 태그에 클릭이벤트 매핑
  const onClickImgUpload = (e) => {
    e.preventDefault();
    imgInput.current.click();
  };

  //fan, artist profile , groupImg 전역 상태 가져오기
  const isArtist = useSelector((state) => state.signup.calssification);
  const fanProfile = useSelector((state) => state.signup.fan.profile);
  const artistProfile = useSelector((state) => state.signup.artist.profile);
  const artistGroupProfile = useSelector((state) => state.signup.artist.groupProfile);
  const dispatch = useDispatch();

  //전역 상태에 저장
  const saveImg = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = imgInput.current.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      if (isArtist) {
        if (e.target.name === 'group') {
          dispatch(setArtistGroupImg(reader.result));
        } else {
          dispatch(setArtistProfile(reader.result));
        }
      } else {
        dispatch(setFanProfile(reader.result));
      }
    };
    e.target.value = '';
  };
  // profile 상태 초기화
  const deleteImg = (e) => {
    e.preventDefault();
    if (isArtist) {
      if (e.target.id === 'group') {
        dispatch(resetProfile('group'));
      } else {
        dispatch(resetProfile('artist'));
      }
    } else {
      dispatch(resetProfile('fan'));
    }
  };
  return (
    <>
      <ImgInputBox>
        <label htmlFor={name}>
          {label}
          <IconBox onClick={onClickImgUpload}>
            <i id={name} className='i-plus-artist-icon' />
          </IconBox>
          <IconBox onClick={deleteImg}>
            <i id={name} className='i-trash-icon' />
          </IconBox>
        </label>
        <input
          className={name}
          type='file'
          id={name}
          name={name}
          placeholder='이미지업로드'
          accept='image/*'
          ref={imgInput}
          onChange={saveImg}
        ></input>
      </ImgInputBox>
      <Preview>
        <img src={isArtist ? (name === 'group' ? artistGroupProfile : artistProfile) : fanProfile} alt='profile-img'></img>
      </Preview>
    </>
  );
};

export default SignupImgInput;
