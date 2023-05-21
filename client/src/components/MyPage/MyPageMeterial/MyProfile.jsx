import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BTS from '../../../assets/jpg-file/card-jpg/1-bts.jpg';
import TXT from '../../../assets/jpg-file/card-jpg/2-txt.jpg';
import NewJeans from '../../../assets/jpg-file/card-jpg/3-newJeans.jpg';
import { removeCookie } from '../../Login/LoginMaterial/setCookie';
import axios from 'axios';

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
  width: 60px;
  position: absolute;
  top: 0;
  right: 0;
  height: 16px;
  color: var(--gray-blue-300);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: var(--white-100);
  width: 428px;
  height: 302px;
  border-radius: 14px;
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ModalText = styled.div`
  display: flex;
  /* text-align: left; */
  /* align-items: flex-start; // text와 ✰의 정렬을 위해 추가 */
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
`;

const ModalTextBold = styled.div`
  font-size: 12.8px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ModalBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ConfirmBtn = styled.button`
  width: 170px;
  height: 50px;
  font-size: 15px;
  font-weight: bold;
  color: var(--skyblue-500);
`;

const CancelBtn = styled(ConfirmBtn)`
  background-color: var(--white-100);
  color: var(--dark-blue-900);
`;

const Star = styled.span`
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
      <Link to='/myprofile/:groupId'>
        <Img>
          <img src={imgSrc} alt={imgAlt} />
        </Img>
      </Link>
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
      <DeleteBtn onClick={handleDeleteBtnClick}>커뮤니티 탈퇴하기</DeleteBtn>
    </Box>
  );
};

const MyProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [membershipDate, setMembershipDate] = useState('2023-04-28');
  const [artistCards, setArtistCards] = useState([
    { imgSrc: BTS, imgAlt: 'BTS', nickName: 'TATA-V', artistName: 'BTS' },
    { imgSrc: TXT, imgAlt: 'TXT', nickName: 'TATA-T', artistName: 'TXT' },
    { imgSrc: NewJeans, imgAlt: 'NewJeans', nickName: 'TATA-J', artistName: 'NewJeans' },
  ]);

  const handleDeleteBtnClick = (index) => () => {
    setShowModal({ open: true, index });
  };

  const handleCancelBtnClick = () => {
    setShowModal(false);
  };

  const handleConfirmBtnClick = async () => {
    try {
      const response = await axios.delete('사용자 정보 삭제 API 엔드포인트');
      if (response.status === 200) {
        setArtistCards(artistCards.filter((_, i) => i !== showModal.index));
        setShowModal({ open: false, index: null });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // 회원 가입일 가져오기
    const fetchMembershipDate = async () => {
      try {
        const response = await axios.get('회원가입일자 API 엔드포인트');
        if (response.status === 200) {
          setMembershipDate(response.data.membershipDate);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMembershipDate();
  }, []);
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    removeCookie();
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
          <Name>TATA-V</Name>
          <Email>tata-v@example.com</Email>
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
        <ModalWrapper>
          <ModalContent>
            <ModalTitle>커뮤니티를 탈퇴하시겠습니까?</ModalTitle>
            <ModalText>
              <Star>✰</Star>커뮤니티를 탈퇴하더라도 내가 작성한 콘텐츠는 삭제되지 않습니다. 프로필 사진과 닉네임도 함께 유지되어 노출됩니다.
            </ModalText>
            <ModalText>
              <Star>✰</Star>커뮤니티 내 모든 구독 정보가 초기화됩니다.
            </ModalText>
            <ModalText>
              <Star>✰</Star>커뮤니티의 MY 프로필 화면을 볼 수 없습니다.
            </ModalText>
            <ModalText>
              <Star>✰</Star>이 커뮤니티에서 진행된 혜택을 행사할 수 없습니다.
            </ModalText>
            <ModalTextBold>일부 정보와혜택은 재가입해도 복구되지 않습니다.</ModalTextBold>
            <ModalBtnWrapper>
              <CancelBtn onClick={handleCancelBtnClick}>취소</CancelBtn>
              <ConfirmBtn onClick={handleConfirmBtnClick}>탈퇴</ConfirmBtn>
            </ModalBtnWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default MyProfile;
