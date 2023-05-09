import styled from 'styled-components';
import btsImg from '../../../assets/jpg-file/card-jpg/1-bts.jpg';

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
  background-color: var(--dark-blue-900);
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
    background: no-repeat url('${btsImg}');
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
      align-items: center;
      flex-direction: column;
      padding: 12px 20px;
    }

    .artist-txt {
      font-size: 50px;
      font-weight: 800;
    }

    .cummu-txt {
      font-size: 18px;
    }
  }

  // Let's go chat with BTS
  .chat-box {
    width: 353px;
    height: 108px;
    display: flex;
    justify-content: center;
    align-items: center;

    .chat-txt {
      color: var(--white-100);
      font-size: 25px;
      font-weight: 600;
      text-shadow: 0 0 35px rgb(255, 255, 255, 80%);
      cursor: pointer;
    }
  }
`;

const StyledMiniFoot = styled(MiniFoot)`
  transform: translateX(11px) translateY(34px);
`;

const RightImg = () => {
  return (
    <RightImgBlock>
      <RealRightImgBlock>
        <div className='artist-img'>
          <div className='txt-bg'>
            <div className='txt-box'>
              <span className='artist-txt'>BTS</span> {/* 나중에 수정해야 함 */}
              <span className='cummu-txt'>Community</span>
            </div>
          </div>
        </div>

        <div className='chat-box'>
          <div className='chat-txt'>Let&lsquo;s go chat with BTS</div> {/* 나중에 수정해야 함, 링크도 추가해야 함 */}
        </div>
      </RealRightImgBlock>
      <StyledMiniFoot />
    </RightImgBlock>
  );
};

export default RightImg;
