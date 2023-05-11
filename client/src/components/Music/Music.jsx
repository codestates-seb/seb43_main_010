import React, { useState } from 'react';
import styled from 'styled-components';
import CdPlayer from './MusicMaterial/CDPlayer';
import MusicInfoBox from './MusicMaterial/MusicInfoBox';

const Body = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--dark-blue-800);
`;

const MusicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 85px;
`;

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Body>
      <MusicContainer>
        <CdPlayer isPlaying={isPlaying} handlePlayToggle={handlePlayToggle} />
        <MusicInfoBox />
      </MusicContainer>
    </Body>
  );
};

export default Music;
