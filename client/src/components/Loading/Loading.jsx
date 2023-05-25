import styled from 'styled-components';
import loadingGif from '../../assets/gif-file/loading.gif';

const LoadingBlock = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes loadingFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: loadingFadeIn 0.3s ease-in-out forwards;

  .ghost-box {
    padding-top: 60px;
    filter: ${({ bgWhite }) => (bgWhite ? `drop-shadow(0 0 1px #21292f)` : `drop-shadow(0 0 20px rgba(27, 234, 239, 0.2))`)};
  }

  .ghost-loading {
    width: 400px;
    filter: drop-shadow(0 0 1px #21292f);
  }
`;

const Loading = ({ bgWhite }) => {
  return (
    <LoadingBlock bgWhite={bgWhite}>
      <div className='ghost-box'>
        <img className='ghost-loading' src={loadingGif} alt='loading' />
      </div>
    </LoadingBlock>
  );
};

export default Loading;
