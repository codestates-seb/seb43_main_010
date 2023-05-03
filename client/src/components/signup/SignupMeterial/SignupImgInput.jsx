import styled from 'styled-components';

const ImgInputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  input {
    display: none;
  }
  label {
    height: 16px;
    font-size: 13px;
    line-height: 18.2px;
    color: rgb(109, 109, 109);
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
const IconBox = styled.div`
  width: 21px;
  height: 21px;
  border: 1px solid #95c788;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    transform: scale(1.1, 1.1);
  }
  .i-plus-artist-icon::before {
    color: #1cbec8;
  }
  .i-trash-icon::before {
    color: #1cbec8;
  }
`;

const Preview = styled.div`
  margin: 25px auto 0px;
  width: 60%;
  padding-bottom: 60%;
  /* height: width; */
  border: 1px solid #95c788;
  border-radius: 5px;
  @media screen and (max-width: 767px) {
    width: 35%;
    padding-bottom: 35%;
    min-width: 165px;
    min-height: 165px;
  }
`;

const SignupImgInput = ({ label, name }) => {
  return (
    <>
      <ImgInputBox>
        <label htmlFor={name}>
          {label}
          <IconBox>
            <i className='i-plus-artist-icon' />
          </IconBox>
          <IconBox>
            <i className='i-trash-icon' />
          </IconBox>
        </label>
        <input className={name} type='file' id={name} name={name} placeholder='이미지업로드' accept='image/*'></input>
      </ImgInputBox>
      <Preview></Preview>
    </>
  );
};

export default SignupImgInput;
