import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const WithdrawalBtn = styled.button`
  color: var(--gray-blue-400);
  font-size: 13.5px;
  font-weight: 500;
  display: block;
  cursor: pointer;
  margin-top: 50px;
`;

const WithdrawalButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleWithdrawal = async () => {
    try {
      // 탈퇴를 위한 API 호출
      const response = await axios.delete(`/userdata/${id}`);

      // 응답 상태코드가 200인 경우 탈퇴 성공
      if (response.status === 200) {
        // 탈퇴가 성공적으로 이루어지면 로그아웃 또는 리디렉션 등을 수행할 수 있습니다.
        alert('탈퇴되었습니다.');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //   alert('탈퇴되었습니다.');
  //   navigate('/');

  return <WithdrawalBtn onClick={handleWithdrawal}>루미안 계정 탈퇴하기</WithdrawalBtn>;
};

export default WithdrawalButton;
