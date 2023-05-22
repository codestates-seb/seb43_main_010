import styled from 'styled-components';
import profileImg from '../../../assets/jpg-file/profile-img.jpg';
import thumbsUpFill from '../../../assets/svg-file/thumbs-up-fill.svg';
import { useState } from 'react';

import CopyDeleteModal from './CopyDeleteModal';

const CommentsBlock = styled.li`
  overflow-x: hidden;
  background-color: var(--white-100);

  & {
    list-style: none;
  }
`;

const Comment = styled.div`
  padding: 13px 0 13px 19px;

  .right-icon-box {
    position: relative;
  }

  .more {
    color: var(--gray-blue-300);
    font-size: 13px;
    text-shadow: 0 0 0 var(--gray-blue-300);
  }

  .comments-author {
    display: flex;
    justify-content: space-between;
  }

  .user-img-txt {
    display: flex;
    margin-bottom: 7.5px;

    .profile-img {
      width: 32px;
      height: 32px;
      background: no-repeat url('${profileImg}');
      background-size: 32px 32px;
    }

    .user-txt {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: column;
      transform: translateX(8px);
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

  .mini-menu {
    width: 26px;
    height: 26px;
    font-size: 16px;
    transform: translateX(-13px) translateY(-2px);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: var(--light-gray-100);
      transition: 0.15s;
    }

    i::before {
      color: var(--light-gray-400);
    }
  }

  .comments-content {
    color: var(--dark-blue-900);
    font-size: 15px;
    text-shadow: 0 0 0 var(--dark-blue-900);
    padding: 0 23px 0 40px;
    line-height: 21px;
  }

  .bottom-icon {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 7px 33px 0 36.5px;

    .thumbs-up {
      font-size: 16px;
      width: 26px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      &:hover {
        background-color: var(--light-gray-100);
        transition: 0.15s;
      }
      i:before {
        color: var(--light-gray-500);
      }
    }

    .thumbs-up-fill {
      width: 16px;
      transform: translateY(1px);
    }

    .num {
      color: var(--gray-600);
      font-size: 13px;
      text-shadow: 0 0 0 var(--gray-600);
    }

    .bubble {
      font-size: 16px;
      transform: translateX(8px);
      width: 26px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      &:hover {
        background-color: var(--light-gray-100);
        transition: 0.15s;
      }
      i:before {
        color: var(--light-gray-500);
      }
    }
  }
`;

// 댓글 컴포넌트임
const MiniComments = ({ deleteModal, setDeleteModal, commentName, commentContent, likeNum, createAt }) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likeNum);
  const [openModal, setOpenModal] = useState(false);
  const [showAll, setShowAll] = useState(false); // 전체 내용 보여주는 여부

  const clickMiniMenu = () => {
    setOpenModal(!openModal);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
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
    <>
      <CommentsBlock>
        <Comment>
          <div className='comments-author'>
            <div className='user-img-txt'>
              <div className='profile-img'></div>
              <div className='user-txt'>
                <span className='nickname'>{commentName}</span>
                <span className='time'>{createAt}</span>
              </div>
            </div>
            <div className='right-icon-box'>
              <button onClick={clickMiniMenu} className='mini-menu'>
                <i className='i-three-point-menu-icon' />
              </button>
              {/* 게시글 수정, 삭제 모달 */}
              {openModal ? (
                <CopyDeleteModal
                  top='0%'
                  right='130%'
                  bgColor='rgba(0, 0, 0, 0.75)'
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  what='댓글을'
                  commentContent={commentContent}
                />
              ) : null}
            </div>
          </div>
          <div className='comments-content'>
            {showAll ? (
              <p>{commentContent}</p>
            ) : (
              <>
                {commentContent.length > 236 ? (
                  <>
                    <div>
                      {commentContent.slice(0, 236)}...
                      <button className='more' onClick={toggleShowAll}>
                        more
                      </button>
                    </div>
                  </>
                ) : (
                  <pre>{commentContent}</pre>
                )}
              </>
            )}
          </div>
          <div className='bottom-icon'>
            <button onClick={clickLike} className='thumbs-up'>
              {liked ? (
                <div className='thumbs-up-fill'>
                  <img src={thumbsUpFill} alt='like' />
                </div>
              ) : (
                <i className='i-thumbs-up-icon' />
              )}
            </button>
            {like === 0 ? null : <span className='num'>{like}</span>}
            <button className='bubble'>
              <i className='i-bubble-icon' />
            </button>
          </div>
        </Comment>
      </CommentsBlock>
    </>
  );
};

export default MiniComments;