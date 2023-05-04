import React, { useState } from 'react';
import styled from 'styled-components';

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 670px;
  min-height: 727px;
  margin-left: 72px;
  padding: 51px 49px;
  border-radius: 16px;
  background-color: var(--white-100);
  box-sizing: border-box;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: var(--gray-980);
  margin-bottom: 32px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  color: var(--dark-blue-850);
  font-size: 14px;
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

const InfoText = styled.span`
  font-size: 14px;
  color: var(--dark-blue-850);
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

  const handleChange = (e, field) => {
    setInfo({ ...info, [field]: e.target.value });
  };

  const handleSaveButtonClick = (field) => {
    // 정보 저장 기능 구현
    setShowInput({ ...showInput, [field]: false });
  };

  const handleEditButtonClick = (field) => {
    setShowInput({ ...showInput, [field]: true });
  };

  const editButton = (field, label) => (
    <div>
      <Label htmlFor={field}>{label}</Label>
      {showInput[field] ? (
        <div>
          <Input type={field === 'password' ? 'password' : 'text'} id={field} value={info[field]} onChange={(e) => handleChange(e, field)} />
          <Button onClick={() => handleSaveButtonClick(field)}>저장</Button>
        </div>
      ) : (
        <div>
          <InfoText>{info[field]}</InfoText>
          <Button onClick={() => handleEditButtonClick(field)}>변경</Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <RightBox>
        <Title>내 정보</Title>
        <div>
          {editButton('email', '이메일')}
          {editButton('nickname', '닉네임')}
          {editButton('name', '이름')}
          {editButton('password', '비밀번호')}
          <div>
            <Title>연결된 SNS 계정</Title>
            <Button>연결하기</Button>
          </div>
        </div>
      </RightBox>
      {/* <Footer /> */}
    </>
  );
};

export default MyInfoRight;
