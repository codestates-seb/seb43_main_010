import styled from 'styled-components';
import bigImg from '../../../assets/gif-file/big-img.gif';

const BigImgBoxBlock = styled.div`
  width: 100%;
  height: 300px;
  background-color: var(--dark-blue-900);

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 620px;
    margin-left: 15px;
  }
`;

const BigImgBox = () => {
  return (
    <BigImgBoxBlock>
      <img src={bigImg} alt='space-for-all-fans' />
    </BigImgBoxBlock>
  );
};

export default BigImgBox;
