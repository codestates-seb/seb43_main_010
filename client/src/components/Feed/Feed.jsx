import styled from 'styled-components';
import PostInput from '../PostInput/PostInput';
import Gradation from './FeedMaterial/Gradation';
import WritePost from '../WritePost/WritePost';
import { useState } from 'react';

const FeedBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RealFeedBlock = styled.div`
  width: 1100px;
  height: auto;
`;

const Feed = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const changeOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <FeedBlock>
        <RealFeedBlock>
          {/* 공용 input입니다! transparent와 placeholder, pointer를 props로 넘기고 있어요. => PostInput 컴포넌트*/}
          <button onClick={changeOpen}>
            <PostInput transparent='transparent' pointer='pointer' placeholder='커뮤니티에 포스트를 남겨보세요.' />
          </button>
        </RealFeedBlock>
      </FeedBlock>
      {/* 포스트 쓰는 컴포넌트임 => WritePost 컴포넌트 */}
      {modalOpen ? <WritePost notArtist='true' modalOpen={modalOpen} setModalOpen={setModalOpen} /> : null}
    </>
  );
};

export default Feed;
