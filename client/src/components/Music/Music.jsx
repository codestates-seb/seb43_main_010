import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import styled from 'styled-components';
import CdPlayer from './MusicMaterial/CDPlayer';
import MusicInfoBox from './MusicMaterial/MusicInfoBox';

const Body = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--dark-blue-900);
`;

const MusicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Body>
      <Nav />
      <MusicContainer>
        <CdPlayer isPlaying={isPlaying} handlePlayToggle={handlePlayToggle} />
        <MusicInfoBox />
      </MusicContainer>
    </Body>
  );
};

export default Music;