import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removeCookie } from '../../Login/LoginMaterial/setCookie';
import { logout, setCurrentUser } from '../../../reducer/userSlice';
import { resetCommunity } from '../../../reducer/communitySlice';
import { useSelector, useDispatch } from 'react-redux';

const WithdrawalBtn = styled.button`
  color: var(--gray-blue-400);
  font-size: 13.5px;
  font-weight: 500;
  display: block;
  cursor: pointer;
  margin-top: 50px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: var(--white-100);
  width: 428px;
  height: 302px;
  border-radius: 14px;
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ModalTextBold = styled.div`
  font-size: 12.8px;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 15px;
`;

const ModalBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 60px;
`;

const ConfirmBtn = styled.button`
  width: 170px;
  height: 50px;
  font-size: 15px;
  font-weight: bold;
  color: var(--skyblue-500);
`;

const CancelBtn = styled(ConfirmBtn)`
  background-color: var(--white-100);
  color: var(--dark-blue-900);
`;

const WithdrawalButton = () => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWithdrawal = async () => {
    dispatch(setCurrentUser(null));
    removeCookie();
    dispatch(logout());
    dispatch(resetCommunity());
    alert('탈퇴되었습니다.');
    navigate('/');
  };

  const handleCancelBtnClick = () => {
    setShowModal(false);
  };

  const handleConfirmBtnClick = () => {
    setShowModal(false);
    handleWithdrawal();
  };

  return (
    <>
      <WithdrawalBtn onClick={() => setShowModal(true)}>루미안 계정 탈퇴하기</WithdrawalBtn>
      {showModal && (
        <ModalWrapper>
          <ModalContent>
            <ModalTitle>탈퇴하시겠습니까?</ModalTitle>
            <ModalTextBold>재가입 시 계정이 복구되지 않습니다.</ModalTextBold>
            <ModalBtnWrapper>
              <CancelBtn onClick={handleCancelBtnClick}>취소</CancelBtn>
              <ConfirmBtn onClick={handleConfirmBtnClick}>탈퇴</ConfirmBtn>
            </ModalBtnWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default WithdrawalButton;

// import React from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';

// const WithdrawalBtn = styled.button`
//   color: var(--gray-blue-400);
//   font-size: 13.5px;
//   font-weight: 500;
//   display: block;
//   cursor: pointer;
//   margin-top: 50px;
// `;

// const WithdrawalButton = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const handleWithdrawal = async () => {
//     try {
//       // 탈퇴를 위한 API 호출
//       // const response = await axios.delete(`/userdata/${id}`);

//       // 응답 상태코드가 200인 경우 탈퇴 성공
//       // if (response.status === 200) {
//       // 탈퇴가 성공적으로 이루어지면 로그아웃 또는 리디렉션 등을 수행할 수 있습니다.
//       alert('탈퇴되었습니다.');
//       setTimeout(() => {
//         navigate('/');
//       }, 1000);
//       // }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return <WithdrawalBtn onClick={handleWithdrawal}>루미안 계정 탈퇴하기</WithdrawalBtn>;
// };

// export default WithdrawalButton;
