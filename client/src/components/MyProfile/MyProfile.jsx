import styled from 'styled-components';
import { useState, useEffect } from 'react';
import profileImg from '../../assets/jpg-file/profile-img.jpg';

import PostInput from '../PostInput/PostInput';
import Gradation from '../Feed/FeedMaterial/Gradation';
import WritePost from '../WritePost/WritePost';
import RightImg from '../Feed/FeedMaterial/RightImg';
import Post from '../Feed/FeedMaterial/Post';
import MyProfileComments from './MyProfileMaterial/MyProfileComments';
import Profile from './MyProfileMaterial/Profile';
import authFn from '../auth';

const MyProfileBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RealMyProfileBlock = styled.div`
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

const CommentsBox = styled.div`
  margin-bottom: 71px;
`;

const TabButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  margin-top: 10px;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  color: ${(props) => (props.selected ? 'var(--skyblue-600)' : 'initial')};
`;

// 그냥 임시 Post 데이터임
const data = {
  allFeed: [
    {
      myprofileId: 1,
      userId: 1,
      nickname: `열일하는개미`, // 작성자 닉네임
      content: `개미는 뚠뚠🐜🐜 오늘도 뚠뚠🐜🐜 열심히 일을 하네🎵`,
      img: profileImg,
      createdAt: `05. 08. 16:22`,
      feedLikeId: [],
      likeNum: 0, // 좋아요 개수
      feedCommentId: [],
      commentNum: 1, // 게시글에 달린 댓글 개수
      comments: [{}],
    },
  ],
};

const MyProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState({ nickname: '', followers: 0, followings: 0, profileImage: '' });
  const [selectedTab, setSelectedTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  // authFn(); //로그인후 사용해주세요

  const openModal = () => {
    setModalOpen(true);
  };

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  // 프로필 데이터를 불러오는 함수
  const fetchProfileData = async () => {
    // 여기서 API를 호출하여 프로필 데이터를 불러와야 합니다.
    // 아래는 임의의 프로필 데이터입니다.
    const data = {
      nickname: '열일하는개미',
      followers: 0,
      followings: 0,
      profileImage: profileImg,
    };

    setProfile(data);
  };

  // // 프로필 데이터를 불러오는 함수
  // const fetchProfileData = async () => {
  //   try {
  //     const response = await fetch("");
  //     const data = await response.json();

  //     if (response.ok) {
  //       setProfile({
  //         nickname: data.nickname || 'nickname',
  //         followers: data.followers || 0,
  //         followings: data.followings || 0,
  //         profileImage: data.profileImage || profileImg,
  //       });
  //     } else {
  //       throw new Error("profile error");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // 컴포넌트가 마운트될 때 프로필 데이터를 불러옵니다.
  useEffect(() => {
    fetchProfileData();
  }, []);

  // 게시글을 불러오는 함수
  const fetchPosts = async () => {
    try {
      const response = await fetch(''); // 여기에 실제 API 주소를 입력해야 합니다.
      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      } else {
        throw new Error('posts error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 컴포넌트가 마운트될 때 게시글 데이터를 불러옵니다.
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <MyProfileBlock>
        <Profile profile={profile} />
        <RealMyProfileBlock>
          <PostContextBox>
            {/* 공용 input입니다! => PostInput 컴포넌트 */}
            <button onClick={openModal}>
              <PostInput transparent='transparent' pointer='pointer' placeholder='루미안에 포스트를 남겨보세요.' />
            </button>

            {/* <div className='post-all'>
              <span className='post-all-txt'>POST ALL</span>
            </div> */}

            <TabButton selected={selectedTab === 'posts'} onClick={() => changeTab('posts')}>
              포스트
            </TabButton>
            <TabButton selected={selectedTab === 'comments'} onClick={() => changeTab('comments')}>
              댓글
            </TabButton>

            {/* Post 컴포넌트 */}
            {/* 임시 데이터로 <Post />컴포넌트 map 돌림 */}
            {selectedTab === 'posts' ? (
              <PostsBox>
                {data.allFeed.map((el) => (
                  <Post
                    key={el.myprofileId}
                    createdAt={el.createdAt}
                    nickname={el.nickname}
                    content={el.content}
                    img={el.img}
                    likeNum={el.likeNum}
                    commentNum={el.commentNum}
                  />
                ))}
                {/* {posts.map((post) => (
                  <Post
                    key={post.id}
                    createdAt={post.createdAt}
                    nickname={post.nickname}
                    content={post.content}
                    img={post.img}
                    likeNum={post.likeNum}
                    commentNum={post.commentNum}
                  />
                ))} */}
              </PostsBox>
            ) : (
              <CommentsBox>
                {data.allFeed.map((el) => (
                  <>
                    <MyProfileComments
                      key={el.myprofileId}
                      createdAt={el.createdAt}
                      nickname={el.nickname}
                      content={el.content}
                      img={el.img}
                      likeNum={el.likeNum}
                      commentNum={el.commentNum}
                      comments={el.comments}
                    />
                  </>
                ))}
              </CommentsBox>
            )}
          </PostContextBox>
          {/* 오른쪽 아티스트 이미지 => RightImg 컴포넌트 */}
          <RightImg />
        </RealMyProfileBlock>
      </MyProfileBlock>
      {/* 포스트 작성 컴포넌트임 => WritePost 컴포넌트 */}
      {modalOpen ? <WritePost modalOpen={modalOpen} setModalOpen={setModalOpen} /> : null}
    </>
  );
};

export default MyProfile;
