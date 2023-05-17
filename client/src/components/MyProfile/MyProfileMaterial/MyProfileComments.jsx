import { useState, useEffect } from 'react';
import styled from 'styled-components';

import EditDeleteModal from '../../Feed/FeedMaterial/EditDeleteModal';
import DetailPost from '../../Feed/FeedMaterial/DetailPost';
import BigDetailPost from '../../Feed/FeedMaterial/BigDetailPost';
import Comments from '../../Feed/FeedMaterial/Comments';

const PostBlock = styled.div`
  width: 707px;
  height: auto;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 28px;

    .profile-img {
      width: 36px;
      height: 36px;
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
      position: absolute;
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
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--light-gray-200);

    .right-icon-box {
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 10px;
    }

    .right-icon {
      width: 37px;
      height: 37px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
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
  }
`;

const MyprofileComments = ({ createdAt, nickname, content, img, comments }) => {
  const [detailPost, setDetailPost] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [comments, setComments] = useState([]);

  const clickMiniMenu = () => {
    setOpenModal(!openModal);
  };

  const openDetailPost = () => {
    setDetailPost(true);
  };

  // 댓글을 가져오는 함수
  // const fetchComments = async () => {
  //   try {
  //     const response = await fetch('');
  //     if (!response.ok) {
  //       throw new Error('comments error');
  //     }
  //     const data = await response.json();
  //     setComments(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  return (
    <>
      <PostBlock className='post'>
        {/* 위  */}
        {/* <div className='top'>
        </div> */}

        {/* 중간 */}
        <button onClick={openDetailPost} className='mid'>
          <div className='nickname'>{nickname}</div>
          {content.length > 670 ? (
            <p className='post-content'>
              {content.slice(0, 670) + '...'}
              <span className='more'>더 보기</span>
            </p>
          ) : (
            <p className='post-content'>{content}</p>
          )}
          {comments && (
            <ul className='comments-list'>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <Comments content={comment.content} createdAt={comment.createdAt} nickname={comment.nickname} />
                </li>
              ))}
            </ul>
          )}
        </button>

        {/* 아래 */}
        <div className='bottom'>
          {/* <span className='time'>{createdAt}</span> */}
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
                what='댓글을'
              />
            ) : null}
          </div>
        </div>
      </PostBlock>

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
            />
          ) : (
            <DetailPost detailPost={detailPost} setDetailPost={setDetailPost} createdAt={createdAt} content={content} nickname={nickname} img={img} />
          )}
        </>
      )}
    </>
  );
};

export default MyprofileComments;
