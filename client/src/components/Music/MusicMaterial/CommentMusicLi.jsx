import styled from 'styled-components';
import { useState } from 'react';

import CopyDeleteModalMusic from './CopyDeleteModalMusic';

const CommentMusicLiBlock = styled.li`
  min-height: 120px;
  padding: 18px 20px 14px 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 14px rgb(255, 255, 255, 0.04);
  border-bottom: 1.5px solid #2d363f;

  .name-time-menu {
    display: flex;
    justify-content: space-between;
  }

  .username {
    color: var(--light-gray-100);
    font-size: 13.5px;
    font-weight: 600;
  }

  .time {
    color: var(--light-gray-400);
    font-size: 11px;
    text-shadow: 0 0 0 var(--light-gray-400);
    padding-left: 10px;
  }

  .music-comment {
    color: var(--light-gray-200);
    font-size: 13.5px;
    text-shadow: 0 0 0 var(--light-gray-200);
  }
`;

const RightIconBox = styled.div`
  position: relative;

  .right-icon {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transform: translateX(9px);
    transition: 0.08s;
    transform: translate(13px, -5px);
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
      transition: 0.08s;
    }

    .mini-menu {
      font-size: 16px;
      i::before {
        color: var(--light-gray-400);
      }
    }
  }
`;

const LikedAndNum = styled.div`
  margin: 17px 0 0 -0.8px;

  .comment-like {
    min-width: 28px;
    height: 26px;
    border-radius: 4px;
    background-color: transparent;
    transition: 0.08s;
    padding: 0 6px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      transition: 0.08s;
      i::before {
        color: #1beaef;
        transition: 0.08s;
      }
    }

    i {
      font-size: 16px;
      &::before {
        color: var(--light-gray-400);
      }
      &:hover {
      }
    }
  }

  .like-num {
    color: var(--light-gray-400);
    font-size: 12px;
    font-weight: 700;
    padding-left: 5px;
  }
`;

const CommentMusicLi = ({ commentName, commentContent, likeNum, createAt }) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likeNum);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleMiniMenu = () => {
    setOpenModal(!openModal);
  };

  const clickLike = () => {
    setLiked(!liked);
    if (!liked) {
      setLike(like + 1);
    } else {
      setLike(like - 1);
    }
    // 서버한테 바뀐 좋아요 데이터 전송 해야함
  };

  return (
    <CommentMusicLiBlock>
      <div className='name-time-menu'>
        <p className='name-time'>
          <span className='username'>{commentName}</span>
          <span className='time'>{createAt}</span>
        </p>

        <RightIconBox>
          <button onClick={toggleMiniMenu} className='right-icon'>
            <div className='mini-menu'>
              <i className='i-three-point-menu-icon' />
            </div>
          </button>
          {openModal ? (
            <CopyDeleteModalMusic
              top='100%'
              right='0'
              openModal={openModal}
              setOpenModal={setOpenModal}
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              what='댓글을'
              commentContent={commentContent}
            />
          ) : null}
        </RightIconBox>
      </div>

      <pre className='music-comment'>{commentContent}</pre>
      <LikedAndNum>
        <button onClick={clickLike} className='comment-like'>
          {liked ? (
            <svg width='17' height='15' viewBox='0 0 27 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M6.56533 12.1305L0.260986 12.1561V24.7392L6.7078 24.4534L6.56533 12.1305Z' fill='url(#paint0_linear_43_3628)' />
              <path
                d='M25.0757 23.7383L26.7306 10.0113C26.7502 9.85023 26.7365 9.6867 26.6904 9.53156C26.6443 9.37643 26.5669 9.23324 26.4633 9.11151C26.3597 8.98979 26.2324 8.89231 26.0897 8.82556C25.947 8.75881 25.7922 8.72432 25.6356 8.72437H16.8097C16.5171 8.72437 16.2364 8.60385 16.0295 8.38933C15.8227 8.1748 15.7064 7.88384 15.7064 7.58045V4.1487C15.7066 3.35527 15.4417 2.58629 14.9567 1.97259C14.4717 1.3589 13.7965 0.938424 13.0462 0.782715L7.9837 11.2825V24.7392H23.9808C24.2495 24.7393 24.5091 24.6377 24.7107 24.4534C24.9123 24.2691 25.0421 24.0148 25.0757 23.7383Z'
                fill='url(#paint1_linear_43_3628)'
              />
              <defs>
                <linearGradient id='paint0_linear_43_3628' x1='9.08707' y1='7.7175' x2='23.5871' y2='24.1088' gradientUnits='userSpaceOnUse'>
                  <stop offset='0.0567946' stopColor='#1CBEC8' />
                  <stop offset='1' stopColor='#7A99A4' />
                </linearGradient>
                <linearGradient id='paint1_linear_43_3628' x1='9.08707' y1='7.7175' x2='23.5871' y2='24.1088' gradientUnits='userSpaceOnUse'>
                  <stop offset='0.0567946' stopColor='#1CBEC8' />
                  <stop offset='1' stopColor='#7A99A4' />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <i className='i-thumbs-up-icon' />
          )}
          {like !== 0 && <span className='like-num'>{like}</span>}
        </button>
      </LikedAndNum>
    </CommentMusicLiBlock>
  );
};

export default CommentMusicLi;
