import styled from 'styled-components';
import vImg from '../../../assets/jpg-file/artist-profile/v-profile.jpg';
import { useState } from 'react';

import WritePost from '../../WritePost/WritePost';

const PostInputMusicBlock = styled.div`
  padding-top: 68px;
`;

const RealPostInputMusic = styled.div`
  width: 495px;
  height: 66px;
  border-radius: 35px;
  /* background-color: var(--dark-blue-500); */
  background-color: #4a5258;
  box-shadow: 0 0 12px rgba(208, 222, 236, 0.2);
  padding: 10px 31.18px 10px 12.91px;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .img-txt-box {
    display: flex;
    align-items: center;
  }

  .music-art-img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: no-repeat url(${vImg});
    background-size: 47px 47px;
    background-position: center;
    box-shadow: 0 0 13px rgba(255, 255, 255, 0.08);
  }

  .placeholder-txt {
    /* color: var(--gray-blue-400); */
    color: #727d86;
    font-size: 14.5px;
    font-weight: 800;
    padding-left: 16px;
  }

  .i-double-stars-icon {
    font-size: 27px;

    &::before {
      color: #7a7a7a;
    }
  }
`;

const PostInputMusic = () => {
  const [writePostOpen, setWritePostOpen] = useState(false);

  const handleWritePost = () => {
    setWritePostOpen(!writePostOpen);
  };

  return (
    <>
      <PostInputMusicBlock>
        <RealPostInputMusic onClick={handleWritePost}>
          <div className='img-txt-box'>
            <div className='music-art-img'></div>
            <p className='placeholder-txt'>이 노래를 추천한 이유를 적어주세요!</p>
          </div>
          <i className='i-double-stars-icon' />
        </RealPostInputMusic>
      </PostInputMusicBlock>
      {writePostOpen && <WritePost modalOpen={writePostOpen} setModalOpen={setWritePostOpen} />}
    </>
  );
};

export default PostInputMusic;
