import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ArtistPost from '../Artist/ArtistMaterial/ArtistPost';
import Gradation from '../Artist/ArtistMaterial/Gradation';
import RightArea from './ArtistMaterial/Rightarea';
import authFn from '../auth';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WritePost from './SplitForder/WritePost';
import PostInput from './SplitForder/PostInput';
import Loading from '../Loading/Loading';
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
  margin: ${({ isArtist, curGroup, pageGroup }) => (isArtist && curGroup === pageGroup ? '50px 0 71px' : '0 0 71px')};
`;

const TempPostBox = styled.div`
  width: 707px;
`;

const Artist = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  //만약 currentUser에 group이란 속성이 없다면 포스팅 못하게 안보이게하기
  const [isArtist, setIsArtist] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // 포스트 데이터를 추가하기위한 상태관리 => 이건 writePost 모달창에서 submit시 변경되므로 props전달해야함
  const [postData, setPostData] = useState([]);
  const [artistPost, setArtistPost] = useState([]);
  //현재 GroupID 받아오기
  const { groupId } = useParams();
  const API = `${process.env.REACT_APP_API_URL}`;
  const [isLoading, setIsLoading] = useState(true);

  authFn();
  useEffect(() => {
    if (currentUser.group) {
      setIsArtist(true);
    }
    setIsLoading(true);
    axios
      .get(`${API}/artist/${groupId}?page=1&size=16`)
      .then((res) => {
        setArtistPost(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        return;
      });
  }, [postData]);
  const openModal = () => {
    setModalOpen(true);
  };
  if (isLoading) {
    return <Loading bgWhite={true} />;
  }
  return (
    <>
      <Gradation /> {/* 그라데이션 컴포넌트임 => FeedBlock 컴포넌트 */}
      <Container>
        <ArtistBox>
          <PostContextBox>
            {currentUser.groupId === Number(groupId) ? (
              <button onClick={openModal}>
                <PostInput
                  transparent='transparent'
                  pointer='pointer'
                  placeholder='커뮤니티에 포스트를 남겨보세요.'
                  currentUser={currentUser.profile}
                />
              </button>
            ) : null}
            {/* Post 컴포넌트 */}
            {artistPost.length !== 0 ? (
              <PostsBox isArtist={isArtist} curGroup={currentUser.groupId} pageGroup={Number(groupId)}>
                {artistPost &&
                  artistPost.map((el) => (
                    <ArtistPost
                      key={el.artistPostId}
                      artistPostId={el.artistPostId}
                      createdAt={el.createdAt}
                      nickname={el.artist.nickname}
                      content={el.content}
                      profile={el.artist.profile}
                      likeCount={el.likeCount}
                      comments={el.comments}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      postData={postData}
                      setPostData={setPostData}
                      groupId={Number(groupId)}
                      img={el.img}
                      artistId={el.artist.artistId}
                    />
                  ))}
              </PostsBox>
            ) : (
              <TempPostBox />
            )}
          </PostContextBox>

          {/* 오른쪽 아티스트 이미지 => RightImg 컴포넌트 */}
          {currentUser ? <RightArea currentUser={currentUser} /> : null}
        </ArtistBox>
      </Container>
      {/* 포스트 작성 컴포넌트임 => WritePost 컴포넌트 */}
      {modalOpen ? (
        <WritePost
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          postData={postData}
          setPostData={setPostData}
          groupId={Number(groupId)}
          currentUser={currentUser}
        />
      ) : null}
    </>
  );
};

export default Artist;
