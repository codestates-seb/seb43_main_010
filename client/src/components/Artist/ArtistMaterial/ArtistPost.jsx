import { useState } from 'react';
import styled from 'styled-components';
import thumbsUpFill from '../../../assets/svg-file/thumbs-up-fill.svg';

import EditDeleteModal from '../../Feed/FeedMaterial/EditDeleteModal';
import DetailPost from '../../Feed/FeedMaterial/DetailPost';
import BigDetailPost from '../../Feed/FeedMaterial/BigDetailPost';

const Container = styled.div`
  width: 707px;
  display: flex;
  margin-bottom: 24px;
`;

const ArtistProfile = styled.div`
  width: 46px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile-img {
    width: 46px;
    height: 46px;
    background: ${({ img }) => `no-repeat url(${img})`};
    background-size: 46px 46px;
  }
  .created-day {
    margin: 8px 0 4px;
    color: var(--dark-blue-900);
    font-size: 15px;
    font-weight: 700;
  }
  .created-month {
    color: var(--light-gray-500);
    font-size: 13px;
    text-shadow: 0 0 0 var(--light-gray-500);
  }
`;

const ArtistPostBox = styled.div`
  width: 635px;
  height: auto;

  .top-mid {
    min-height: 98px;
    background: linear-gradient(to left, transparent, #c7e7ff);
    border: 1px solid linear-gradient(#c7e7ff);
    border-radius: 0.7rem;
    /* border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem; */
    box-shadow: 0 0 12px rgb(19, 28, 35, 5%);
    padding: 12px 0 0 12px;

    .top {
      display: flex;
      justify-content: start;
      align-items: center;

      .user-txt-box {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }

      .nickname {
        color: var(--dark-blue-900);
        font-size: 15px;
        font-weight: 800;
      }
    }

    .mid {
      margin-top: 7px;
      color: var(--dark-blue-600);
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      text-align: start;

      .more {
        color: #bababa;
        font-size: 13.5px;
        text-shadow: 0 0 0 #bababa;
      }
      .time {
        margin-top: 6px;
        color: var(--light-gray-500);
        font-size: 12px;
        text-shadow: 0 0 0 var(--light-gray-500);
      }
      /* 이미지 미리보기 추가하기 */
    }
  }

  .bottom {
    margin: 4px 8px 0 8px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 18px;

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

const ArtistPost = ({ createdAt, nickname, content, img, likeNum, commentNum }) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likeNum);
  const [detailPost, setDetailPost] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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
      <Container>
        <ArtistProfile img={img}>
          <div className='profile'>
            <div className='profile-img'></div>
          </div>
          <div className='created-day'>5</div>
          <div className='created-month'>May</div>
        </ArtistProfile>
        <ArtistPostBox>
          <div className='top-mid'>
            {/* 위 */}
            <div className='top'>
              <div className='user-txt-box'>
                <div className='nickname'>{nickname}</div>
              </div>
            </div>

            {/* 중간 */}
            <button onClick={openDetailPost} className='mid'>
              {content.length > 635 ? (
                <p className='post-content'>
                  {content.slice(0, 635) + '...'}
                  <span className='more'>더 보기</span>
                </p>
              ) : (
                <p className='post-content'>{content}</p>
              )}
              <p className='time'>{createdAt}</p>
            </button>
          </div>

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
              {openModal ? (
                <EditDeleteModal
                  top='100%'
                  right='0'
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  what='포스트를'
                />
              ) : null}
            </div>
          </div>
        </ArtistPostBox>
      </Container>

      {/* 디테일 포스트 컴포넌트임 => BigDetailPost, DetailPost 컴포넌트 */}
      {detailPost && (
        <>
          {content.length > 308 ? (
            <BigDetailPost
              detailPost={detailPost}
              setDetailPost={setDetailPost}
              createdAt={createdAt}
              content={content}
              nickname={nickname}
              img={img}
              liked={liked}
              like={like}
              clickLike={clickLike}
            />
          ) : (
            <DetailPost
              detailPost={detailPost}
              setDetailPost={setDetailPost}
              createdAt={createdAt}
              content={content}
              nickname={nickname}
              img={img}
              liked={liked}
              like={like}
              clickLike={clickLike}
            />
          )}
        </>
      )}
    </>
  );
};

export default ArtistPost;
