import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import profile from '../../../assets/jpg-file/profile-img.jpg';
import Withdrawal from './MyInfoWithdrawal';
import KakaoConnect from './MyInfoKakaoConnect';
import FieldInput from './MyInfoInput';

// font-weight
// 100: Thin
// 200: Extra Light (Ultra Light)
// 300: Light
// 400: Normal (Regular)
// 500: Medium
// 600: Semi Bold (Demi Bold)
// 700: Bold
// 800: Extra Bold (Ultra Bold)
// 900: Black (Heavy)

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 670px;
  height: 727px;
  box-sizing: border-box;
  margin-left: 72px;
  padding: 51px 49px;
  border-radius: 15px;
  background-color: var(--white-100);
  border: 1px solid var(--light-gray-150);
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 900;
  color: var(--gray-980);
  margin-bottom: 24px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover; //비율 유지
  margin-bottom: 34px;
`;

const ImageUpload = styled.input`
  display: none;
`;

const MyInfoRight = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const defaultProfileImage = profile;
  const [info, setInfo] = useState({
    email: currentUser.email,
    nickname: currentUser.nickname,
    name: currentUser.name,
    password: '●●●●●●●●',
  });

  const [showInput, setShowInput] = useState({
    email: false,
    nickname: false,
    name: false,
    password: false,
  });

  const [profileImage, setProfileImage] = useState(currentUser.profile || defaultProfileImage);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 사용자 정보 변경(저장)
  const updateUserInfo = async (field, value) => {
    try {
      const data = { [field]: value }; // 필드와 값을 가지는 객체 생성

      if (field === 'profileImage') {
        // 프로필 이미지 필드인 경우
        const file = dataURItoBlob(profileImage);
        data.profileImage = file; // 이미지 데이터를 추가
      }

      const response = await axios.patch('/userdata/patch', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('저장되었습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // data URI를 Blob으로 변환하는 함수
  function dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  return (
    <>
      <RightBox>
        <Title>내 정보</Title>
        <ProfileImage src={profileImage} alt='profile' onClick={() => fileInputRef.current.click()} />
        <ImageUpload ref={fileInputRef} type='file' id='image-upload' accept='image/*' onChange={handleImageUpload} />
        <FieldInput
          field='email'
          label='이메일'
          info={info}
          setInfo={setInfo}
          showInput={showInput}
          setShowInput={setShowInput}
          updateUserInfo={updateUserInfo}
        />
        <FieldInput
          field='nickname'
          label='닉네임'
          info={info}
          setInfo={setInfo}
          showInput={showInput}
          setShowInput={setShowInput}
          updateUserInfo={updateUserInfo}
        />
        <FieldInput
          field='name'
          label='이름'
          info={info}
          setInfo={setInfo}
          showInput={showInput}
          setShowInput={setShowInput}
          updateUserInfo={updateUserInfo}
        />
        <FieldInput
          field='password'
          label='비밀번호'
          info={info}
          setInfo={setInfo}
          showInput={showInput}
          setShowInput={setShowInput}
          updateUserInfo={updateUserInfo}
        />
        <div>
          <Title>연결된 SNS 계정</Title>
          <KakaoConnect />
        </div>
        <Withdrawal />
      </RightBox>
    </>
  );
};

export default MyInfoRight;
