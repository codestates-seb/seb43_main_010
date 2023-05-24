import styled from 'styled-components';
import profileImg from '../../../assets/jpg-file/profile-img.jpg';
import thumbsUpFill from '../../../assets/svg-file/thumbs-up-fill.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CopyDeleteModal from './CopyDeleteModal';

const CommentsBlock = styled.li`
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--white-100);
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
    width: 745px;
    justify-content: space-between;
  }

  .user-img-txt {
    display: flex;
    margin-bottom: 7.5px;

    .profile-img {
      width: 32px;
      height: 32px;
      background-size: 32px 32px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 1.5rem;
      }
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
    transform: translateX(-21px) translateY(-5px);
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
    padding: 0 33px 0 40px;
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

// 임시 긴 commentContent 데이터임
const commentContentData = `
  1995년 12월 30일 대구광역시 서구에서 2남 1녀 중 첫째(장남)로 태어났다. 대구에서 태어나고 자랐으며, 초등학교 6학년이 될 무렵 경상남도 거창으로 전학을 가 거창에서 초등학교와 중학교를 졸업했다. 이후 고향인 대구로 돌아와 고등학교를 다니던 중 빅히트의 연습생으로 발탁되어 1학년 2학기에 서울로 상경했다. 빅히트 입사는 2011년 9월이었다. 대구지역 오디션에 참가하는 친구를 따라 구경갔다가 잘생긴 얼굴이 빅히트 관계자의 눈에 띄어 그 자리에서 오디션 권유를 받았다고 한다. 정작 친구는 탈락하고 뷔만 대구에서 유일하게 합격했다. 이후 회사에 입사하여 1년 반이 조금 넘는 연습생 생활 끝에 2013년 6월 13일, 지금의 방탄소년단 뷔로 데뷔하였다. 투표에 의한 타이틀 뿐만 아니라 각 분야 전문가와 매체에서 선정하는 순위에서도 뷔는 독보적이다. 30여개 국가의 전문 사진작가, 디자이너, 메이크업 아티스트, 스타일리스트, 에디터 등 350명의 전문가들이 심사에 참여한 <2018 Fashion Face Award>에서도 1위에 올라 패션계에서도 최고의 얼굴로 인정받았다. 당시 심사위원들은 12000장이 넘는 사진과 비디오를 검토하고 여러 전반적인 기준을 고려, 순위를 정하는 데 무려 3개월이 걸렸다고 밝혔다. '더 월드 리스트'의 'The 100 Men In Fashion World 2020'에서도 해리 스타일스, 저스틴 비버, 크리스 햄스워스 등 쟁쟁한 해외 스타들을 제치고 1위를 차지, 패션 아이콘으로서의 위상을 입증했다.
`;

// 댓글 컴포넌트임
const Comments = ({
  deleteModal,
  setDeleteModal,
  likeNum,
  nickname,
  commentId,
  createdAt,
  content,
  profile,
  userEmail,
  likeCount,
  artistPostId,
  setData,
}) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likeNum);
  const [openModal, setOpenModal] = useState(false);
  const [showAll, setShowAll] = useState(false); // 전체 내용 보여주는 여부
  const { currentUser } = useSelector((state) => state.user);

  const clickMiniMenu = () => {
    if (currentUser.email !== userEmail) {
      alert('사용자가 다릅니다');
      return;
    }
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
              <div className='profile-img'>
                <img src={profile} alt='프로필' />
              </div>
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
                <CopyDeleteModal
                  top='23%'
                  right='60%'
                  transform='translate(-21%, -13%)'
                  bgColor='rgba(0, 0, 0, 0.75)'
                  height='132'
                  radius='18px 18px 19.5px 19.5px'
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  what='댓글을'
                  content={content}
                  commentId={commentId}
                  userEmail={userEmail}
                  artistPostId={artistPostId}
                  setData={setData}
                />
              ) : null}
            </div>
          </div>
          <div className='comments-content'>
            {showAll ? (
              <p>{content}</p>
            ) : (
              <>
                {content.length > 650 ? (
                  <>
                    <div>
                      {content.slice(0, 650)}...
                      <button className='more' onClick={toggleShowAll}>
                        more
                      </button>
                    </div>
                  </>
                ) : (
                  <pre>{content}</pre>
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

export default Comments;
