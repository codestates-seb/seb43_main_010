import styled from 'styled-components';
import playImg from '../../../assets/svg-file/play-icon.svg';
import stopImg from '../../../assets/svg-file/stop-icon.svg';
import fillHeartImg from '../../../assets/svg-file/fill-heart.svg';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaying, resetPlaying, stopPlaying, playing } from '../../../reducer/musicSlice';

const FirstMusicUlBlock = styled.ul`
  width: 325px;
  height: 180px;
  padding: 15px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 14px rgb(255, 255, 255, 0.04);
  backdrop-filter: blur(5px);
  transition: 0.07s ease-in;
  outline: ${({ isPlaying }) => (isPlaying ? `2px solid rgba(19, 187, 189, 0.6)` : 'none')};
  box-shadow: ${({ isPlaying }) =>
    isPlaying
      ? `0 1px 2px rgba(5, 68, 69, 0.6), 2px 1px 4px rgba(5, 68, 69, 0.6), 2px 4px 3px rgba(5, 68, 69, 0.3),
      0 0 7px 2px rgba(27, 234, 239, 0.55), inset 0 1px 2px rgba(5, 68, 69, 0.6), inset 2px 1px 4px rgba(5, 68, 69, 0.3),
      inset 2px 4px 3px rgba(5, 68, 69, 0.3), inset 0 0 7px 2px rgba(27, 234, 239, 0.55)`
      : 'none'};
  z-index: 1;

  audio {
    display: none;
  }

  .first-music-li {
    display: flex;
    justify-content: start;
  }

  .first-img {
    width: 150px;
    height: 150px;
    border-radius: 4px;
    background: ${({ musicImg }) => `no-repeat url(${musicImg})`};
    background-size: 150px 150px;
    cursor: pointer;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    &:hover::after {
      content: ${({ isPlaying }) => (isPlaying ? `url(${stopImg})` : `url(${playImg})`)};
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      animation: fadeIn 0.1s ease-in;
    }
  }

  .txt-box {
    width: 138px;
    padding-left: 18px;

    button {
      text-align: start;
    }

    .num {
      color: var(--light-gray-400);
      font-size: 13px;
      font-weight: 600;
      padding-top: 5px;
    }

    .title {
      color: var(--light-gray-100);
      font-size: 15px;
      font-weight: 700;
      padding-top: 7px;
    }

    .singer {
      color: var(--gray-blue-400);
      font-size: 13px;
      text-shadow: 0 0 0 var(--gray-blue-400);
      padding-top: 9px;
    }
  }

  .top-line {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const LikeAndTime = styled.div`
  padding: 0 0 4px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .like-box {
    display: flex;
    align-items: center;
  }

  .fill-heart {
    width: 12px;
  }

  .like {
    width: 19px;
    height: 18px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s;

    svg {
      width: 12px;
    }

    &:hover {
      background-color: #525960;
      transition: 0.1s;

      svg .heart-path {
        stroke: #1beaef;
        transition: 0.1s;
      }
    }
  }

  .time {
    color: var(--light-gray-400);
    font-size: 13px;
    font-weight: 600;
  }

  .fill-heart {
    width: 12px;
  }

  .like-num {
    color: var(--light-gray-400);
    font-size: 10px;
    font-weight: 700;
    padding-top: 1px;
    transform: translateY(1px);
  }
