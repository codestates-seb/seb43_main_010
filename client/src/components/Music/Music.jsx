import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMyCommunity } from '../../reducer/communitySlice';
import { getCookie } from '../Login/LoginMaterial/setCookie';

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

  const { myCommunity } = useSelector((state) => state.community);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const token = getCookie();

    // axios.get('http://localhost:8080/home', { headers: { Authorization: `${token}` } }).then((res) => {
    //   if ('fanId' in currentUser) {
    //     // dispatch(setMyCommunity(res.data.community));
    //     console.log(res.data);
    //   }
    // });
  }, []);

  // 그냥 보여주기용 로딩
  if (isLoading) {
    return <Loading />;
  }
  // console.log(myCommunity);

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
