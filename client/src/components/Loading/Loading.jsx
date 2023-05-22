import styled from 'styled-components';
import loadingGif from '../../assets/gif-file/loading.gif';

const LoadingBlock = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .ghost-box {
    padding-top: 60px;
  }

  .ghost-loading {
    width: 400px;
  }
`;

const Loading = () => {
  return (
    <LoadingBlock>
      <div className='ghost-box'>
        <img className='ghost-loading' src={loadingGif} alt='loading' />
      </div>
    </LoadingBlock>
  );
};

export default Loading;
