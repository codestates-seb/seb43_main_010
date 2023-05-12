import React, { useState } from 'react';
import styled from 'styled-components';

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
  margin-bottom: 34px;
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
  margin-top: 129px;

  /* &:hover {
    font-weight: bold;
  } */
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

  // const handleClick = () => {
  //   const kakaoAppKey = 'YOUR_KAKAO_APP_KEY'; // 여기에 카카오 앱 키를 넣기
  //   const redirectUri = 'YOUR_REDIRECT_URI'; // 여기에 리디렉트 URI를 넣기
  //   const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoAppKey}&redirect_uri=${redirectUri}&response_type=code`;

  //   window.location.assign(authUrl);
  // };

  const FieldInput = ({ field, label }) => {
    const [inputValue, setInputValue] = useState(info[field]);
    const isEmail = field === 'email';
    const isPassword = field === 'password';

    const handleChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleSaveButtonClick = () => {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [field]: isPassword ? '●'.repeat(inputValue.length) : inputValue, // 변경된 비밀번호를 ● 기호로 표시
      }));
      setShowInput((prevShowInput) => ({
        ...prevShowInput,
        [field]: false,
      }));
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
      </div>
    );
  };

  return (
    <>
      <RightBox>
        <Title>내 정보</Title>
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
            <ConnectButton>연결하기</ConnectButton>
            {/* <ConnectButton onClick={handleClick}>연결하기</ConnectButton> */}
          </KakaoContainer>
        </div>
        <WithdrawalBtn>루미안 계정 탈퇴하기</WithdrawalBtn>
      </RightBox>
    </>
  );
};

export default MyInfoRight;
