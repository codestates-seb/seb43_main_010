import styled from 'styled-components';
import searchIcon from '../../../assets/svg-file/search-input-icon.svg';
import { useState, useRef, useEffect } from 'react';

const RightIconBlock = styled.div`
  display: flex;
  margin-right: 27px;

  button {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    margin-right: 7px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:last-of-type {
      margin-right: 0;
    }

    &:hover {
      background-color: var(--dark-blue-800);
      transition: 0.04s ease-in;
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

  .search-input {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    input {
      width: 300px;
      height: 48px;
      border: none;
      border-radius: 35px;
      box-shadow: 0px 0px 7px #48525d;
      padding-left: 50px;
      color: var(--white-100);
      font-size: 14px;

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
  }
`;

const RightIcon = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const outInput = useRef(null);

  useEffect(() => {
    const clickOutInput = (e) => {
      if (openSearch && outInput.current && !outInput.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener('mousedown', clickOutInput);

    return () => {
      document.addEventListener('mousedown', clickOutInput);
    };
  }, [openSearch]);

  const handleChange = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <RightIconBlock>
      {openSearch ? (
        <form className='search-input'>
          <input ref={outInput} type='text' placeholder='Search Artist' id='nickname' name='nickname' autoComplete='off' required />
        </form>
      ) : (
        <button className='search' onClick={handleChange}>
          <i className='i-search-icon' />
        </button>
      )}

      <button className='bell'>
        <i className='i-bell-icon' />
      </button>
      <button className='people'>
        <i className='i-people-icon' />
      </button>
      <button className='ques'>
        <i className='i-ques-icon' />
      </button>
    </RightIconBlock>
  );
};

export default RightIcon;
