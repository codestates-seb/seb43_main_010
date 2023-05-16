import styled from 'styled-components';
import { useState } from 'react';
import profileImg from '../../assets/jpg-file/profile-img.jpg';
import PostInput from '../PostInput/PostInput';
import ArtistPost from '../Artist/ArtistMaterial/ArtistPost';
import Gradation from '../Artist/ArtistMaterial/Gradation';
import WritePost from '../WritePost/WritePost';
import RightArea from './ArtistMaterial/Rightarea';

const Container = styled.div`
  width: 100vw;
  min-width: 1440px;
`;

const ArtistBox = styled.div`
  width: 1100px;
  height: auto;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const PostContextBox = styled.div``;

const PostsBox = styled.div`
  margin: 50px 0 71px;
`;

// 그냥 임시 Post 데이터임
const data = {
  allArtist: [
    {
      artistId: 1,
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

const Artist = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // 포스트 데이터를 추가하기위한 상태관리 => 이건 writePost 모달창에서 submit시 변경되므로 props전달해야함
  const [postData, setPostData] = useState([data]);

  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <Container>
        <ArtistBox>
          <PostContextBox>
            {/* 공용 input입니다! => PostInput 컴포넌트*/}
            <button onClick={openModal}>
              <PostInput transparent='transparent' pointer='pointer' placeholder='커뮤니티에 포스트를 남겨보세요.' />
            </button>

            {/* Post 컴포넌트 */}
            {/* 임시 데이터로 <Post />컴포넌트 map 돌림 */}
            <PostsBox>
              {data.allArtist.map((el) => (
                <ArtistPost
                  key={el.artistId}
                  createdAt={el.createdAt}
                  nickname={el.nickname}
                  content={el.content}
                  img={el.img}
                  likeNum={el.likeNum}
                  commentNum={el.commentNum}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  postData={postData}
                  setPostData={setPostData}
                />
              ))}
            </PostsBox>
          </PostContextBox>

          {/* 오른쪽 아티스트 이미지 => RightImg 컴포넌트 */}
          <RightArea />
        </ArtistBox>
      </Container>
      {/* 포스트 작성 컴포넌트임 => WritePost 컴포넌트 */}
      {modalOpen ? <WritePost modalOpen={modalOpen} setModalOpen={setModalOpen} postData={postData} setPostData={setPostData} /> : null}
    </>
  );
};

export default Artist;
