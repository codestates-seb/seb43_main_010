import styled from 'styled-components';
import { useState } from 'react';
import profileImg from '../../assets/jpg-file/profile-img.jpg';
import deleteBtn from '../../assets/png-file/x-btn.png';

import PostInput from '../PostInput/PostInput';
import Gradation from './FeedMaterial/Gradation';
import WritePost from '../WritePost/WritePost';
import RightImg from './FeedMaterial/RightImg';
import Post from './FeedMaterial/Post';

const FeedBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RealFeedBlock = styled.div`
  width: 1100px;
  height: auto;
  display: flex;
  justify-content: center;
`;

const PostContextBox = styled.div`
  .post-all {
    color: var(--light-gray-500);
    font-size: 15px;
    text-shadow: 0 0 0 var(--light-gray-500);
    margin-top: 28px;
  }
`;

const PostsBox = styled.div`
  margin-bottom: 71px;
`;

// 그냥 임시 Post 데이터임
const data = {
  allFeed: [
    {
      feedId: 1,
      userId: 1,
      nickname: `아무리생각캐도난마늘`, // 작성자 닉네임
      content: `그거 알아요? 저는 영어 시간에 핸섬 외우기 어려워서 '김태형'이라고 외웠어요💜💜💜`,
      img: profileImg,
      createdAt: `05. 01. 10:22`,
      feedLikeId: [],
      likeNum: 1, // 좋아요 개수
      feedCommentId: [],
      commentNum: 1, // 게시글에 달린 댓글 개수
    },
    {
      feedId: 2,
      userId: 2,
      nickname: `이름모를새`,
      content: `1995년 12월 30일 대구광역시 서구에서 2남 1녀 중 첫째(장남)로 태어났다. 대구에서 태어나고 자랐으며, 초등학교 6학년이 될 무렵 경상남도 거창으로 전학을 가 거창에서 초등학교와 중학교를 졸업했다. 이후 고향인 대구로 돌아와 고등학교를 다니던 중 빅히트의 연습생으로 발탁되어 1학년 2학기에 서울로 상경했다. 빅히트 입사는 2011년 9월이었다. 대구지역 오디션에 참가하는 친구를 따라 구경갔다가 잘생긴 얼굴이 빅히트 관계자의 눈에 띄어 그 자리에서 오디션 권유를 받았다고 한다. 정작 친구는 탈락하고 뷔만 대구에서 유일하게 합격했다.`,
      img: profileImg,
      createdAt: `05. 01. 10:22`,
      feedLikeId: [],
      likeNum: 0,
      feedCommentId: [],
      commentNum: 0,
    },
    {
      feedId: 3,
      userId: 3,
      nickname: `🌞동쪽에선해가뜨고내마음에선전정국사랑해가뜨지🌞`,
      content: `오늘 무대 보고 왔는데, 인간인지 상상속의 인물인지 오로라인지 신기루인지 빔프로젝트로 쏴올린 가상의 인물인지 지우네 포켓볼에서 툭튀어나온 투디인간인지 실감 안나는 얼굴력에 후드려맞아 아직도 정신이 혼미함😵‍💫`,
      img: profileImg,
      createdAt: `05. 01. 10:22`,
      feedLikeId: [],
      likeNum: 99,
      feedCommentId: [],
      commentNum: 109,
    },
    {
      feedId: 4,
      userId: 4,
      nickname: `army555`,
      content: `I miss you even more, i miss you everyday, i miss you everytime i breath... I miss you every minute everysecond. 24 hours a day 7 days a week.... Iiiii missss uuuu so much jhopee. I miss everything about you. Your smile, your laugh, your positive vibes, your handsomeness, your golden heart, your tiny dimples,
      .. Especially i miss you just simple you.............`,
      img: profileImg,
      createdAt: `05. 01. 10:22`,
      feedLikeId: [],
      likeNum: 0,
      feedCommentId: [],
      commentNum: 0,
    },
    {
      feedId: 5,
      userId: 5,
      nickname: `주접못받아줄거면그렇게잘생기지마요😤`,
      content: '태형아 지구에는 3대마요가 있어!!\n\n1. 참치 마요\n2. 김치마요\n3. 태형오빠 내 맘을 훔치지 마요..💘\n\n🤭😚',
      img: profileImg,
      createdAt: `05. 01. 10:22`,
      feedLikeId: [],
      likeNum: 60,
      feedCommentId: [],
      commentNum: 39,
    },
  ],
};

const Feed = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <FeedBlock>
        <RealFeedBlock>
          <PostContextBox>
            {/* 공용 input입니다! => PostInput 컴포넌트*/}
            <button onClick={openModal}>
              <PostInput transparent='transparent' pointer='pointer' placeholder='커뮤니티에 포스트를 남겨보세요.' />
            </button>

            <div className='post-all'>
              <span className='post-all-txt'>POST ALL</span>
            </div>

            {/* Post 컴포넌트 */}
            {/* 임시 데이터로 <Post />컴포넌트 map 돌림 */}
            <PostsBox>
              {data.allFeed.map((el) => (
                <Post
                  key={el.feedId}
                  createdAt={el.createdAt}
                  nickname={el.nickname}
                  content={el.content}
                  img={el.img}
                  likeNum={el.likeNum}
                  commentNum={el.commentNum}
                />
              ))}
            </PostsBox>
          </PostContextBox>

          {/* 오른쪽 아티스트 이미지 => RightImg 컴포넌트 */}
          <RightImg />
        </RealFeedBlock>
      </FeedBlock>
      {/* 포스트 작성 컴포넌트임 => WritePost 컴포넌트 */}
      {modalOpen ? <WritePost modalOpen={modalOpen} setModalOpen={setModalOpen} /> : null}
      {/* 디테일 포스트 컴포넌트임 => DetailPost 컴포넌트 */}
      {/* {detailPost ? <DetailPost detailPost={detailPost} setDetailPost={setDetailPost} /> : null} */}
    </>
  );
};

export default Feed;
