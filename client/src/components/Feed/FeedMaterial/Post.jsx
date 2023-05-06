import { useState } from 'react';
import styled from 'styled-components';
import thumbsUpFill from '../../../assets/svg-file/thumbs-up-fill.svg';

import EditDeleteModal from './EditDeleteModal';
import DetailPost from './DetailPost';

const PostBlock = styled.div`
  width: 707px;
  height: auto;

  .top {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 28px;

    .profile-img {
      width: 36px;
      height: 36px;
      background: ${({ img }) => (img ? `url(${img})` : 'none')};
      background-size: 36px 36px;
    }

    .user-txt-box {
      transform: translateX(8px);
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    .nickname {
      color: var(--dark-blue-900);
      font-size: 14px;
      font-weight: 700;
    }

    .time {
      color: var(--light-gray-500);
      font-size: 12px;
      text-shadow: 0 0 0 var(--light-gray-500);
      margin-top: 3px;
    }
  }

  .mid {
    color: var(--dark-blue-900);
    font-size: 15px;
    text-shadow: 0 0 0 var(--dark-blue-900);
    padding: 16px 0 0 0;
    line-height: 125%;
    cursor: pointer;

    text-align: start;

    .more {
      color: #bababa;
      font-size: 13.5px;
      text-shadow: 0 0 0 #bababa;
    }
  }

  .bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--light-gray-200);

    button {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .left-icon {
      display: flex;
      justify-content: start;
      align-items: center;
      color: var(--gray-700);
    }

    .thumbs-up {
      font-size: 23px;
      display: flex;
      justify-content: center;
      align-items: center;

      .num {
        color: var(--gray-900);
        font-size: 14px;
        text-shadow: 0 0 0 var(--gray-900);
        transform: translateX(-5px) translateY(1px);
      }

      .thumbs-up-btn {
        font-size: 23px;
        height: 37px;
        width: 37px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-5px);
        border-radius: 7px;

        &:hover {
          background-color: var(--light-gray-100);
          transition: 0.15s;
        }

        .thumbs-up-fill {
          width: 23px;
          transform: translateY(2px);
        }
      }
    }

    .bubble-up {
      font-size: 22px;
      margin-left: 30px;

      i {
        height: 37px;
        width: 37px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-20px);
        border-radius: 7px;

        &:hover {
          background-color: var(--light-gray-100);
          transition: 0.15s;
        }
      }
    }

    .right-icon-box {
      position: relative;
    }

    .right-icon {
      width: 37px;
      height: 37px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transform: translateX(14px);
      cursor: pointer;

      &:hover {
        background-color: var(--light-gray-100);
        transition: 0.15s;
      }

      .mini-menu {
        font-size: 16px;
        i::before {
          color: var(--light-gray-400);
        }
      }
    }

    .comment-num {
      color: var(--gray-900);
      font-size: 14px;
      text-shadow: 0 0 0 var(--gray-900);
      transform: translateX(-20px) translateY(0.6px);
    }
  }
`;

const Post = ({ createdAt, nickname, content, img, LikeNum, commentNum }) => {
  const [liked, setLiked] = useState(false); // 좋아요 여부
  const [like, setLike] = useState(LikeNum);
  const [openModal, setOpenModal] = useState(false);
  const [detailPost, setDetailPost] = useState(false);

  const clickLike = () => {
    setLiked(!liked);
    if (!liked) {
      setLike(like + 1);
    } else {
      setLike(like - 1);
    }
    // 서버한테 바뀐 좋아요 데이터 전송 해야함
  };

  const clickMiniMenu = () => {
    setOpenModal(!openModal);
  };

  const openDetailPost = () => {
    setDetailPost(true);
  };

  return (
    <>
      <PostBlock img={img}>
        {/* 위 */}
        <div className='top'>
          <div className='profile'>
            <div className='profile-img'></div>
          </div>

          <div className='user-txt-box'>
            <div className='nickname'>{nickname}</div>
            <span className='time'>{createdAt}</span>
          </div>
        </div>

        {/* 중간 */}
        <button onClick={openDetailPost} className='mid'>
          {content.length > 670 ? (
            <p className='post-content'>
              {content.slice(0, 670) + '...'}
              <button className='more'>더 보기</button>
            </p>
          ) : (
            <p className='post-content'>{content}</p>
          )}
        </button>

        {/* 아래 */}
        <div className='bottom'>
          <div className='left-icon'>
            <div className='thumbs-up'>
              <button onClick={clickLike} className='thumbs-up-btn'>
                {liked ? (
                  <div className='thumbs-up-fill'>
                    <img src={thumbsUpFill} alt='like' />
                  </div>
                ) : (
                  <i className='i-thumbs-up-icon' />
                )}
              </button>
              {like === 0 ? null : <span className='num'>{like}</span>}
            </div>

            <button onClick={openDetailPost} className='bubble-up'>
              <i className='i-bubble-icon' />
            </button>
            {commentNum === 0 ? null : <span className='comment-num'>{commentNum}</span>}
          </div>

          <div className='right-icon-box'>
            <button onClick={clickMiniMenu} className='right-icon'>
              <div className='mini-menu'>
                <i className='i-three-point-menu-icon' />
              </div>
            </button>
            {/* 게시글 수정, 삭제 모달 */}
            {openModal ? <EditDeleteModal openModal={openModal} setOpenModal={setOpenModal} /> : null}
          </div>
        </div>
      </PostBlock>
      {/* 디테일 포스트 컴포넌트임 => DetailPost 컴포넌트 */}
      {detailPost ? <DetailPost detailPost={detailPost} setDetailPost={setDetailPost} content={content} /> : null}
    </>
  );
};

export default Post;
