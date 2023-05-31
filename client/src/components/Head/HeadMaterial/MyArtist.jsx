import styled from 'styled-components';

const MyArtistBlock = styled.li`
  width: 100%;
  height: 57px;
  border-radius: 8px;
  padding: 14px 12px;

  display: flex;
  justify-content: start;
  align-items: center;
  flex-shrink: 0;

  &:hover {
    background-color: var(--light-gray-150);
    transition: 0.18s;
  }

  .artist-img {
    width: 52px;
  }

  span {
    color: var(--dark-blue-900);
    font-size: 16.5px;
    font-weight: 700;
    margin-left: 9px;
  }

  &.scrollbar {
    width: 270px;
  }
`;

const MyArtist = ({ groupId, grouplogoImg, groupName }) => {
  return (
    <MyArtistBlock onClick={() => (window.location.href = `/feed/${groupId}`)}>
      {/* 이미지와 alt 부분을 나중에 데이터 받아서 수정해줘야 함 */}
      {/* 만약 현재페이지와 같은 그룹이름이라면 => 글자 색상을 skyblue600으로 바꿔야 함 */}
      <div className='artist-img'>
        <img src={grouplogoImg} alt={groupName} />
      </div>
      <span>{groupName}</span>
    </MyArtistBlock>
  );
};

export default MyArtist;
