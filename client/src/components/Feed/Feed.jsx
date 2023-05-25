import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authFn from '../auth';

import PostInput from '../PostInput/PostInput';
import Gradation from './FeedMaterial/Gradation';
import WritePost from '../WritePost/WritePost';
import RightImg from './FeedMaterial/RightImg';
import Post from './FeedMaterial/Post';
import Loading from '../Loading/Loading';

const Container = styled.div`
  width: 100vw;
  min-width: 1440px;
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;

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

const Feed = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // WritePost 컴포넌트에 담길 data입니다 {content:string,imgList:[] 이렇게 담깁니다}
  const [postData, setPostData] = useState([]);
  //get요청 후 저장되는 곳은 feedPost고 이걸로 map 돌리시면 됩니다.
  const [feedPost, setFeedPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const openModal = () => {
    setModalOpen(true);
  };
  //여기서 로그인후 받아온 사용자가 아티스트가 아니라면 포스트 작성하는 부분을 안보여주기 위해 전역 변수를 가져와야함
  const { currentUser } = useSelector((state) => state.user);
  //만약 currentUser에 group이란 속성이 없다면 포스팅 못하게 안보이게하기
  //현재 GroupID 받아오기
  let { groupId } = useParams();
  authFn(); //로그인후 사용해주세요

  // const baseAPI = process.env.REACT_APP_API_URL;
  const baseAPI = process.env.REACT_APP_API_URL;
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseAPI}/feed/${groupId}?page=1&size=16`).then((res) => {
      setFeedPost(res.data.data);
      setIsLoading(false);
    });
  }, [postData]);

  if (isLoading) {
    return <Loading bgWhite={true} />;
  }

  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <Container isLoading={isLoading}>
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
                {feedPost.map((el) => (
                  <Post
                    key={el.feedPostId}
                    createdAt={el.createdAt}
                    nickname={el.fan.nickname}
                    content={el.content}
                    img={el.fan.profile}
                    likeNum={el.likeCount}
                    commentNum={el.commentNum}
                    comments={el.comments} // 추가
                    feedPostId={el.feedPostId} // 추가
                    fanEmail={el.fan.email}
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
      </Container>
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
