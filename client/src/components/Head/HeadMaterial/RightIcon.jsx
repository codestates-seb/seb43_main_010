import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchInput from './SearchInput';

const RightIconBlock = styled.div`
  display: flex;
  margin-right: 27px;

  button {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    margin-right: 7px;
    transition: 0.04s ease-in-out;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:last-of-type {
      margin-right: 0;
    }

    &:hover {
      background-color: var(--dark-blue-800);
      transition: 0.04s ease-in-out;
    }
  }

  .search {
    font-size: 25px;
  }
  .people {
    font-size: 27px;
  }
  .bell,
  .ques {
    font-size: 26px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const RightIcon = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const handleChange = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <RightIconBlock>
      {openSearch ? (
        <SearchInput openSearch={openSearch} setOpenSearch={setOpenSearch} />
      ) : (
        <button className='search' onClick={handleChange}>
          <i className='i-search-icon' />
        </button>
      )}

      <button className='bell'>
        <i className='i-bell-icon' />
      </button>
      <StyledLink to={'/profile'}>
        <button className='people' tabIndex='-1'>
          <i className='i-people-icon' />
        </button>
      </StyledLink>
      <button className='ques'>
        <i className='i-ques-icon' />
      </button>
    </RightIconBlock>
  );
};

export default RightIcon;
