import styled from 'styled-components';
import profileImg from '../../../assets/jpg-file/profile-img.jpg';

const CommentsBlock = styled.li`
  overflow-y: auto;
  max-height: 49vh;
  overflow-x: hidden;
`;

const Comment = styled.div`
  padding: 13px 0 13px 19px;

  .comments-author {
    display: flex;
    width: 745px;
    justify-content: space-between;
  }

  .user-img-txt {
    display: flex;
    margin-bottom: 7.5px;

    .profile-img {
      width: 32px;
      height: 32px;
      background: no-repeat url('${profileImg}');
      background-size: 32px 32px;
    }

    .user-txt {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: column;
      transform: translateX(8px);
    }

    .nickname {
      color: var(--dark-blue-900);
      font-size: 14px;
      font-weight: 700;
    }

    .time {
      color: var(--light-gray-500);
      font-size: 12px;
      text-shadow: 0 0 0 var(--light-gray-500);
      margin-top: 3px;
    }
  }

  .mini-menu {
    width: 37px;
    height: 37px;
    font-size: 16px;
    transform: translateX(-13px);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: var(--light-gray-100);
      transition: 0.15s;
    }

    i::before {
      color: var(--light-gray-400);
    }
  }

  .comments-content {
    color: var(--dark-blue-900);
    font-size: 15px;
    text-shadow: 0 0 0 var(--dark-blue-900);
    padding: 0 33px 0 40px;
    line-height: 125%;
  }

  .bottom-icon {
    display: flex;
    padding: 11px 33px 0 40px;

    .thumbs-up {
      font-size: 16px;
      i:before {
        color: var(--light-gray-500);
      }
    }

    .bubble {
      font-size: 16px;
      transform: translateX(16px);
      i:before {
        color: var(--light-gray-500);
      }
    }
  }
`;

const Comments = () => {
  return (
    <CommentsBlock>
      <Comment>
        <div className='comments-author'>
          <div className='user-img-txt'>
            <div className='profile-img'></div>
            <div className='user-txt'>
              <span className='nickname'>유저 닉네임2</span>
              <span className='time'>05. 01. 10:26</span>
            </div>
          </div>
          <button className='mini-menu'>
            <i className='i-three-point-menu-icon' />
          </button>
        </div>
        <div className='comments-content'>
          <p>난 김태형 그닥이던데.. 내 마음으로 다그닥 다그닥🐎🐎💜</p>
        </div>
        <div className='bottom-icon'>
          <button className='thumbs-up'>
            <i className='i-thumbs-up-icon' />
          </button>
          <button className='bubble'>
            <i className='i-bubble-icon' />
          </button>
        </div>
      </Comment>
    </CommentsBlock>
  );
};

export default Comments;
