import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import profile from '../../../assets/jpg-file/profile-img.jpg';
import { pwdValidation } from '../../Signup/validation.js';

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 900;
  color: var(--gray-980);
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
`;

const Input = styled.input`
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-blue-850);
  border: 1px solid var(--gray-blue-200);
  padding: 4px 8px;

  &:focus {
    outline: none;
    border-color: var(--gray-blue-400);
    box-shadow: 0 0 3px var(--gray-blue-200);
  }
`;

const Button = styled.button`
  width: 50px;
  height: 32px;
  border: 1px solid var(--skyblue-500);
  border-radius: 4px;
  color: var(--skyblue-500);
  font-size: 13.5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    border: 3px solid var(--skyblue-600);
  }
`;

const ConnectButton = styled(Button)`
  width: 74px;
  margin-left: auto;
`;

const InfoText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-blue-850);
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;

const KakaoContainer = styled.div`
  margin-top: 35px;
  display: flex;
  align-items: center;

  button {
    margin-right: 8px;
  }
`;

const Kakao = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: 8px;
`;

const KakaoIcon = styled.i`
  width: 22px;
  height: 22px;
`;

const WithdrawalBtn = styled.button`
  color: var(--gray-blue-400);
  font-size: 13.5px;
  font-weight: 500;
  display: block;
  cursor: pointer;
  margin-top: 50px;

  /* &:hover {
    font-weight: bold;
  } */
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
  const [info, setInfo] = useState({
    email: 'tata-v@example.com',
    nickname: 'TATA-V',
    name: 'TATA-V',
    password: '●●●●●●●●',
  });

  const [showInput, setShowInput] = useState({
    email: false,
    nickname: false,
    name: false,
    password: false,
  });

  const [profileImage, setProfileImage] = useState(profile);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    //사용자가 이미지를 업로드하면 이미지를 읽어 profileImage 상태 변수에 저장하는 역할
    const file = e.target.files[0]; //이벤트 객체에서 업로드된 파일 목록 가져와서 file 변수에 저장
    const reader = new FileReader(); //객체를 생성하고 파일 읽고, 파일을 비동기적으로 읽는데 사용

    reader.onloadend = () => {
      //성공적으로 읽힌 후 실행될 콜백 함수를 등록
      setProfileImage(reader.result); //콜백함수에서 reader.result를 사용하여 읽는 데이터를 가져와 setProfileImage를 호출하여 상태 변수 profileImage에 저장, 이미지가 프로필 이미지가 표시되고 사용자 인터페이스가 업데이트
    };

    if (file) {
      reader.readAsDataURL(file); //파일이 존재하는 경우에만 호출, URL 형식으로 읽음
    }
  };

  // 카카오톡 연결하기
  const kakaohandleClick = () => {
    const kakaoAppKey = 'YOUR_KAKAO_APP_KEY'; // 여기에 카카오 앱 키를 넣기
    const redirectUri = 'YOUR_REDIRECT_URI'; // 여기에 리디렉트 URI를 넣기
    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoAppKey}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.assign(authUrl);
  };

  // 사용자 정보 변경(저장)
  const updateUserInfo = async (field, value, profileImage) => {
    try {
      const formData = new FormData(); // FormData 인스턴스를 생성합니다.
      formData.append(field, value); // 텍스트 형식의 필드와 그 값을 추가합니다.

      if (profileImage) {
        // profileImage가 제공되면 추가합니다.
        const file = dataURItoBlob(profileImage); // data URI를 Blob 형식으로 변환합니다.
        formData.append('profileImage', file); // 파일 형식의 필드를 추가합니다.
      }

      const response = await axios.patch('서버의 API 엔드포인트', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 요청 헤더에 콘텐츠 유형을 설정합니다.
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

  //루미안 탈퇴하기
  const handleWithdrawal = async () => {
    try {
      // 탈퇴를 위한 API 호출
      const response = await axios.delete('서버의 탈퇴 API 엔드포인트');

      // 응답 상태코드가 200인 경우 탈퇴 성공
      if (response.status === 200) {
        // 탈퇴가 성공적으로 이루어지면 로그아웃 또는 리디렉션 등을 수행할 수 있습니다.
        alert('탈퇴되었습니다.');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const FieldInput = ({ field, label }) => {
    const [inputValue, setInputValue] = useState(info[field]);
    const isEmail = field === 'email';
    const isPassword = field === 'password';

    const [errorMessage, setErrorMessage] = useState('');
    const [valid, setValid] = useState(true);

    const handleChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleSaveButtonClick = () => {
      let isValid = true;
      let errorMsg = '';

      if (isPassword) {
        [isValid, errorMsg] = pwdValidation(inputValue);
      }

      if (!isValid) {
        setErrorMessage(errorMsg);
        setValid(false);
        return;
      }

      setInfo((prevInfo) => ({
        ...prevInfo,
        [field]: isPassword ? '●'.repeat(inputValue.length) : inputValue, // 변경된 비밀번호를 ● 기호로 표시
      }));
      setShowInput((prevShowInput) => ({
        ...prevShowInput,
        [field]: false,
      }));
      setValid(true);
      updateUserInfo(field, inputValue, profileImage); // 서버에 변경된 정보 전송
    };

    const handleEditButtonClick = () => {
      setInputValue(info[field]);
      setShowInput((prevShowInput) => ({
        ...prevShowInput,
        [field]: true,
      }));
    };

    return (
      <div>
        <Label htmlFor={field}>{label}</Label>
        <ButtonContainer>
          {isEmail ? (
            <InfoText>{info[field]}</InfoText>
          ) : showInput[field] ? (
            <>
              <Input type={isPassword ? 'password' : 'text'} id={field} value={inputValue} onChange={handleChange} />
              <Button onClick={handleSaveButtonClick}>저장</Button>
            </>
          ) : (
            <>
              <InfoText>{info[field]}</InfoText>
              <Button onClick={handleEditButtonClick}>변경</Button>
            </>
          )}
        </ButtonContainer>
        {!valid && <ErrorText>{errorMessage}</ErrorText>}
      </div>
    );
  };

  return (
    <>
      <RightBox>
        <Title>내 정보</Title>
        <ProfileImage
          src={profileImage} //서버 URL
          alt='profile'
          onClick={() => fileInputRef.current.click()}
        />
        <ImageUpload ref={fileInputRef} type='file' id='image-upload' accept='image/*' onChange={handleImageUpload} />
        <FieldInput field='email' label='이메일' />
        <FieldInput field='nickname' label='닉네임' />
        <FieldInput field='name' label='이름' />
        <FieldInput field='password' label='비밀번호' />
        <div>
          <Title>연결된 SNS 계정</Title>
          <KakaoContainer>
            <button className='kakao'>
              <KakaoIcon className='i-kakao-icon' />
            </button>
            <Kakao>카카오톡</Kakao>
            <ConnectButton onClick={kakaohandleClick}>연결하기</ConnectButton>
          </KakaoContainer>
        </div>
        <WithdrawalBtn onClick={handleWithdrawal}>루미안 계정 탈퇴하기</WithdrawalBtn>
      </RightBox>
    </>
  );
};

export default MyInfoRight;
