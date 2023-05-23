import styled from 'styled-components';

const ImgPreviewBox = styled.ul`
  margin: 5px auto;
  width: 90%;
  /* height: 600px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  .img-box {
    position: relative;
    width: 100%;
    height: 100%;
    .posted-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem;
    }
  }
`;

const DetailImgPreview = ({ imgList }) => {
  return (
    <>
      {imgList.length !== 0 ? (
        <ImgPreviewBox>
          {imgList.map((el, idx) => {
            return (
              <li key={idx} className='img-box'>
                <img className='posted-img' src={el} alt='posted-img' />
              </li>
            );
          })}
        </ImgPreviewBox>
      ) : null}
    </>
  );
};

export default DetailImgPreview;
