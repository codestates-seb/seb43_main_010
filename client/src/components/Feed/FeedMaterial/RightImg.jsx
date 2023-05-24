import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MiniFoot from '../../Foot/MiniFoot';

const RightImgBlock = styled.div`
  width: 353px;
  height: 574px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-left: 39px;
`;

const RealRightImgBlock = styled.div`
  width: 353px;
  height: 506px;

  border-radius: 15px;
  color: var(--white-100);
  box-shadow: 0 0 12px rgb(19, 28, 35, 15%);

  .artist-img {
    width: 353px;
    height: 398px;
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: end;
    border-radius: 15px 15px 0 0;

    // 임시 이미지임.. 나중에 수정해야 함
    background: ${({ groupImg }) => `no-repeat url(${groupImg})`};
    background-size: 353px 398px;

    // 글자 잘 보이게 딤 처리함
    .txt-bg {
      border-radius: 0 15px 0 0;
      height: 135px;
      background: linear-gradient(-320deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgb(19, 28, 35, 50%) 220%, rgba(255, 255, 255, 0) 75%);
    }

    .txt-box {
      display: flex;
      justify-content: center;
      align-items: end;
      flex-direction: column;
      padding: 12px 20px;

      .long {
        font-size: 45px;
      }
    }

    .artist-txt {
      font-size: 50px;
      font-weight: 800;
      text-shadow: 0 0 80px rgba(19, 28, 35, 10%);
      text-align: end;
    }

    .cummu-txt {
      font-size: 18px;
      padding-top: 2px;
      text-shadow: 0 0 10px rgba(19, 28, 35, 12%);
    }
  }

  // Let's go chat with BTS
  .chat-box {
    width: 353px;
    height: 108px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 15px 15px;
    // 색상 props로 받아서 바꿔야 함
    background: ${({ gradColor }) => (gradColor ? `${gradColor[3]}` : `#62a6e0`)};
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: 100%;
      width: 353px;
      height: 120px;
      // 색상 props로 받아서 바꿔야 함
      background: ${({ gradColor }) =>
        gradColor ? `linear-gradient(to top, ${gradColor[3]}, transparent)` : `linear-gradient(to top, #62a6e0, transparent)`};
    }

    .chat-txt {
      color: var(--white-100);
      font-size: 28px;
      font-weight: 600;
      text-shadow: 0 0 0 var(--white-100);
      text-shadow: 0 0 35px rgb(255, 255, 255, 80%);
      text-align: center;
      line-height: 120%;
      cursor: pointer;

      .bold-txt {
        font-weight: 700;
      }
    }

    .long {
      color: var(--white-100);
      font-size: 29px;
      font-weight: 600;
      text-shadow: 0 0 0 var(--white-100);
      text-shadow: 0 7px 35px rgb(255, 255, 255, 60%);
      text-align: center;
      line-height: 120%;
      padding-bottom: 10px;
      cursor: pointer;

      .bold-txt {
        font-weight: 700;
      }
    }
  }
`;

const StyledMiniFoot = styled(MiniFoot)`
  transform: translateX(11px) translateY(34px);
`;

const RightImg = () => {
  const { groupId } = useParams();
  const state = useSelector((state) => state.color);
  const group = state.allGroup.find((el) => el.groupId === Number(groupId));
  const gradColor = group ? group.gradColor : [];
  const groupImg = group ? group.groupImg : [];
  const groupName = group ? group.groupName : [];

  return (
    <RightImgBlock>
      <RealRightImgBlock gradColor={gradColor} groupImg={groupImg}>
        <div className='artist-img'>
          <div className='txt-bg'>
            <div className='txt-box'>
              {groupName.length > 10 ? <span className='artist-txt long'>{groupName}</span> : <span className='artist-txt'>{groupName}</span>}
              <span className='cummu-txt'>Community</span>
            </div>
          </div>
        </div>

        <div className='chat-box'>
          {groupName.length > 4 ? (
            <>
              <Link to={`/artist/${groupId}`}>
                <button className='chat-txt long'>
                  {`Let's go chat with `}
                  <br />
                  <span className='bold-txt'>{groupName}</span>
                </button>
              </Link>
            </>
          ) : (
            <Link to={`/artist/${groupId}`}>
              <button className='chat-txt'>
                Let&apos;s go chat with <span className='bold-txt'>{groupName}</span>
              </button>
            </Link>
          )}
        </div>
      </RealRightImgBlock>
      <StyledMiniFoot />
    </RightImgBlock>
  );
};

export default RightImg;
