import styled from 'styled-components';
import searchIcon from '../../../assets/svg-file/search-input-icon.svg';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchArtistLi from './SearchArtistLi';

const SearchInputBlock = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  position: relative;

  input {
    width: 300px;
    height: 48px;
    border: none;
    border-radius: 35px;
    box-shadow: 0px 0px 7px #48525d;
    padding-left: 50px;
    font-size: 14px;
    color: var(--white-100);
    caret-color: var(--skyblue-500);

    background: no-repeat url('${searchIcon}');
    background-size: 19px;
    background-position: 21px;
    background-color: var(--dark-blue-500);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--gray-blue-400);
      text-shadow: 0 0 0 var(--gray-blue-400);
    }
  }
  @media screen and (max-width: 800px) {
    input {
      width: 200px;
      transform: translateX(20px);
      transition: 0.25s linear;
    }
  }
  @media screen and (min-width: 801px) {
    input {
      width: 300px;
      transition: 0.25s linear;
    }
  }
`;

const SearchArtistUl = styled.ul`
  width: 300px;
  border-radius: 15px;
  background-color: var(--white-100);
  box-shadow: 0 0 20px rgba(19, 28, 35, 12%);
  padding: 8px;
  max-height: 78vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 94%;

  display: flex;
  align-items: center;
  flex-direction: column;

  .not {
    color: var(--light-gray-350);
    font-size: 16px;
    font-weight: 600;
    height: 150px;
    display: flex;
    align-items: center;
  }

  .li:last-child {
    .artist-box {
      border-bottom: none;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const SearchInput = ({ openSearch, setOpenSearch }) => {
  const [searchName, setSearchName] = useState('');
  const [searchModal, setSearchModal] = useState(false);

  const inputRef = useRef(null);
  const artUlRef = useRef(null);

  const { myCommunity, isUserFan } = useSelector((state) => state.community);
  const { allGroup } = useSelector((state) => state.color);

  // 검색 input 창
  useEffect(() => {
    const clickOutInput = (e) => {
      if (openSearch && inputRef.current && !artUlRef.current && !inputRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener('mousedown', clickOutInput);
    if (inputRef.current) return inputRef.current.focus();
    return () => {
      document.removeEventListener('mousedown', clickOutInput);
    };
  }, [openSearch]);

  // 아티스트 리스트 모달
  useEffect(() => {
    const clickOut = (e) => {
      if (
        openSearch &&
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        searchModal &&
        inputRef.current &&
        !artUlRef.current.contains(e.target)
      ) {
        setOpenSearch(false);
        setSearchModal(false);
      }
    };
    document.addEventListener('mousedown', clickOut);
    return () => {
      document.removeEventListener('mousedown', clickOut);
    };
  }, [openSearch, searchModal]);

  // 함수 영역
  const filterId = new Set(myCommunity);

  const filterName = allGroup.filter((el) => {
    const findGroupName = new Set(el.groupName.toLocaleLowerCase().replace(' ', ''));
    return findGroupName.has(searchName.toLocaleLowerCase().replace(' ', ''));
  });

  const searchChange = (e) => {
    setSearchName(e.target.value);

    if (e.target.value.length > 0) {
      setSearchModal(true);
    } else {
      setSearchModal(false);
    }
  };

  return (
    <>
      <SearchInputBlock>
        <input
          ref={inputRef}
          onChange={searchChange}
          type='text'
          placeholder='Search Artist'
          id='nickname'
          name='nickname'
          autoComplete='off'
          required
        />
      </SearchInputBlock>

      {searchModal && (
        <SearchArtistUl ref={artUlRef}>
          {filterName.length > 0 ? (
            filterName.map((el) => (
              <StyledLink
                to={filterId.has(el.groupId) ? `/feed/${el.groupId}` : isUserFan ? `/join/${el.groupId}` : `/feed/${el.groupId}`}
                key={el.groupId}
              >
                <SearchArtistLi groupName={el.groupName} grouplogoImg={el.grouplogoImg} />
              </StyledLink>
            ))
          ) : (
            <div className='not'>검색 결과가 없습니다.</div>
          )}
        </SearchArtistUl>
      )}
    </>
  );
};

export default SearchInput;
