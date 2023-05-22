import styled from 'styled-components';

const ImgPreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 28px;
  width: 767px;
  height: 170px;
  transform: translateX(-20px) translateY(-20px);
  position: relative;
  .preview-txt {
    color: var(--light-gray-500);
    font-size: 14px;
    text-shadow: 0 0 0 var(--light-gray-500);
    position: absolute;
    top: -28px;
  }
`;
//이미지 미리보기
const ImgPreview = styled.div`
  /* flex-grow: 1; */
  width: 100%;
  height: 100%;
  display: flex;
  gap: 5px;
  .img-box {
    position: relative;
    width: 25%;
    height: 100%;
    .post-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem;
    }
    .delete-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 10px;
      right: 10px;
      width: 22px;
      height: 22px;
      color: var(--light-gray-100);
      background: linear-gradient(0deg, hsla(0, 0%, 100%, 0.2), hsla(0, 0%, 100%, 0.2)), rgba(0, 0, 0, 0.45);
      border-radius: 1rem;
      z-index: 1;
      font-size: 0.7rem;
      /* font-weight: 600; */
      :hover {
        background: linear-gradient(0deg, hsla(0, 0%, 100%, 0.2), hsla(0, 0%, 100%, 0.2)), rgba(45, 45, 45, 0.45);
      }
    }
  }
`;

const WriteImgPreview = ({ imgList, handleDeleteImg }) => {
  return (
    <ImgPreviewBox>
      <div className='preview-txt'>이미지 목록</div>
      <ImgPreview>
        {imgList.map((el) => {
          return (
            <div key={el.id} className='img-box'>
              <img className='post-img' src={el.url} alt='post-img' />
              <button
                className='delete-btn'
                onClick={() => {
                  handleDeleteImg(el.id);
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </ImgPreview>
    </ImgPreviewBox>
  );
};

export default WriteImgPreview;
