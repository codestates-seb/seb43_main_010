import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';

const EditDeleteModalBlock = styled.div`
  position: absolute;
  min-width: 150px;
  height: 52px;
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

const CopyModal = ({ top, left, right, transform, openCopy, setOpenCopy, deleteModal, content }) => {
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
          setOpenCopy(false);
        }, 3000);
      })
      .catch(() => {
        alert('복사에 실패했습니다.');
      });
  };

  // 수정, 삭제가 뜨는 미니 모달
  useEffect(() => {
    const clickOut = (e) => {
      if (openCopy && modalRef.current && !deleteRef.current && !modalRef.current.contains(e.target)) {
        setOpenCopy(false);
      }
    };
    document.addEventListener('mousedown', clickOut);
    return () => {
      document.removeEventListener('mousedown', clickOut);
    };
  }, [openCopy]);

  return (
    <>
      <EditDeleteModalBlock ref={modalRef} top={top} left={left} right={right} transform={transform} deleteModal={deleteModal}>
        <button onClick={() => handleCopy(content)} className='edit'>
          <div className='pen'>
            {!clipboard && <i className='i-share-icon' />}

            {clipboard ? <SuccessMsg>복사 완료</SuccessMsg> : <span>복사하기</span>}
          </div>
        </button>
      </EditDeleteModalBlock>
    </>
  );
};

export default CopyModal;
