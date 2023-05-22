import styled from 'styled-components';
import { useState, useEffect } from 'react';

import CdDisk from './MusicMaterial/CdDisk';
import Loading from '../Loading/Loading';
import LeftMusic from './MusicMaterial/LeftMusic';
import RightMusic from './MusicMaterial/RightMusic';

const MusicBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
  position: relative;
`;

const RealMusicBlock = styled.div`
  width: 1100px;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CdBottom = styled.div`
  display: flex;
  padding-top: 379px;
`;

const Music = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // 그냥 보여주기용 로딩
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MusicBlock isLoading={isLoading}>
        {/* CD => CdDisk 컴포넌트 */}
        <CdDisk />
        <RealMusicBlock>
          {/* CD 아래 영역 */}
          <CdBottom>
            {/* 왼쪽 영역 => LeftMusic 컴포넌트 */}
            <LeftMusic />

            {/* 오른쪽 영역 => RightMusic 컴포넌트 */}
            <RightMusic />
          </CdBottom>
        </RealMusicBlock>
      </MusicBlock>
    </>
  );
};

export default Music;
