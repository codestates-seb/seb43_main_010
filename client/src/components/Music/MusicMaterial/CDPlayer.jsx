import React, { useEffect, useRef } from 'react';
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
  <CdImgBox isPlaying={isPlaying}>
    <IconWrapper onClick={handlePlayToggle}>
      <img src={isPlaying ? stopIcon : playIcon} alt={isPlaying ? 'stop' : 'play'} />
    </IconWrapper>
  </CdImgBox>
);

export default CdPlayer;
