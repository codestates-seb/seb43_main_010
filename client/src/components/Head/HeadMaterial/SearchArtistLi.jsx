import styled from 'styled-components';

const SearchArtistLiBlock = styled.li`
  width: 100%;
  height: 57px;
  border-radius: 8px;
  cursor: pointer;
  padding: 0 11.5px;
  transition: 0.18s ease-in-out;

  display: flex;
  justify-content: start;
  align-items: center;
  flex-shrink: 0;

  &:hover {
    background-color: var(--light-gray-150);
    transition: 0.18s ease-in-out;
  }

  .artist-box {
    width: 283px;
    height: 57px;
    border-bottom: 1px solid var(--light-gray-150);

    display: flex;
    justify-content: start;
    align-items: center;
  }

  .artist-img {
    width: 52px;
    height: 20px;
    display: flex;
    flex-shrink: 0;
  }

  span {
    color: var(--dark-blue-900);
    font-size: 16.5px;
    font-weight: 700;
    margin-left: 9px;
  }
`;

const SearchArtistLi = ({ groupName, grouplogoImg }) => {
  return (
    <SearchArtistLiBlock className='li'>
      <div className='artist-box'>
        <img className='artist-img' src={grouplogoImg} alt={groupName} />
        <span>{groupName}</span>
      </div>
    </SearchArtistLiBlock>
  );
};

export default SearchArtistLi;
