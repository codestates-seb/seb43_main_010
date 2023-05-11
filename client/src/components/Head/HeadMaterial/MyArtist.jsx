import styled from 'styled-components';
import btsPng from '../../../assets/png-file/card-png/1-bts.png';

const MyArtistBlock = styled.li`
  width: 283px;
  height: 57px;
  border-radius: 8px;
  padding: 0 11.5px;

  display: flex;
  justify-content: start;
  align-items: center;

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
`;

const MyArtist = () => {
  return (
    <MyArtistBlock>
      {/* 이미지와 alt 부분을 나중에 데이터 받아서 수정해줘야 함 */}
      {/* 만약 현재페이지와 같은 그룹이름이라면 => 글자 색상을 skyblue600으로 바꿔야 함 */}
      <div className='artist-img'>
        <img src={btsPng} alt='bts' />
      </div>
      <span>BTS</span>
    </MyArtistBlock>
  );
};

export default MyArtist;
