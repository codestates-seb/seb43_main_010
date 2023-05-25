import styled from 'styled-components';
import verifiedIcon from '../../../assets/svg-file/moon-verified-icon.svg';
import fillHeartImg from '../../../assets/svg-file/fill-heart.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import DetailPostMusic from './DetailPostMusic';
import BigDetailPostMusic from './BigDetailPostMusic';
import EditDeleteModalMusic from './EditDeleteModalMusic';
import EditPostMusic from './EditPostMusic';

const ArtistMusicDesBlock = styled.div`
  width: 495px;
  height: auto;
  margin-top: 18px;
  padding: 19px 15px 22px 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 14px rgb(255, 255, 255, 0.03);
  display: flex;
`;

const MusicArtContentBox = styled.div`
  width: 398px;
  padding: 2px 0 0 16px;

  .music-art-name-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 11px;
  }

  .music-art-name {
    color: var(--light-gray-100);
    font-size: 16px;
    font-weight: 700;
  }
  .verifi-moon {
    transform: translateX(2px);
    width: 10px;
  }

  .music-art-time {
    color: var(--light-gray-400);
    font-size: 12.5px;
    text-shadow: 0 0 0 var(--light-gray-400);
    padding-top: 15px;
  }
`;

const MusicArtContent = styled.div`
  cursor: pointer;

  .music-art-content {
    color: var(--light-gray-350);
    font-size: 14px;
    text-shadow: 0 0 0 var(--light-gray-350);
    line-height: 20px;
  }

  .more {
    color: var(--light-gray-400);
    font-size: 12px;
    text-shadow: 0 0 0 var(--light-gray-400);
  }
`;

const RightIconBox = styled.div`
  position: relative;

  .right-icon {
    width: 19px;
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transform: translateX(9px);
    transition: 0.08s;
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

const ArtImgAndLike = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .music-art-img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: ${({ img }) => `no-repeat url(${img})`};
    background-size: 47px 47px;
    background-position: center;
  }

  .heart-icon {
    transform: translateY(8px);
    width: 35px;
    height: 33px;
    border-radius: 4px;
    transition: 0.1s;

    display: flex;
    justify-content: center;
    align-items: center;

    svg .heart-path {
      stroke: #68707a;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.04);
      transition: 0.1s;

      svg .heart-path {
        stroke: #1beaef;
        transition: 0.1s;
      }
    }
  }

  .fill-heart {
    width: 24px;
    opacity: 75%;
    filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.1));
  }

  .like-num {
    color: #708389;
    font-size: 13px;
    font-weight: 700;
    padding-top: 1px;
    transform: translateY(8px);
  }
`;

const ArtistMusicDes = ({ nickname, content, img, likeNum, createdAt }) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likeNum);
  const [detailPost, setDetailPost] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { isOpen } = useSelector((state) => state.editpost);

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
      <ArtistMusicDesBlock>
        <ArtImgAndLike img={img}>
          <div className='music-art-img'></div>
          <button onClick={clickLike} className='heart-icon'>
            {liked ? (
              <img className='fill-heart' src={fillHeartImg} alt='like' />
            ) : (
              <svg width='24' height='23' viewBox='0 0 12 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  className='heart-path'
                  d='M10.1691 5.82473L6.00463 10L1.84012 5.82473C1.56543 5.55414 1.34906 5.22891 1.20464 4.86952C1.06022 4.51012 0.99087 4.12435 1.00096 3.73649C1.01106 3.34863 1.10037 2.96709 1.26328 2.61589C1.42619 2.26469 1.65918 1.95144 1.94755 1.69587C2.23593 1.4403 2.57346 1.24794 2.93889 1.13091C3.30431 1.01387 3.68972 0.974701 4.07083 1.01586C4.45195 1.05701 4.82052 1.1776 5.15333 1.37004C5.48615 1.56247 5.77599 1.82258 6.00463 2.13398C6.23425 1.82484 6.52443 1.56701 6.85702 1.37661C7.1896 1.18622 7.55743 1.06737 7.93748 1.0275C8.31752 0.987633 8.70161 1.0276 9.06569 1.14491C9.42978 1.26222 9.76603 1.45433 10.0534 1.70924C10.3408 1.96415 10.5731 2.27635 10.7357 2.62632C10.8984 2.97629 10.988 3.35648 10.9989 3.74311C11.0097 4.12974 10.9417 4.51447 10.7989 4.87323C10.6561 5.232 10.4417 5.55707 10.1691 5.8281'
                  stroke='#8F8F8F'
                />
              </svg>
            )}
          </button>
          {like !== 0 && <span className='like-num'>{like}</span>}
        </ArtImgAndLike>
        <MusicArtContentBox>
          <div className='music-art-name-menu'>
            <p className='music-art-name'>
              {nickname}
              <img className='verifi-moon' src={verifiedIcon} alt='moon' />
            </p>

            <RightIconBox>
              <button onClick={clickMiniMenu} className='right-icon'>
                <div className='mini-menu'>
                  <i className='i-three-point-menu-icon' />
                </div>
              </button>
              {openModal ? (
                <EditDeleteModalMusic
                  top='100%'
                  right='0'
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  what='포스트를'
                  postContent={content}
                />
              ) : null}
            </RightIconBox>
          </div>

          <MusicArtContent onClick={openDetailPost}>
            {content.length > 339 ? (
              <p className='music-art-content'>
                {content.slice(0, 339) + '...'}
                <span className='more'>더 보기</span>
              </p>
            ) : (
              <p className='music-art-content'>{content}</p>
            )}
          </MusicArtContent>

          <p className='music-art-time'>{createdAt}</p>
        </MusicArtContentBox>
      </ArtistMusicDesBlock>

      {/* 수정하는 모달 창 */}
      {isOpen && <EditPostMusic postContent={content} />}

      {detailPost && (
        <>
          {content.length > 308 ? (
            <BigDetailPostMusic
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
            <DetailPostMusic
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

export default ArtistMusicDes;
