import styled from 'styled-components';
import doubleStars from '../../assets/svg-file/double-stars.svg';
import { useSelector } from 'react-redux';

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
const PostInput = ({ transparent, placeholder, pointer }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <PostInputBlock currentUser={currentUser.profile}>
      <Input
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
