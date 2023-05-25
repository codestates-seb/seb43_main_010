import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';

import VolumeRange from './VolumeRange';
import CommentMusicLi from './CommentMusicLi';
import CommentInput from './CommentInput';
import ScrollDown from './ScrollDown';

// 임시 댓글 데이터
import commentData from '../commentData';

const RightMusicBlock = styled.div`
  width: 550px;
  height: auto;
  border-left: 1px solid #2a343d;
  padding: 81px 0 0 54px;

  .volume-wrapper {
    width: 495px;
    display: flex;
    justify-content: center;
  }
`;

const CommentsAndInput = styled.div`
  width: 495px;
  height: auto;
  border-radius: 5px;
  margin-top: ${({ isPlaying }) => (isPlaying ? '32px' : '40px')};
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 14px rgb(255, 255, 255, 0.02);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 495px;
    height: 30px;
    border-radius: 5px 5px 0 0;
    background-color: #fff;
    background: linear-gradient(to top, transparent, #394045);
    z-index: 1;
  }
`;

const CommentMusicUl = styled.ul`
  width: 495px;
  max-height: 760px;
  border-radius: 5px;
  padding: 12px 11px 0 11px;
  scroll-behavior: ${({ firstScroll }) => (firstScroll ? 'none' : 'smooth')};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const RightMusic = () => {
  const { isPlaying } = useSelector((state) => state.music);
  const commentUlRef = useRef(null);

  const [scrollDown, setScrollDown] = useState(true);
  const [firstScroll, setFirstScroll] = useState(true);

  // 처음 로드 될 때, 댓글부분이 아래부터 잡히게 하는 부분
  useEffect(() => {
    const container = commentUlRef.current;
    container.scrollTop = container.scrollHeight;

    // 처음에는 스크롤 부드러움 없앰
    if (firstScroll) {
      setTimeout(() => {
        setFirstScroll(false);
      }, 1000);
    }

    if (container.scrollHeight <= 760) {
      setScrollDown(false);
    }
  }, []);

  // 3초 뒤에 hideScrollDown을 다시 false로 설정
  useEffect(() => {
    if (scrollDown) {
      setTimeout(() => {
        setScrollDown(false);
      }, 3000);
    }
  }, [scrollDown]);

  // 아래 버튼
  const handleScrollDown = () => {
    const container = commentUlRef.current;
    container.scrollTop = container.scrollHeight;
  };

  // 스크롤 시에
  const handleScroll = () => {
    if (!scrollDown) {
      setScrollDown(true);
    }
  };

  return (
    <RightMusicBlock>
      {/* 볼륨 조절 => VolumeRange 컴포넌트 */}
      <div className='volume-wrapper'>
        <VolumeRange />
      </div>

      <CommentsAndInput isPlaying={isPlaying}>
        <CommentMusicUl firstScroll={firstScroll} onScroll={handleScroll} ref={commentUlRef}>
          {/* 뮤직 댓글들 => CommentMusicLi 컴포넌트 */}
          {commentData.comments.map((el) => (
            <CommentMusicLi
              key={el.commentId}
              commentName={el.commentName}
              commentContent={el.commentContent}
              likeNum={el.likeNum}
              createAt={el.createAt}
            />
          ))}
        </CommentMusicUl>

        {/* 댓글 작성 input => CommentInput 컴포넌트 */}
        <CommentInput />
        {/* ScrollBottom 컴포넌트 */}
        {scrollDown && <ScrollDown onClick={handleScrollDown} />}
      </CommentsAndInput>
    </RightMusicBlock>
  );
};

export default RightMusic;
