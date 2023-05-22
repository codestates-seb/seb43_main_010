import styled from 'styled-components';
import doubleStars from '../../../assets/png-file/double-stars.png';
import { useState } from 'react';

const CommentInputBlock = styled.div`
  width: 495px;
  height: 81px;
  border-radius: 0 0 5px 5px;
  background-color: #394045;
  box-shadow: 0 0 14px rgb(255, 255, 255, 0.02);
  padding: 22.85px 11px 0 11px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 495px;
    height: 30px;
    bottom: 100%;
    left: 0%;
    background-color: #fff;
    background: linear-gradient(to bottom, transparent, #394045);
    z-index: 1;
  }

  .comment-from {
    input {
      color: var(--light-gray-200);
      width: 473px;
      height: 43.53px;
      border-radius: 35px;
      box-shadow: 0 0 14px rgb(255, 255, 255, 0.05);
      padding: 0 54px 0 20px;
      caret-color: var(--skyblue-500);

      background: no-repeat url(${doubleStars});
      background-size: 18px 20.31px;
      background-position: 95.4% 50%;
      background-color: #4a5258;

      &::placeholder {
        color: #727d86;
        font-size: 14px;
        font-weight: 700;
        transform: translateY(1px);
      }
    }
  }
`;

const CommentInput = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (comment.length > 0) {
      // 서버에 뮤직 댓글 전송
    }
  };

  return (
    <CommentInputBlock>
      <form onSubmit={handleSubmitComment} className='comment-from'>
        <input
          onChange={handleCommentChange}
          type='text'
          placeholder='댓글 작성 후 Enter를 눌러주세요'
          name='commentContent'
          autoComplete='off'
          required
        ></input>
      </form>
    </CommentInputBlock>
  );
};

export default CommentInput;
