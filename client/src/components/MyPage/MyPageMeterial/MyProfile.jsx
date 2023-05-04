import React, { useState } from 'react';
import styled from 'styled-components';

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftBox = styled.div`
  width: 334px;
  height: 208px;
  margin-top: 166px;
  border-radius: 16px;
  background-color: var(--white-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.span`
  font-size: 23px;
  font-weight: bold;
  color: var(--gray-980);
  margin-bottom: 20px;
  display: block;
`;

const Email = styled.span`
  font-size: 23px;
  font-weight: bold;
  color: var(--gray-980);
  margin-bottom: 20px;
  display: block;
`;

const LogoutBtn = styled.button`
  /* width: 48px; */
  height: 16px;
  color: var(--gray-blue-400);
  font-size: 13px;
  display: block;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 334px;
  height: 669px;
  margin-top: 23px;
`;

const Title = styled.span`
  font-size: 23px;
  font-weight: bold;
  color: var(--gray-980);
  margin-bottom: 20px;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 334px;
  height: 215px;
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: var(--white-100);
`;

const DeleteBtn = styled.button`
  width: 60px;
  position: absolute;
  top: 0;
  right: 0;
  height: 16px;
  color: var(--gray-blue-400);
  font-size: 13px;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
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
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ModalBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
`;

const CancelBtn = styled(ModalBtn)`
  background-color: var(--white-100);
  color: var(--dark-blue-900);
`;

const MyProfile = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteBtnClick = () => {
    setShowModal(true);
  };

  const handleCancelBtnClick = () => {
    setShowModal(false);
  };

  const handleConfirmBtnClick = () => {
    // TODO: Handle delete action
    setShowModal(false);
  };

  return (
    <>
      <LeftWrapper>
        <LeftBox>
          <Name>TATA-V</Name>
          <Email>tata-v@example.com</Email>
          <LogoutBtn>로그아웃</LogoutBtn>
        </LeftBox>
        <Container>
          <Title>나의 프로필</Title>
          <Box>
            <Name>TATA-V</Name>
            <DeleteBtn onClick={handleDeleteBtnClick}>커뮤니티 탈퇴하기</DeleteBtn>
          </Box>
          <Box>
            <Name>TATA-V</Name>
            <DeleteBtn onClick={handleDeleteBtnClick}>커뮤니티 탈퇴하기</DeleteBtn>
          </Box>
          <Box>
            <Name>TATA-V</Name>
            <DeleteBtn onClick={handleDeleteBtnClick}>커뮤니티 탈퇴하기</DeleteBtn>
          </Box>
        </Container>
      </LeftWrapper>
      {showModal && (
        <ModalWrapper>
          <ModalContent>
            <ModalTitle>커뮤니티를 탈퇴하시겠습니까?</ModalTitle>
            <p>✰ 커뮤니티를 탈퇴하더라도 내가 작성한 콘텐츠는 삭제되지 않습니다. 프로필 사진과 닉네임도 함께 유지되어 노출됩니다.</p>
            <p>✰ 커뮤니티 내 모든 구독 정보가 초기화됩니다.</p>
            <p>✰ 커뮤니티의 MY 프로필 화면을 볼 수 없습니다. ✰ 이 커뮤니티에서 진행된 혜택을 행사할 수 없습니다.</p>
            <p>일부 정보와혜택은 재가입해도 복구되지 않습니다.</p>
            <ModalBtnWrapper>
              <CancelBtn onClick={handleCancelBtnClick}>취소</CancelBtn>
              <ModalBtn onClick={handleConfirmBtnClick}>확인</ModalBtn>
            </ModalBtnWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default MyProfile;
