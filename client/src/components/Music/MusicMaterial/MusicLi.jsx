import styled from 'styled-components';
import fillHeartImg from '../../../assets/svg-file/fill-heart.svg';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaying, resetPlaying, stopPlaying, playing } from '../../../reducer/musicSlice';

const MusicLiBlock = styled.div`
  .list-box {
    max-width: 475px;
    height: 70px;
    border-radius: 5px;
    background-color: ${({ isPlaying }) => (isPlaying ? `rgb(255, 255, 255, 0.08)` : 'none')};
    box-shadow: ${({ isPlaying }) => (isPlaying ? `0 0 14px rgb(255, 255, 255, 0.03)` : 'none')};
    transition: 0.07s ease-in;

    display: flex;
    align-items: center;

    &:hover {
      background-color: ${({ isPlaying }) => (isPlaying ? `rgb(255, 255, 255, 0.08)` : 'rgb(255, 255, 255, 0.02)')};
      box-shadow: ${({ isPlaying }) => (isPlaying ? `0 0 14px rgb(255, 255, 255, 0.03)` : '0 0 14px rgb(255, 255, 255, 0.02)')};
      transition: 0.07s ease-in;
    }
  }

  audio {
    display: none;
  }

  .left-box {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: start;
    background: transparent;
  }

  .music-num-box {
    margin: 0 16.5px;
    width: 18px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .music-num {
    color: ${({ isPlaying }) => (isPlaying ? `var(--light-gray-200)` : 'var(--light-gray-400)')};
    font-size: 13px;
    font-weight: 600;
    transition: 0.07s ease-in;
  }

  .music-img {
    width: 46px;
    height: 46px;
    border-radius: 4px;
    background: ${({ musicImg }) => `no-repeat url(${musicImg})`};
    background-size: 46px 46px;
  }

  .play {
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 9px;

      .play-icon {
        fill: ${({ isPlaying }) => (isPlaying ? '#1BEAEF' : '#8F8F8F')};
        transition: 0.07s ease-in;
      }
    }
  }

  .music-des {
    width: 218px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .music-title {
      color: var(--light-gray-100);
      font-size: 15px;
      font-weight: 600;
    }

    .music-singer {
      color: var(--gray-blue-400);
      font-size: 13px;
      text-shadow: 0 0 0 var(--gray-blue-400);
      padding-top: 3px;
    }
  }

  .time {
    color: ${({ isPlaying }) => (isPlaying ? `var(--light-gray-200)` : 'var(--light-gray-400)')};
    font-size: 13px;
    font-weight: 600;
    transition: 0.07s ease-in;
  }
`;

const HeartBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .like-num {
    color: ${({ isPlaying }) => (isPlaying ? `var(--light-gray-350)` : 'var(--light-gray-400)')};
    font-size: 10px;
    font-weight: 600;
    padding-top: 1px;
    transition: 0.07s ease-in;
    transform: translate(1px, 1px);
  }
`;

const Heart = styled.button`
  width: 19px;
  height: 18px;
  border-radius: 5px;
  transition: 0.1s;
  background: transparent;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 12px;

    .heart-path {
      stroke: ${({ isPlaying }) => (isPlaying ? `var(--light-gray-350)` : 'var(--light-gray-400)')};
      transition: 0.07s ease-in;
    }
  }

  &:hover {
    background-color: #525960;
    transition: 0.1s;

    svg .heart-path {
      stroke: #1beaef;
      transition: 0.1s;
    }
  }

  .fill-heart {
    width: 12px;
  }
`;

const LikeAndTime = styled.div`
  display: flex;
  align-items: center;

  .like-time-box {
    width: 99px;
    padding-left: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
};

const MusicLi = ({ playBoolean, onMusicEnd, musicId, musicTitle, singer, musicImg, musicMp3, likeNum }) => {
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

  // 음량 조절
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume / 100;
    }
  }, [currentVolume]);

  useEffect(() => {
    setIsPlaying(playBoolean);
  }, [playBoolean]);

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
    <MusicLiBlock musicImg={musicImg} isPlaying={isPlaying}>
      <div className='list-box'>
        <audio ref={audioRef} onEnded={handleEnded} onTimeUpdate={handleTimeUpdate} controls>
          <source src={musicMp3} type='audio/mpeg' />
          <track src='자막파일.vtt' kind='captions' label='자막' />
        </audio>
        <button onClick={handlePlayPause} className='left-box'>
          <div className='music-num-box'>
            <p className='music-num'>{`${String(musicId)}`.length > 1 ? `${musicId}` : `0${musicId}`}</p>
          </div>
          <div className='music-img'></div>
          <div className='play'>
            <svg width='10' height='11' viewBox='0 0 10 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                className='play-icon'
                d='M9.49443 5.5C9.49477 5.64364 9.45901 5.78493 9.39061 5.91012C9.32222 6.03532 9.22353 6.14015 9.10414 6.21444L1.70499 10.8755C1.58025 10.9541 1.43737 10.9971 1.29112 10.9999C1.14487 11.0026 1.00054 10.9652 0.873053 10.8913C0.746777 10.8186 0.641586 10.7126 0.568297 10.5842C0.495008 10.4557 0.456266 10.3095 0.456055 10.1605V0.839503C0.456266 0.690526 0.495008 0.544295 0.568297 0.415849C0.641586 0.287402 0.746777 0.181376 0.873053 0.108672C1.00054 0.0348216 1.14487 -0.00264386 1.29112 0.00014508C1.43737 0.00293402 1.58025 0.0458763 1.70499 0.124537L9.10414 4.78556C9.22353 4.85985 9.32222 4.96468 9.39061 5.08988C9.45901 5.21507 9.49477 5.35636 9.49443 5.5Z'
                fill='#B3BCC4'
              />
            </svg>
          </div>

          <p className='music-des'>
            <span className='music-title'>{musicTitle}</span>
            <span className='music-singer'>{singer}</span>
          </p>
        </button>

        <LikeAndTime>
          <div className='like-time-box'>
            <HeartBox isPlaying={isPlaying}>
              <Heart onClick={clickLike} isPlaying={isPlaying}>
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
              </Heart>
              {like !== 0 && <span className='like-num'>{like}</span>}
            </HeartBox>

            <div className='time'>{formatTime(currentTime)}</div>
          </div>
        </LikeAndTime>
      </div>
    </MusicLiBlock>
  );
};

export default MusicLi;
