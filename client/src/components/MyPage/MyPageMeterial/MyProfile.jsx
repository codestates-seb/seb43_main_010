import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { removeCookie } from '../../Login/LoginMaterial/setCookie';
import { logout, setCurrentUser } from '../../../reducer/userSlice';
import { resetCommunity } from '../../../reducer/communitySlice';
import CommunityModal from './MyProfileModal';
import BTS from '../../../assets/jpg-file/card-jpg/1-bts.jpg';
import TXT from '../../../assets/jpg-file/card-jpg/2-txt.jpg';
import NewJeans from '../../../assets/jpg-file/card-jpg/3-newJeans.jpg';

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftBox = styled.div`
  width: 334px;
  height: 208px;
  margin-top: 166px;
  border-radius: 16px;
  background-color: var(--white-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div`
  width: 124px;
  height: 64px;
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const Name = styled.span`
  font-size: 35px;
  font-weight: 900;
  color: var(--gray-980);
  margin-bottom: 11px;
  display: block;
`;

const NickName = styled.span`
  font-size: 17.5px;
  font-weight: 700;
  color: var(--gray-980);
  margin-bottom: 3px;
  display: block;
`;

const ArtistName = styled.span`
  font-size: 12.5px;
  font-weight: 500;
  color: var(--light-gray-500);
  margin-bottom: 20px;
  display: block;
`;

const MembershipDate = styled.span`
  font-size: 12.5px;
  font-weight: 500;
  color: var(--light-gray-300);
  display: block;
`;

const Email = styled.span`
  font-size: 23px;
  font-weight: 500;
  color: var(--dark-blue-700);
  margin-bottom: 20px;
  display: block;
`;

const LogoutBtn = styled.button`
  height: 16px;
  color: var(--gray-blue-400);
  font-size: 13px;
  font-weight: 500;
  display: block;
  cursor: pointer;
  text-decoration: underline;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 334px;
  height: 669px;
  margin-top: 23px;
`;

const Title = styled.span`
  font-size: 23px;
  font-weight: bold;
  color: var(--gray-980);
  margin-bottom: 20px;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 334px;
  height: 215px;
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: var(--white-100);
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 16px;
  color: var(--gray-blue-300);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  margin-right: 10px;
`;

const Input = styled.input`
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-blue-850);
  border: 1px solid var(--gray-blue-200);
  padding: 4px 8px;
  margin-top: 10px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: var(--gray-blue-400);
    box-shadow: 0 0 3px var(--gray-blue-200);
  }
`;

const ArtistCard = ({ imgSrc, imgAlt, artistName, membershipDate, handleDeleteBtnClick }) => {
  const [editMode, setEditMode] = useState(false);
  const [nickName, setNickName] = useState('TATA-V');
  const [newNickName, setNewNickName] = useState(nickName);

  const handlePenClick = () => {
    setEditMode(true);
  };

  const handleNickNameChange = (e) => {
    setNewNickName(e.target.value);
  };

  const handleNickNameSubmit = (e) => {
    e.preventDefault();
    setNickName(newNickName);
    setEditMode(false);
  };

  return (
    <Box>
      <Img>
        <img src={imgSrc} alt={imgAlt} />
      </Img>
      {editMode ? (
        <form onSubmit={handleNickNameSubmit}>
          <Input type='text' value={newNickName} onChange={handleNickNameChange} />
        </form>
      ) : (
        <NickName>
          {nickName}{' '}
          <button className='pen' onClick={handlePenClick}>
            <i className='i-name-pen-icon' />
          </button>
        </NickName>
      )}
      <ArtistName>{artistName}</ArtistName>
      <MembershipDate>{membershipDate} 가입</MembershipDate>
      <DeleteBtn onClick={handleDeleteBtnClick}>
        커뮤니티
        <br />
        탈퇴하기
      </DeleteBtn>
    </Box>
  );
};

const MyProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [membershipDate, setMembershipDate] = useState('2023-04-28');
  const [artistCards, setArtistCards] = useState([
    { imgSrc: BTS, imgAlt: 'BTS', nickName: 'TATA-V', artistName: 'BTS' },
    { imgSrc: TXT, imgAlt: 'TXT', nickName: 'TATA-V', artistName: 'TXT' },
    { imgSrc: NewJeans, imgAlt: 'NewJeans', nickName: 'TATA-V', artistName: 'NewJeans' },
  ]);

  const handleDeleteBtnClick = (index) => () => {
    setShowModal({ open: true, index });
  };

  const handleCancelBtnClick = () => {
    setShowModal(false);
  };

  // const handleConfirmBtnClick = async () => {
  // try {
  //   const response = await axios.delete('사용자 정보 삭제 API 엔드포인트');
  //   if (response.status === 200) {
  //     setArtistCards(artistCards.filter((_, i) => i !== showModal.index));
  //     setShowModal({ open: false, index: null });
  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  // }
  // };

  const handleConfirmBtnClick = () => {
    // showModal이 객체이고 index 프로퍼티를 가지고 있을 때만 배열에서 제거
    if (typeof showModal === 'object' && Object.prototype.hasOwnProperty.call(showModal, 'index')) {
      const updatedArtistCards = artistCards.filter((_, i) => i !== showModal.index);
      setArtistCards(updatedArtistCards);
    }

    setShowModal(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/userdata');
        if (response.status === 200) {
          setName(response.data.nickname);
          setEmail(response.data.email);
          setMembershipDate(response.data.membershipDate);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    dispatch(setCurrentUser(null));
    removeCookie();
    dispatch(logout());
    dispatch(resetCommunity());
    alert('로그아웃되었습니다.');

    navigate('/login');
    // try {
    //   // 로그아웃 API 요청
    //   const response = await axios.post('로그아웃 API 엔드포인트');
    //   if (response.status === 200) {
    //     // 로그아웃 후 화면 전환 로직 추가
    //     <Link to='/'></Link>;
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <>
      <LeftWrapper>
        <LeftBox>
          <Name>{name}</Name>
          <Email>{email}</Email>
          <LogoutBtn onClick={handleLogoutClick}>로그아웃</LogoutBtn>
        </LeftBox>
        <Container>
          <Title>나의 프로필</Title>
          {artistCards.map((card, index) => (
            <ArtistCard
              key={index}
              imgSrc={card.imgSrc}
              imgAlt={card.imgAlt}
              nickName={card.nickName}
              artistName={card.artistName}
              membershipDate={membershipDate}
              handleDeleteBtnClick={handleDeleteBtnClick(index)}
            />
          ))}
        </Container>
      </LeftWrapper>
      {showModal && (
        <CommunityModal showModal={showModal.open} handleCancelBtnClick={handleCancelBtnClick} handleConfirmBtnClick={handleConfirmBtnClick} />
      )}
    </>
  );
};

export default MyProfile;
