import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchInput from './SearchInput';
import Notice from './Notice';

const RightIconBlock = styled.div`
  display: flex;
  margin-right: 27px;

  .search,
  .bell,
  .people,
  .ques {
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

  .bell-box {
    margin-right: 7px;
    position: relative;
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
  const [openNotice, setOpenNotice] = useState(false);

  const handleChange = () => {
    setOpenSearch(!openSearch);
  };

  const toggleNotice = () => {
    setOpenNotice(!openNotice);
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

      <div className='bell-box'>
        <button onClick={toggleNotice} className='bell'>
          <i className='i-bell-icon' />
        </button>
        {/* 알림 모달 => Notice 컴포넌트 */}
        {openNotice && <Notice openNotice={openNotice} setOpenNotice={setOpenNotice} />}
      </div>
      <StyledLink to={'/profile'}>
        <button className='people' tabIndex='-1'>
          <i className='i-people-icon' />
        </button>
      </StyledLink>
      <StyledLink to={'/introduction'}>
        <button className='ques'>
          <i className='i-ques-icon' />
        </button>
      </StyledLink>
    </RightIconBlock>
  );
};

export default RightIcon;