`;

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
};

const FirstMusicUl = ({ playBoolean, onMusicEnd, musicId, musicTitle, singer, musicImg, musicMp3, likeNum }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(likeNum);

  const dispatch = useDispatch();
  const { currentMusicId, currentVolume } = useSelector((state) => state.music);

  // 음악
  const audioRef = useRef(null);

  // 음악 초반 세팅 부분
  useEffect(() => {
    const audioEl = audioRef.current;

    const handleTimeUpdate = () => {
      audioEl.currentTime = 0;
    };

    dispatch(resetPlaying()); // 페이지 이동 시 음악 재생 상태 초기화

    audioEl.addEventListener('loadedmetadata', handleTimeUpdate);
    return () => {
      audioEl.removeEventListener('loadedmetadata', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    setIsPlaying(playBoolean);
  }, [playBoolean]);

  // 음량 조절
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume / 100;
    }
  }, [currentVolume]);

  // 음악 여러개 재생 안되게 하는 부분
  useEffect(() => {
    const audioEl = audioRef.current;
    if (musicId !== currentMusicId) {
      audioEl.pause(); // 음악 멈춤
      setIsPlaying(false);
      audioEl.currentTime = 0;
    }
    dispatch(setPlaying({ musicId }));

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [musicId, currentMusicId, dispatch, isPlaying]);

  // 시간
  const handleTimeUpdate = () => {
    const audioEl = audioRef.current;
    const currentTime = audioEl.currentTime;
    const remainingTime = audioEl.duration - currentTime;
    setCurrentTime(remainingTime);
  };

  const handlePlayPause = () => {
    const audioEl = audioRef.current;

    if (isPlaying) {
      audioEl.pause();
      dispatch(stopPlaying());
    } else {
      audioEl.play();
      dispatch(playing());
      dispatch(setPlaying({ currentMusicId: musicId })); // 현재 재생중인 id값 보냄
    }

    setIsPlaying(!isPlaying);
  };

  // 노래 끝났을 때
  const handleEnded = () => {
    const audioEl = audioRef.current;

    onMusicEnd();
    audioEl.pause();
    audioEl.currentTime = 0;
    setIsPlaying(false);
  };

  // 좋아요
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
    <FirstMusicUlBlock musicImg={musicImg} isPlaying={isPlaying}>
      <li className='first-music-li'>
        <audio ref={audioRef} onEnded={handleEnded} onTimeUpdate={handleTimeUpdate} controls>
          <source src={musicMp3} type='audio/mpeg' />
          <track src='자막파일.vtt' kind='captions' label='자막' />
        </audio>
        <button className='first-img' onClick={handlePlayPause}></button>
        <div className='top-line'>
          <div className='txt-box'>
            <p className='num'>01</p>
            <button onClick={handlePlayPause}>
              <p className='title'>{musicTitle}</p>
            </button>
            <p className='singer'>{singer}</p>
          </div>
          <LikeAndTime>
            <div className='like-box'>
              <button className='like' onClick={clickLike}>
                {liked ? (
                  <img className='fill-heart' src={fillHeartImg} alt='like' />
                ) : (
                  <svg width='12' height='11' viewBox='0 0 12 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      className='heart-path'
                      d='M10.1691 5.82473L6.00463 10L1.84012 5.82473C1.56543 5.55414 1.34906 5.22891 1.20464 4.86952C1.06022 4.51012 0.99087 4.12435 1.00096 3.73649C1.01106 3.34863 1.10037 2.96709 1.26328 2.61589C1.42619 2.26469 1.65918 1.95144 1.94755 1.69587C2.23593 1.4403 2.57346 1.24794 2.93889 1.13091C3.30431 1.01387 3.68972 0.974701 4.07083 1.01586C4.45195 1.05701 4.82052 1.1776 5.15333 1.37004C5.48615 1.56247 5.77599 1.82258 6.00463 2.13398C6.23425 1.82484 6.52443 1.56701 6.85702 1.37661C7.1896 1.18622 7.55743 1.06737 7.93748 1.0275C8.31752 0.987633 8.70161 1.0276 9.06569 1.14491C9.42978 1.26222 9.76603 1.45433 10.0534 1.70924C10.3408 1.96415 10.5731 2.27635 10.7357 2.62632C10.8984 2.97629 10.988 3.35648 10.9989 3.74311C11.0097 4.12974 10.9417 4.51447 10.7989 4.87323C10.6561 5.232 10.4417 5.55707 10.1691 5.8281'
                      stroke='#8F8F8F'
                    />
                  </svg>
                )}
              </button>
              {like !== 0 && <span className='like-num'>{like}</span>}
            </div>
            <span className='time'>{formatTime(currentTime)}</span>
          </LikeAndTime>
        </div>
      </li>
    </FirstMusicUlBlock>
  );
};

export default FirstMusicUl;
