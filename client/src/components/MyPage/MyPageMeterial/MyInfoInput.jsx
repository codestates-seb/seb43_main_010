import React, { useState } from 'react';
import styled from 'styled-components';
import { pwdValidation } from '../../Signup/validation.js';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
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

const InfoText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-blue-850);
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;

const FieldInput = ({ field, label, info, setInfo, showInput, setShowInput, profileImage, updateUserInfo }) => {
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

export default FieldInput;
