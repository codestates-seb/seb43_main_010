import styled from 'styled-components';
import profileImg from '../../assets/jpg-file/profile-img.jpg';
import doubleStars from '../../assets/svg-file/double-stars.svg';
import { useState } from 'react';

const PostInputBlock = styled.form`
  input {
    width: 707px;
    height: 66px;
    background-color: var(--white-100);
    border-radius: 35px;
    box-shadow: 0px 1.5px 20px rgb(19, 28, 35, 12%);
    padding-left: 70px;
    color: var(--dark-blue-900);
    font-size: 15.5px;

    /* background: no-repeat url('${profileImg}'), no-repeat url('${doubleStars}'); */
    background: ${({ currentUser }) => `no-repeat url('${currentUser}'), no-repeat url('${doubleStars}')`};
    background-size: 46px 46px, 23px 27px;
    background-position: 10px 10px, 649px 20px;

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: var(--light-gray-350);
      font-weight: 700;
      transform: translateY(1px);
    }
  }
`;

const Input = styled.input.attrs((props) => ({
  cursor: props.pointer ? 'pointer' : 'null',
  transparent: props.transparent ? 'transparent' : 'null',
}))`
  cursor: ${({ cursor }) => cursor};
  caret-color: ${({ transparent }) => transparent};
`;

/* 공용 input입니다! transparent와 placeholder, pointer를 props로 받고 있어요. */
const PostInput = ({ transparent, placeholder, pointer, currentUser }) => {
  const [content, setContent] = useState('');

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const submitFn = (e) => {
    e.preventDefault();
    // 이 부분은 채팅시에 사용하게 되실 듯
    // 서버에 데이터를 전송해주세요!
  };

  return (
    <PostInputBlock onSubmit={submitFn} currentUser={currentUser}>
      <Input
        onChange={changeContent}
        transparent={transparent}
        pointer={pointer}
        type='text'
        placeholder={placeholder}
        id='content'
        name='content'
        autoComplete='off'
        required
      />
    </PostInputBlock>
  );
};

export default PostInput;
