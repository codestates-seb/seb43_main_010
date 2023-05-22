import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';

const EditDeleteModalBlock = styled.div`
  position: absolute;
  min-width: 150px;
  height: 93px;
  background-color: var(--white-100);
  border-radius: 9px;
  box-shadow: 0 2px 10px rgb(19, 28, 35, 17%);

  display: ${({ deleteModal }) => (deleteModal ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  flex-direction: column;

  top: ${({ top }) => (top ? top : null)};
  left: ${({ left }) => (left ? left : null)};
  right: ${({ right }) => (right ? right : null)};
  transform: ${({ transform }) => (transform ? transform : null)};

  button {
    padding: 0 8px 0 8px;
    height: 39.5px;
    width: 138px;
    font-size: 14px;

    &:hover {
      background-color: var(--light-gray-100);
      border-radius: 6px;
      transition: 0.3s;
    }

    span {
      color: var(--gray-850);
      font-weight: 600;
      margin-left: 10px;
    }

    i {
      font-size: 15px;
    }
  }
  .delete {
    margin-top: 2px;
  }

  .pen {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-20px);
    i {
      font-size: 17px;
    }
  }

  .trash {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-20px);
  }
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => (height ? `calc(100% + ${height}px)` : ' 100%')};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : 'rgba(0, 0, 0, 0.7)')};
  border-radius: ${({ radius }) => (radius ? radius : null)};
`;

const ModalBg = styled.div`
  width: 428px;
  height: 190px;
  border-radius: 14px;
  background-color: var(--white-100);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .ques {
    font-size: 14px;
    color: var(--dark-blue-900);
    text-shadow: 0 0 0 var(--dark-blue-900);
    margin: 38px 0 47px 0;
  }

  // 버튼 구역
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cancel {
    font-size: 15px;
    font-weight: 800;
    color: var(--dark-blue-900);
    width: 170px;
    height: 50px;
    border-radius: 8px;

    &:hover {
      background-color: var(--light-gray-100);
      transition: 0.13s;
    }
  }

  .ok {
    font-size: 15px;
    font-weight: 800;
    color: var(--skyblue-500);
    width: 170px;
    height: 50px;
    border-radius: 8px;
    margin-left: 40px;

    &:hover {
      background-color: var(--skyblue-100);
      transition: 0.13s;
    }
  }
`;

const SuccessMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 130px;
  height: 39.5px;
  border-radius: 35px;
  color: var(--white-100);
  font-size: 13.5px;
  font-weight: 700;
  background: linear-gradient(-45deg, #1cbec8, #ffc022);
  border-radius: 5px;
  transform: translateX(20px);
`;

function openDeleteModalBg() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function closeDeleteModalBg() {
  document.body.style.overflow = 'unset';
  document.body.style.paddingRight = '0px';
}

// 상위에서 const [openModal, setOpenModal] = useState(false);와
// const [deleteModal, setDeleteModal] = useState(false);를 써주고, props로 받아와야 함.
const CopyDeleteModalMusic = ({
  top,
  left,
  right,
  transform,
  height,
  bgColor,
  radius,
  openModal,
  setOpenModal,
  deleteModal,
  setDeleteModal,
  what,
  commentContent,
}) => {
  const modalRef = useRef(null);
  const deleteRef = useRef(null);

  const [clipboard, setClipboard] = useState(false);

  // 댓글 복사
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setClipboard(true);
        setTimeout(() => {
          setClipboard(false);
          setOpenModal(false);
        }, 3000);
      })
      .catch(() => {
        alert('복사에 실패했습니다.');
      });
  };

  // 수정, 삭제가 뜨는 미니 모달
  useEffect(() => {
    const clickOut = (e) => {
      if (openModal && modalRef.current && !deleteRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener('mousedown', clickOut);
    return () => {
      document.removeEventListener('mousedown', clickOut);
    };
  }, [openModal]);

  // delete 모달
  useEffect(() => {
    const clickOut = (e) => {
      if (deleteModal && deleteRef.current && !deleteRef.current.contains(e.target)) {
        closeDeleteModalBg();
        setDeleteModal(false);
        setOpenModal(false);
      }
    };
    document.addEventListener('mousedown', clickOut);
    return () => {
      document.removeEventListener('mousedown', clickOut);
    };
  }, [deleteModal]);

  const openDeleteModal = () => {
    setDeleteModal(true);
    openDeleteModalBg();
  };

  const clickCancelFn = () => {
    closeDeleteModalBg();
    setDeleteModal(false);
    setOpenModal(false);
  };

  const clickOkFn = () => {
    // !!!여기에서 서버한테 포스트 or 댓글 삭제하는 거 보내야 함!!!
    if (what === '포스트를') {
      // 포스트 삭제
    } else {
      // 댓글 삭제
    }
    closeDeleteModalBg();
    setDeleteModal(false);
    setOpenModal(false);
  };

  return (
    <>
      <EditDeleteModalBlock ref={modalRef} top={top} left={left} right={right} transform={transform} deleteModal={deleteModal}>
        <button onClick={() => handleCopy(commentContent)} className='edit'>
          <div className='pen'>
            {!clipboard && <i className='i-share-icon' />}

            {clipboard ? <SuccessMsg>복사 완료</SuccessMsg> : <span>복사하기</span>}
          </div>
        </button>
        {/* 포스트가 삭제되는 곳 */}
        <button onClick={openDeleteModal} className='delete'>
          <div className='trash'>
            <i className='i-trash-icon' />
            <span>삭제하기</span>
          </div>
        </button>
      </EditDeleteModalBlock>

      {/* 포스트 삭제 여부 모달 */}
      {deleteModal ? (
        <DeleteModal height={height} bgColor={bgColor} radius={radius}>
          <ModalBg ref={deleteRef}>
            <div className='ques'>{`이 ${what} 삭제하시겠습니까?`}</div>
            <div className='btn-box'>
              <button className='cancel' onClick={clickCancelFn}>
                취소
              </button>
              <button className='ok' onClick={clickOkFn}>
                확인
              </button>
            </div>
          </ModalBg>
        </DeleteModal>
      ) : null}

      {/* 복사 */}
    </>
  );
};

export default CopyDeleteModalMusic;
