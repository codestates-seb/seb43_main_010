import { useState } from 'react';
import styled from 'styled-components';
import thumbsUpFill from '../../../assets/svg-file/thumbs-up-fill.svg';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../../Login/LoginMaterial/setCookie';

import EditDeleteModal from './EditDeleteModal';
import DetailPost from './DetailPost';
import BigDetailPost from './BigDetailPost';
import EditPost from '../../WritePost/EditPost';
import CopyModal from './CopyModal';

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
      border-radius: 50%;
      background: ${({ img }) => `no-repeat url(${img})`};
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
    line-height: 21px;
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

const Post = ({
  feedPostId,
  comments,
  createdAt,
  nickname,
  content,
  img,
  likeNum,
  commentNum,
  modalOpen,
  setModalOpen,
  postData,
  setPostData,
  fanEmail,
}) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likeNum);
  const [detailPost, setDetailPost] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { isOpen } = useSelector((state) => state.editpost);
  const { groupId } = useParams();

  const clickLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
    // 로그인한 유저가 팬일 때
    const baseAPI = process.env.REACT_APP_API_URL;
    if (!liked && currentUser.fanId !== undefined) {
      axios
        .post(`${baseAPI}/feed/${groupId}/${feedPostId}/like`, { fanId: currentUser.fanId }, { headers: { Authorization: getCookie() } })
        .then(() => {
          setLike(like + 1);
          setLiked(true);
        })
        .catch(() => {
          alert('이미 좋아요를 누른 게시글입니다.');
        });
    }

    if (!liked && currentUser.fanId === undefined) {
      // 로그인한 유저가 아티스트 이면서, 해당 커뮤니티의 아티스트일 경우
      axios
        .post(`${baseAPI}/feed/${groupId}/${feedPostId}/like`, { artistId: currentUser.artistId }, { headers: { Authorization: getCookie() } })
        .then(() => {
          setLike(like + 1);
          setLiked(true);
        })
        .catch(() => {
          alert('이미 좋아요를 누른 게시글입니다.');
        });
    }
  };

  const clickMiniMenu = () => {
    setOpenModal(!openModal);
  };

  const openDetailPost = () => {
    setDetailPost(true);
  };

  const handleOpenCopy = () => {
    setOpenCopy(!openCopy);
  };

  // 시간
  const formatTime = (time) => {
    const dateObj = new Date(time);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    return `${month}. ${day}. ${hours}:${minutes}`;
  };

  const formattedTime = formatTime(createdAt);

  return (
    <>
      <PostBlock className='post' img={img}>
        {/* 위 */}
        <div className='top'>
          <div className='profile'>
            <div className='profile-img'></div>
          </div>

          <div className='user-txt-box'>
            <div className='nickname'>{nickname}</div>
            <span className='time'>{formattedTime}</span>
          </div>
        </div>

        {/* 중간 */}
        <button onClick={openDetailPost} className='mid'>
          {content.length > 670 ? (
            <p className='post-content'>
              {content.slice(0, 670) + '...'}
              <span className='more'>더 보기</span>
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
            {comments?.length === 0 ? null : <span className='comment-num'>{comments.length}</span>}
          </div>

          <div className='right-icon-box'>
            {currentUser.email === fanEmail ? (
              <button onClick={clickMiniMenu} className='right-icon'>
                <div className='mini-menu'>
                  <i className='i-three-point-menu-icon' />
                </div>
              </button>
            ) : (
              <button onClick={handleOpenCopy} className='right-icon'>
                <div className='mini-menu'>
                  <i className='i-three-point-menu-icon' />
                </div>
              </button>
            )}
            {/* 복사만 있는 모달 */}
            {openCopy && (
              <CopyModal
                top='100%'
                right='0'
                openCopy={openCopy}
                setOpenCopy={setOpenCopy}
                deleteModal={deleteModal}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                content={content}
              />
            )}

            {/* 게시글 수정, 삭제 모달 */}
            {openModal ? (
              <EditDeleteModal
                top='100%'
                right='0'
                openModal={openModal}
                setOpenModal={setOpenModal}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                what='포스트를'
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                postData={postData}
                setPostData={setPostData}
                postContent={content}
                feedPostId={feedPostId}
              />
            ) : null}
          </div>
        </div>
      </PostBlock>

      {/* 포스트 수정 모달 */}
      {isOpen && <EditPost bgc05={true} setOpenModal={setOpenModal} />}

      {/* 디테일 포스트 컴포넌트임 => BigDetailPost, DetailPost 컴포넌트 */}
      {detailPost && (
        <>
          {content.length > 308 ? (
            <BigDetailPost
              detailPost={detailPost}
              setDetailPost={setDetailPost}
              createdAt={formattedTime}
              content={content}
              nickname={nickname}
              img={img}
              liked={liked}
              like={like}
              clickLike={clickLike}
              comments={comments}
              feedPostId={feedPostId}
              fanEmail={fanEmail} // 추가
            />
          ) : (
            <DetailPost
              detailPost={detailPost}
              setDetailPost={setDetailPost}
              createdAt={formattedTime}
              content={content}
              nickname={nickname}
              img={img}
              liked={liked}
              like={like}
              clickLike={clickLike}
              comments={comments}
              feedPostId={feedPostId}
              fanEmail={fanEmail} // 추가
            />
          )}
        </>
      )}
    </>
  );
};

export default Post;
