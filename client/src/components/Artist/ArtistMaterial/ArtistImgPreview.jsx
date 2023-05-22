import styled from 'styled-components';

const ImgPreviewOne = styled.div`
  margin-top: 3px;
  width: 100%;
  height: 600px;
  display: flex;
  gap: 3px;
  .img-box {
    position: relative;
    width: 100%;
    height: 100%;
    .posted-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      /* border-radius: 0.5rem; */
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
`;
const ImgPreviewTwo = styled.div`
  margin-top: 3px;
  width: 100%;
  height: 316px;
  display: flex;
  gap: 3px;
  .img-box {
    position: relative;
    width: 100%;
    height: 100%;
    .posted-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .img-box:first-child .posted-img {
    border-bottom-left-radius: 0.5rem;
  }
  .img-box:last-child .posted-img {
    border-bottom-right-radius: 0.5rem;
  }
`;
const ImgPreviewThree = styled.div`
  margin-top: 3px;
  width: 100%;
  display: inline-grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'one one two'
    'one one three';
  gap: 3px;
  .img-box {
    .posted-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .img-box:nth-child(1) {
    grid-area: one;
    height: 427px;
    .posted-img {
      border-bottom-left-radius: 0.5rem;
    }
  }
  .img-box:nth-child(2) {
    grid-area: two;
    height: calc(424px / 2);
  }
  .img-box:nth-child(3) {
    grid-area: three;
    height: calc(424px / 2);

    .posted-img {
      border-bottom-right-radius: 0.5rem;
    }
  }
`;
const ImgPreviewFour = styled.div`
  margin-top: 3px;
  width: 100%;
  display: inline-grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'one two'
    'three four';
  gap: 3px;
  .img-box {
    .posted-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .img-box:nth-child(1) {
    grid-area: one;
    height: 320px;
  }
  .img-box:nth-child(2) {
    grid-area: two;
    height: 320px;
  }
  .img-box:nth-child(3) {
    grid-area: three;
    height: 320px;

    .posted-img {
      border-bottom-left-radius: 0.5rem;
    }
  }
  .img-box:nth-child(4) {
    grid-area: four;
    height: 320px;

    .posted-img {
      border-bottom-right-radius: 0.5rem;
    }
  }
`;

const ArtistImgPreview = ({ imgList }) => {
  return (
    <>
      {imgList.length === 1 ? (
        <ImgPreviewOne>
          {imgList.map((el, idx) => {
            return (
              <li key={idx} className='img-box'>
                <img className='posted-img' src={el} alt='posted-img' />
              </li>
            );
          })}
        </ImgPreviewOne>
      ) : null}
      {imgList.length === 2 ? (
        <ImgPreviewTwo>
          {imgList.map((el, idx) => {
            return (
              <li key={idx} className='img-box'>
                <img className='posted-img' src={el} alt='posted-img' />
              </li>
            );
          })}
        </ImgPreviewTwo>
      ) : null}
      {imgList.length === 3 ? (
        <ImgPreviewThree>
          {imgList.map((el, idx) => {
            return (
              <li key={idx} className='img-box'>
                <img className='posted-img' src={el} alt='posted-img' />
              </li>
            );
          })}
        </ImgPreviewThree>
      ) : null}
      {imgList.length === 4 ? (
        <ImgPreviewFour>
          {imgList.map((el, idx) => {
            return (
              <li key={idx} className='img-box'>
                <img className='posted-img' src={el} alt='posted-img' />
              </li>
            );
          })}
        </ImgPreviewFour>
      ) : null}
    </>
  );
};

export default ArtistImgPreview;
