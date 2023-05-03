import styled from 'styled-components';
import PostInput from '../PostInput/PostInput';
import Gradation from './FeedMaterial/Gradation';

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
  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <FeedBlock>
        <RealFeedBlock>
          {/* 공용 input입니다! transparent와 placeholder, pointer를 props로 넘기고 있어요. => PostInput 컴포넌트*/}
          <PostInput transparent='transparent' pointer='pointer' placeholder='커뮤니티에 포스트를 남겨보세요.' />
        </RealFeedBlock>
      </FeedBlock>
    </>
  );
};

export default Feed;
