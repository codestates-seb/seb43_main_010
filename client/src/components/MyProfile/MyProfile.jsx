import styled from 'styled-components';
import { useState, useEffect } from 'react';
import profileImg from '../../assets/jpg-file/profile-img.jpg';

import PostInput from '../PostInput/PostInput';
import Gradation from '../Feed/FeedMaterial/Gradation';
import WritePost from '../WritePost/WritePost';
import RightImg from '../Feed/FeedMaterial/RightImg';
import Post from '../Feed/FeedMaterial/Post';
import Comments from '../Feed/FeedMaterial/Comments';

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

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1100px;
  margin-bottom: 36px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 26px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Nickname = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FollowDetails = styled.div`
  display: flex;
  gap: 5px;
`;

const FollowStyle = styled.div`
  color: var(--light-gray-400);
  font-weight: 500;
`;

const TabButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  margin: 0 10px;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
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
    },
  ],
};

const MyProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState({ nickname: '', followers: 0, followings: 0, profileImage: '' });
  const [selectedTab, setSelectedTab] = useState('posts');

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

  // 컴포넌트가 마운트될 때 프로필 데이터를 불러옵니다.
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <MyProfileBlock>
        <ProfileInfo>
          <ProfileImage src={profile.profileImage} alt='Profile' />
          <ProfileDetails>
            <Nickname>{profile.nickname}</Nickname>
            <FollowDetails>
              {profile.followings} <FollowStyle>팔로잉</FollowStyle>
              <div>&gt;</div>
              {profile.followers} <FollowStyle>팔로워</FollowStyle>
            </FollowDetails>
          </ProfileDetails>
        </ProfileInfo>
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
              </PostsBox>
            ) : (
              <CommentsBox>
                {data.allFeed.map((el) => (
                  <Comments
                    key={el.myprofileId}
                    createdAt={el.createdAt}
                    nickname={el.nickname}
                    content={el.content}
                    img={el.img}
                    likeNum={el.likeNum}
                    commentNum={el.commentNum}
                  />
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
