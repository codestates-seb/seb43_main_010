import styled from 'styled-components';

const ArtistBox = styled.div`
  font-weight: 500;
  hr {
    border: none;
    margin: 10px 0;
  }
  @media screen and (min-width: 768px) {
    width: 395px;
  }

  label {
    height: 16px;
    font-size: 13px;
    line-height: 18.2px;
    color: rgb(109, 109, 109);
  }
  .input-box {
    height: 42px;
    margin: 2px 0 1px 0;
    display: flex;
    position: relative;
    > input {
      flex-grow: 1;
      font-size: 15px;
      line-height: 21px;
      color: rgb(89, 95, 99);
      border-bottom: 0.1rem solid rgb(238, 238, 238);
    }
    input:focus ~ .hrtag::after {
      width: 100%;
      z-index: 1;
    }
  }
`;
const HrTag = styled.hr`
  border: 0px solid red;
  &::after {
    content: '';
    position: absolute;
    left: 0px;
    bottom: -0.1rem;
    width: 0px;
    height: 0.1rem;
    background: linear-gradient(90deg, #95c788, #1cbec8);
    transition: all 0.3s linear 0s;
  }
`;

const ArtistInput = ({ isArtist }) => {
  return (
    <>
      {isArtist && (
        <ArtistBox>
          <label htmlFor='group'>그룹명</label>
          <div className='input-box'>
            <input type='text' id='group' name='group' placeholder='그룹명'></input>
            <HrTag className='hrtag' />
          </div>
        </ArtistBox>
      )}
    </>
  );
};
export default ArtistInput;
