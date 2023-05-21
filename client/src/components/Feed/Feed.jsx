import styled from 'styled-components';
import { useState } from 'react';
import profileImg from '../../assets/jpg-file/profile-img.jpg';

import PostInput from '../PostInput/PostInput';
import Gradation from './FeedMaterial/Gradation';
import WritePost from '../WritePost/WritePost';
import RightImg from './FeedMaterial/RightImg';
import Post from './FeedMaterial/Post';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import authFn from '../auth';
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

  .post:last-child {
    .bottom {
      border-bottom: none;
    }
  }
`;

// 그냥 임시 Post 데이터임
const data = [
  {
    feedId: 1,
    userId: 1,
    nickname: `열일하는개미`, // 작성자 닉네임
    content: `개미는 뚠뚠🐜🐜 오늘도 뚠뚠🐜🐜 열심히 일을 하네🎵`,
    img: profileImg,
    createdAt: `05. 08. 16:22`,
    feedLikeId: [],
    likeNum: 0, // 좋아요 개수
    feedCommentId: [],
    commentNum: 1, // 게시글에 달린 댓글 개수
  },
  {
    feedId: 2,
    userId: 2,
    nickname: `아무리생각캐도난마늘`, // 작성자 닉네임
    content: `그거 알아요? 저는 영어 시간에 핸섬 외우기 어려워서 '김태형'이라고 외웠어요💜💜💜`,
    img: profileImg,
    createdAt: `05. 01. 10:22`,
    feedLikeId: [],
    likeNum: 1, // 좋아요 개수
    feedCommentId: [],
    commentNum: 1, // 게시글에 달린 댓글 개수
  },
];
// allFeed: [
//     {
//       feedId: 1,
//       userId: 1,
//       nickname: `열일하는개미`, // 작성자 닉네임
//       content: `개미는 뚠뚠🐜🐜 오늘도 뚠뚠🐜🐜 열심히 일을 하네🎵`,
//       img: profileImg,
//       createdAt: `05. 08. 16:22`,
//       feedLikeId: [],
//       likeNum: 0, // 좋아요 개수
//       feedCommentId: [],
//       commentNum: 1, // 게시글에 달린 댓글 개수
//     },
//     {
//       feedId: 2,
//       userId: 2,
//       nickname: `아무리생각캐도난마늘`, // 작성자 닉네임
//       content: `그거 알아요? 저는 영어 시간에 핸섬 외우기 어려워서 '김태형'이라고 외웠어요💜💜💜`,
//       img: profileImg,
//       createdAt: `05. 01. 10:22`,
//       feedLikeId: [],
//       likeNum: 1, // 좋아요 개수
//       feedCommentId: [],
//       commentNum: 1, // 게시글에 달린 댓글 개수
//     },
//     {
//       feedId: 3,
//       userId: 3,
//       nickname: `이름모를새`,
//       content: `1995년 12월 30일 대구광역시 서구에서 2남 1녀 중 첫째(장남)로 태어났다. 대구에서 태어나고 자랐으며, 초등학교 6학년이 될 무렵 경상남도 거창으로 전학을 가 거창에서 초등학교와 중학교를 졸업했다. 이후 고향인 대구로 돌아와 고등학교를 다니던 중 빅히트의 연습생으로 발탁되어 1학년 2학기에 서울로 상경했다. 빅히트 입사는 2011년 9월이었다. 대구지역 오디션에 참가하는 친구를 따라 구경갔다가 잘생긴 얼굴이 빅히트 관계자의 눈에 띄어 그 자리에서 오디션 권유를 받았다고 한다. 정작 친구는 탈락하고 뷔만 대구에서 유일하게 합격했다. 이후 회사에 입사하여 1년 반이 조금 넘는 연습생 생활 끝에 2013년 6월 13일, 지금의 방탄소년단 뷔로 데뷔하였다. 투표에 의한 타이틀 뿐만 아니라 각 분야 전문가와 매체에서 선정하는 순위에서도 뷔는 독보적이다. 30여개 국가의 전문 사진작가, 디자이너, 메이크업 아티스트, 스타일리스트, 에디터 등 350명의 전문가들이 심사에 참여한 <2018 Fashion Face Award>에서도 1위에 올라 패션계에서도 최고의 얼굴로 인정받았다. 당시 심사위원들은 12000장이 넘는 사진과 비디오를 검토하고 여러 전반적인 기준을 고려, 순위를 정하는 데 무려 3개월이 걸렸다고 밝혔다. '더 월드 리스트'의 'The 100 Men In Fashion World 2020'에서도 해리 스타일스, 저스틴 비버, 크리스 햄스워스 등 쟁쟁한 해외 스타들을 제치고 1위를 차지, 패션 아이콘으로서의 위상을 입증했다.`,
//       img: profileImg,
//       createdAt: `05. 01. 10:22`,
//       feedLikeId: [],
//       likeNum: 3,
//       feedCommentId: [],
//       commentNum: 0,
//     },
//     {
//       feedId: 4,
//       userId: 4,
//       nickname: `🌞동쪽에선해가뜨고내마음에선전정국사랑해가뜨지🌞`,
//       content: `오늘 무대 보고 왔는데, 인간인지 상상속의 인물인지 오로라인지 신기루인지 빔프로젝트로 쏴올린 가상의 인물인지 지우네 포켓볼에서 툭튀어나온 투디인간인지 실감 안나는 얼굴력에 후드려맞아 아직도 정신이 혼미함😵‍💫`,
//       img: profileImg,
//       createdAt: `05. 01. 10:22`,
//       feedLikeId: [],
//       likeNum: 99,
//       feedCommentId: [],
//       commentNum: 109,
//     },
//     {
//       feedId: 5,
//       userId: 5,
//       nickname: `army555`,
//       content: `I miss you even more, i miss you everyday, i miss you everytime i breath... I miss you every minute everysecond. 24 hours a day 7 days a week.... Iiiii missss uuuu so much jhopee. I miss everything about you. Your smile, your laugh, your positive vibes, your handsomeness, your golden heart, your tiny dimples,
//       .. Especially i miss you just simple you.............`,
//       img: profileImg,
//       createdAt: `05. 01. 10:22`,
//       feedLikeId: [],
//       likeNum: 0,
//       feedCommentId: [],
//       commentNum: 0,
//     },
//     {
//       feedId: 6,
//       userId: 6,
//       nickname: `주접못받아줄거면그렇게잘생기지마요😤`,
//       content: '태형아 지구에는 3대마요가 있어!!\n\n1. 참치 마요\n2. 김치마요\n3. 태형오빠 내 맘을 훔치지 마요..💘\n\n🤭😚',
//       img: profileImg,
//       createdAt: `05. 01. 10:22`,
//       feedLikeId: [],
//       likeNum: 60,
//       feedCommentId: [],
//       commentNum: 39,
//     },
//   ],

