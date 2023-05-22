import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import deleteBtn from '../../../assets/png-file/x-btn.png';
import thumbsUpFill from '../../../assets/svg-file/thumbs-up-fill.svg';

import CommentMusic from './CommentMusic';
import EditDeleteModalMusic from './EditDeleteModalMusic';

// 임시 데이터
import commentData from '../commentData';

const DetailPostBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: ${({ deleteModal }) => (deleteModal ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)')};
`;

const DetailPostBox = styled.div`
  display: flex;
  transform: translateY(-60px);
  position: relative;

  .delete-btn {
    width: 45px;
    height: 66px;
    position: absolute;
    top: 8.4%;
    right: -45px;
    filter: ${({ deleteModal }) => (deleteModal ? 'brightness(0.25)' : 'null')};
  }
`;

const DetailContent = styled.div`
  width: 768px;
  min-height: 316px;
  max-height: 90vh;
  background-color: var(--white-100);
  border-radius: 20px 20px 0 0;

  .detail-post-ul {
    min-height: 340px;
    max-height: 90vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: var(--white-100);
    border-radius: 20px 20px 0 0;
  }

  .top-mid-ul {
    position: relative;
  }
`;

const AuthorContentBox = styled.li`
  width: 768px;
  border-radius: 20px 20px 0 0;
  border-bottom: 1px solid var(--light-gray-150);
  padding: 26px 33px 36px 36px;

  .right-icon-box {
    position: relative;
  }

  .author {
    display: flex;
    justify-content: space-between;

    .author-img-txt {
      display: flex;
      margin-bottom: 20px;
    }

    .profile-img {
      width: 46px;
      height: 46px;
      background: ${({ img }) => `no-repeat url(${img})`};
      background-size: 46px 46px;
      border-radius: 50%;
    }

    .user-txt {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: column;
      transform: translateX(7px);
    }

    .nickname {
      color: var(--dark-blue-900);
      font-size: 15px;
      font-weight: 700;
    }

    .time {
      color: var(--light-gray-500);
      font-size: 12px;
      text-shadow: 0 0 0 var(--light-gray-500);
      margin-top: 5px;
    }
  }

  .mini-menu {
    width: 37px;
    height: 37px;
    font-size: 16px;
    transform: translateX(17px);
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

  .content {
    color: var(--dark-blue-900);
    font-size: 15px;
    text-shadow: 0 0 0 var(--dark-blue-900);
    line-height: 21px;
  }
`;

const ConmmentsNum = styled.li`
  color: var(--dark-blue-900);
  font-size: 18px;
  font-weight: bold;
  margin: 25px 0 13px 19px;
`;

const InputSubmit = styled.li`
  width: 768px;
  height: 134.6px;
  background-color: var(--white-100);
  border-radius: 0 0 20px 20px;
  border-top: 1px solid var(--light-gray-150);
  bottom: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 30px;

  position: absolute;
  transform: translateY(98%);
  .input-box {
    padding: 15px 20px 0 20px;

    form {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    input {
      width: 682px;
      height: 45px;
      border-radius: 26px;
      padding: 14px 0 14px 18px;
      color: var(--dark-blue-900);
      font-size: 15px;
      text-shadow: var(--dark-blue-900);
      background-color: var(--light-gray-100);

      &::placeholder {
        color: var(--light-gray-350);
        text-shadow: 0 0 0 var(--light-gray-350);
        transform: translateY(1px);
      }

      &:focus {
        outline: none;
      }
      &:hover {
        background-color: var(--light-gray-150);
        transition: 0.15s;
      }
    }

    .double-starts {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: ${({ comment }) => (comment ? 'linear-gradient( -35deg, #1CBEC8, #FFCE4F ) ' : 'var(--light-gray-200)')};
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in;

      i {
        font-size: 19px;
        &::before {
          color: var(--white-100);
        }
      }
    }
  }

  .bottom-icon {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 15px 0 0 30px;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .success-msg {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 160px;
      height: 27px;
      border-radius: 35px;
      color: var(--white-100);
      font-size: 13.5px;
      font-weight: 600;
      background: linear-gradient(-45deg, #1cbec8, #ffc022);
      transform: translateX(16px);
      animation: fadeIn 0.3s ease-out forwards;
    }

    .num {
      color: var(--gray-900);
      font-size: 15px;
      text-shadow: 0 0 0 var(--gray-900);
      transform: translateX(-5px) translateY(1px);
    }

    .thumbs-up-fill {
      width: 23px;
      transform: translateY(2px);
    }

    .thumbs-up {
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
    }

    .share {
      font-size: 23px;
      height: 37px;
      width: 37px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 7px;
      transform: translateX(10px);

      &:hover {
        background-color: var(--light-gray-100);
        transition: 0.15s;
      }
    }
  }
`;

const CommentMusicUl = styled.ul`
  max-height: 38vh;
  overflow: auto;
`;

// 여기에선 해당하는 게시글의 댓글 데이터를 서버한테 받아와야 함.
const DetailPostMusic = ({ detailPost, setDetailPost, createdAt, content, nickname, img, liked, like, clickLike, postData, setPostData }) => {
  const [comment, setComment] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [clipboard, setClipboard] = useState(false);
  const detailPostRef = useRef(null);

  useEffect(() => {
    const outDetailPost = (e) => {
      if (detailPost && detailPostRef.current && !openModal && !detailPostRef.current.contains(e.target)) {
        setDetailPost(false);
      }
    };
    document.addEventListener('mousedown', outDetailPost);

    return () => {
      document.removeEventListener('mousedown', outDetailPost);
    };
  }, [detailPost, openModal]);

  const closeDetailPost = () => {
    setDetailPost(false);
  };

  const clickMiniMenu = () => {
    setOpenModal(!openModal);
  };

  const changeComment = (e) => {
    setComment(e.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setClipboard(true);
        setTimeout(() => {
          setClipboard(false);
        }, 2500);
      })
      .catch(() => alert('복사에 실패했습니다.'));
  };

  const submitComment = () => {
    // !!!여기서 서버한테 comment 댓글 데이터 보내야 함!!!
  };

  return (
    <DetailPostBlock className='detail-post' deleteModal={deleteModal}>
      <DetailPostBox ref={detailPostRef} deleteModal={deleteModal}>
        <DetailContent>
          <ul className='detail-post-ul'>
            <ul className='top-mid-ul'>
              <AuthorContentBox img={img}>
                <div className='author'>
                  <div className='author-img-txt'>
                    <div className='profile-img'></div>
                    <div className='user-txt'>
                      <span className='nickname'>{nickname}</span>
                      <span className='time'>{createdAt}</span>
                    </div>
                  </div>
                  <div className='right-icon-box'>
                    <button onClick={clickMiniMenu} className='mini-menu'>
                      <i className='i-three-point-menu-icon' />
                    </button>
                    {/* 게시글 수정, 삭제 모달 */}
                    {openModal ? (
                      <EditDeleteModalMusic
                        top='100%'
                        right='0%'
                        transform='translateY(-28%)'
                        bgColor='rgba(0, 0, 0, 0.75)'
                        height='132'
                        radius='18px 18px 19.5px 19.5px'
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                        what='포스트를'
                        // 추가
                        detailPost={detailPost}
                        setDetailPost={setDetailPost}
                        postContent={content}
                      />
                    ) : null}
                  </div>
                </div>
                <div className='content'>
                  <p>{content}</p>
                </div>
              </AuthorContentBox>

              <ConmmentsNum>
                <div>{commentData.comments.length}개의 댓글</div>
              </ConmmentsNum>

              {/* 여기서 댓글 데이터 map 돌려야 함 => Comments 댓글 컴포넌트 */}
              <CommentMusicUl>
                {commentData.comments.map((el) => (
                  <CommentMusic
                    key={el.commentId}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    commentName={el.commentName}
                    commentContent={el.commentContent}
                    likeNum={el.likeNum}
                    createAt={el.createAt}
                  />
                ))}
              </CommentMusicUl>
            </ul>

            <InputSubmit comment={comment.trim().length > 0}>
              <div className='input-box'>
                <form onSubmit={submitComment}>
                  <input
                    onChange={changeComment}
                    placeholder='댓글을 입력하세요.'
                    type='text'
                    name='contents'
                    id='contents'
                    autoComplete='off'
                    required
                  />
                  <button className='double-starts'>
                    <i className='i-double-stars-icon' />
                  </button>
                </form>
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
                <button onClick={() => copyToClipboard(window.location.href)} className='share'>
                  <i className='i-share-icon' />
                </button>
                {clipboard ? <div className='success-msg'>주소가 복사되었습니다.</div> : null}
              </div>
            </InputSubmit>
          </ul>
        </DetailContent>

        <button onClick={closeDetailPost} className='delete-btn'>
          <img src={deleteBtn} alt='delete-button' />
        </button>
      </DetailPostBox>
    </DetailPostBlock>
  );
};

export default DetailPostMusic;
