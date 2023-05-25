import { useState } from 'react';
import styled from 'styled-components';
import thumbsUpFill from '../../../assets/svg-file/thumbs-up-fill.svg';
import { useSelector } from 'react-redux';
import ArtistImgPreview from './ArtistImgPreview';
import EditDeleteModal from '../SplitForder/EditDeleteModal';
import DetailPost from '../SplitForder/DetailPost';
import BigDetailPost from '../SplitForder/BigDetailPost';
import { showDate, showMonthDay } from './showDate';
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
    border-radius: 1.5rem;
    background: ${({ profile }) => `no-repeat url(${profile})`};
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
  width: 642px;
  height: auto;
  position: relative;
  .bubble-tail {
    color: ${({ gradColor }) =>
      gradColor ? `linear-gradient(90deg, transparent, ${gradColor[2]})` : `linear-gradient(to top, transparent, #c9edff)`};
    position: absolute;
    left: -10px;
    top: 1px;
    width: 20px;
    height: 20px;
    svg {
      path {
        fill: ${({ gradColor }) => (gradColor ? `${gradColor[2]}` : 'none')};
      }
    }
  }
  .top-mid {
    min-height: 98px;
    background: ${({ gradColor }) =>
      gradColor ? `linear-gradient(to right, ${gradColor[2]},${gradColor[0]})` : `linear-gradient(to top, transparent, #c9edff)`};
    border: 1px solid linear-gradient(#c7e7ff);
    /* border-radius: 0.5rem; */
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    box-shadow: 0 0 12px rgb(19, 28, 35, 5%);
    padding: 12px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* height: 30px; */
      margin-bottom: 8px;

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

      .right-icon-box {
        position: relative;
      }

      .right-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          transform: scale(1.1, 1.1);
          transition: 0.15s;
        }

        .mini-menu {
          font-size: 16px;
          i::before {
            color: var(--light-gray-600);
          }
        }
      }
    }

    .mid {
      margin-top: 7px;
      color: var(--dark-blue-600);
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      text-align: start;
      background: none;
      .post-content {
        white-space: pre-line;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
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

    .comment-num {
      color: var(--gray-900);
      font-size: 14px;
      text-shadow: 0 0 0 var(--gray-900);
      transform: translateX(-20px) translateY(0.6px);
    }
  }
`;

const ArtistPost = ({
  artistPostId,
  createdAt,
  nickname,
  content,
  profile,
  likeCount,
  comments,
  img,
  modalOpen,
  setModalOpen,
  postData,
  setPostData,
  groupId,
  artistId,
}) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likeCount);
  const [detailPost, setDetailPost] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { isOpen } = useSelector((state) => state.editpost);
  const clickLike = async () => {
    let userId = {};
    if (currentUser.fanId) {
      userId = { fanId: currentUser.fanId };
    } else {
      userId = { artistId: currentUser.artistId };
    }

    setLiked(!liked);
    if (!liked) {
      setLike(like + 1);
    } else {
      setLike(like - 1);
    }
    // 서버한테 바뀐 좋아요 데이터 전송 해야함
  };

  //이건 수정하기 삭제하기 뜨는 모달창
  const clickMiniMenu = () => {
    setOpenModal(!openModal);
  };

  //클릭시 해당하는 포스트의 디테일 창으로 가는 모달
  const openDetailPost = () => {
    setDetailPost(true);
  };
  //그룹별 색상 관리를 위한 처리

  const state = useSelector((state) => state.color);
  const group = state.allGroup.find((el) => el.groupId === Number(groupId));
  const gradColor = group ? group.gradColor : [];

  return (
    <>
      <Container>
        <ArtistProfile>
          <div className='profile'>
            <img src={profile} alt='profile' className='profile-img'></img>
          </div>
          <div className='created-day'>{showMonthDay(createdAt)[1]}</div>
          <div className='created-month'>{showMonthDay(createdAt)[0]}</div>
        </ArtistProfile>
        <ArtistPostBox gradColor={gradColor}>
          <div className='bubble-tail'>
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M0.499937 2.00004C-6.33001e-05 2.50004 3.99994 3.50004 6.99994 6.00004C9.39992 8.00002 9.99993 11.8334 9.99994 13.5L12.9999 6.5C13.4999 4.83333 14.2999 1.6 13.4999 2C12.4999 2.5 11.4999 1.50004 7.49994 1.00004C3.49994 0.500041 0.999937 1.50004 0.499937 2.00004Z' />
            </svg>
          </div>
          <div className='top-mid'>
            {/* 위 */}
            <div className='top'>
              <div className='user-txt-box'>
                <div className='nickname'>{nickname}</div>
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
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    // 여기서 해당하는 포스트를 내려줘야함
                    artistPostId={artistPostId}
                    preContent={content}
                    preImg={img}
                    postData={postData}
                    setPostData={setPostData}
                    artistId={artistId}
                  />
                ) : null}
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
              <p className='time'>{showDate(createdAt)}</p>
            </button>
          </div>
          <ArtistImgPreview imgList={img}></ArtistImgPreview>

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
              {comments.length === 0 ? null : <span className='comment-num'>{comments.length}</span>}
            </div>
          </div>
        </ArtistPostBox>
      </Container>

      {/* 디테일 포스트 컴포넌트임 => BigDetailPost, DetailPost 컴포넌트 */}
      {detailPost && (
        <>
          {content.length > 308 || img.length !== 0 ? (
            <BigDetailPost
              detailPost={detailPost}
              setDetailPost={setDetailPost}
              createdAt={showDate(createdAt)}
              content={content}
              nickname={nickname}
              profile={profile}
              imgList={img}
              liked={liked}
              like={like}
              clickLike={clickLike}
              groupId={groupId}
              artistPostId={artistPostId}
              //수정삭제
              preContent={content}
              preImg={img}
              postData={postData}
              setPostData={setPostData}
              artistId={artistId}
            />
          ) : (
            <DetailPost
              detailPost={detailPost}
              setDetailPost={setDetailPost}
              createdAt={showDate(createdAt)}
              content={content}
              nickname={nickname}
              profile={profile}
              imgList={img}
              liked={liked}
              like={like}
              clickLike={clickLike}
              groupId={groupId}
              artistPostId={artistPostId}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              //수정삭제
              preContent={content}
              preImg={img}
              postData={postData}
              setPostData={setPostData}
              artistId={artistId}
            />
          )}
        </>
      )}
    </>
  );
};

export default ArtistPost;
