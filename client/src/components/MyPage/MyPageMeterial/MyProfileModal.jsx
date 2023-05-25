import React from 'react';
import styled from 'styled-components';

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
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const ModalTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ModalText = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
`;

const ModalTextBold = styled.div`
  font-size: 12.8px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ModalBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

const Star = styled.span`
  margin-right: 10px;
`;

const CommunityModal = ({ showModal, handleCancelBtnClick, handleConfirmBtnClick }) => {
  return (
    <>
      {showModal && (
        <ModalWrapper>
          <ModalContent>
            <ModalTitle>커뮤니티를 탈퇴하시겠습니까?</ModalTitle>
            <ModalText>
              <Star>✰</Star>커뮤니티를 탈퇴하더라도 내가 작성한 콘텐츠는 삭제되지 않습니다. 프로필 사진과 닉네임도 함께 유지되어 노출됩니다.
            </ModalText>
            <ModalText>
              <Star>✰</Star>커뮤니티 내 모든 구독 정보가 초기화됩니다.
            </ModalText>
            <ModalText>
              <Star>✰</Star>커뮤니티의 MY 프로필 화면을 볼 수 없습니다.
            </ModalText>
            <ModalText>
              <Star>✰</Star>이 커뮤니티에서 진행된 혜택을 행사할 수 없습니다.
            </ModalText>
            <ModalTextBold>일부 정보와 혜택은 재가입해도 복구되지 않습니다.</ModalTextBold>
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

export default CommunityModal;
