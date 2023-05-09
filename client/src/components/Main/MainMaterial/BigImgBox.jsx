import styled from 'styled-components';
import bigImg from '../../../assets/png-file/big-img.png';

const BigImgBoxBlock = styled.div`
  width: 100%;
  height: 300px;
  background-color: var(--dark-blue-900);

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 573px;
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
