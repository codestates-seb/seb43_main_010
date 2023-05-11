import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import cdImg from '../../../assets/png-file/cd-img.png';
import playIcon from '../../../assets/svg-file/play-icon.svg';
import stopIcon from '../../../assets/svg-file/stop-icon.svg';

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const CdImgBox = styled.div`
  position: relative;
  width: 513px;
  height: 513px;
`;

const CdImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url(${cdImg});
  animation: ${({ isPlaying }) =>
    isPlaying
      ? css`
          ${spin} 20s linear infinite
        `
      : 'none'};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const CdPlayer = ({ isPlaying, handlePlayToggle }) => (
  <CdImgBox>
    <CdImage isPlaying={isPlaying} />
    <IconWrapper onClick={handlePlayToggle}>
      <img src={isPlaying ? stopIcon : playIcon} alt={isPlaying ? 'stop' : 'play'} />
    </IconWrapper>
  </CdImgBox>
);

export default CdPlayer;

/* import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import cdImg from '../../../assets/png-file/cd-img.png';
import playIcon from '../../../assets/svg-file/play-icon.svg';
import stopIcon from '../../../assets/svg-file/stop-icon.svg';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const CdImgBox = styled.div`
  position: relative;
  width: 513px;
  height: 513px;
`;

const CdImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url(${cdImg});
  animation: ${spin} 20s linear infinite;
  animation-play-state: ${({ isPlaying }) => (isPlaying ? 'running' : 'paused')};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const CdPlayer = ({ isPlaying, handlePlayToggle }) => {
  const cdImageRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const step = (timestamp) => {
      if (cdImageRef.current) {
        cdImageRef.current.style.setProperty('--animation-timestamp', timestamp);
        animationFrameId = requestAnimationFrame(step);
      }
    };

    if (isPlaying) {
      const startTimestamp = parseFloat(cdImageRef.current.style.getPropertyValue('--animation-timestamp')) || 0;
      cdImageRef.current.style.animationDelay = `${-startTimestamp}ms`;
      animationFrameId = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(animationFrameId);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  return (
    <CdImgBox>
      <CdImage ref={cdImageRef} isPlaying={isPlaying} />
      <IconWrapper onClick={handlePlayToggle}>
        <img src={isPlaying ? stopIcon : playIcon} alt={isPlaying ? 'stop' : 'play'} />
      </IconWrapper>
    </CdImgBox>
  );
};

export default CdPlayer; */