const Feed = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // WritePost 컴포넌트에 담길 data입니다 {content:string,imgList:[] 이렇게 담깁니다}
  const [postData, setPostData] = useState([data]);
  const openModal = () => {
    setModalOpen(true);
  };
  //여기서 로그인후 받아온 사용자가 아티스트가 아니라면 포스트 작성하는 부분을 안보여주기 위해 전역 변수를 가져와야함
  const currentUser = useSelector((state) => state.user.currentUser);
  //만약 currentUser에 group이란 속성이 없다면 포스팅 못하게 안보이게하기
  //현재 GroupID 받아오기
  let { groupId } = useParams();
  authFn(); //로그인후 사용해주세요

  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <FeedBlock>
        <RealFeedBlock>
          <PostContextBox>
            {/* 공용 input입니다! => PostInput 컴포넌트 */}
            <button onClick={openModal}>
              <PostInput transparent='transparent' pointer='pointer' placeholder='커뮤니티에 포스트를 남겨보세요.' />
            </button>

            <div className='post-all'>
              <span className='post-all-txt'>POST ALL</span>
            </div>

            {/* Post 컴포넌트 */}
            {/* 임시 데이터로 <Post />컴포넌트 map 돌림 */}
            <PostsBox>
              {data.map((el) => (
                <Post
                  key={el.feedId}
                  createdAt={el.createdAt}
                  nickname={el.nickname}
                  content={el.content}
                  img={el.img}
                  likeNum={el.likeNum}
                  commentNum={el.commentNum}
                  // 수정한 부분
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  postData={postData}
                  setPostData={setPostData}
                  groupId={groupId}
                />
              ))}
            </PostsBox>
          </PostContextBox>

          {/* 오른쪽 아티스트 이미지 => RightImg 컴포넌트 */}
          <RightImg />
        </RealFeedBlock>
      </FeedBlock>
      {/* 포스트 작성 컴포넌트임 => WritePost 컴포넌트 */}
      {modalOpen ? (
        <WritePost
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          postData={postData}
          setPostData={setPostData}
          groupId={groupId}
          currentUser={currentUser}
        />
      ) : null}
    </>
  );
};

export default Feed;
