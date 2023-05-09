import styled from 'styled-components';
// import btsJpg from '../../../assets/jpg-file/card-jpg/1-bts.jpg';
// import btsPng from '../../../assets/png-file/card-png/1-bts.png';

const StyledCard = styled.li`
  width: 208px;
  height: 280px;
  border-radius: 15px;
  background-color: var(--white-100);
  box-shadow: 0 0 15px rgba(19, 28, 35, 4%);
  cursor: pointer;

  .jpg-img-box {
    width: 208px;
    height: 221px;
    background: ${({ img }) => `no-repeat url(${img})`};
    background-size: 208px 221px;
    border-radius: 15px 15px 0 0;

    display: flex;
    justify-content: start;
    align-items: end;

    .png-img-box {
      width: 98px;
      transform: translateY(2.57px);
    }
  }

  .name-box {
    width: 208px;
    height: 59px;
    font-size: 18.5px;
    font-weight: 900;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Card = ({ groupName, groupImg, grouplogoImg }) => {
  return (
    <StyledCard img={groupImg}>
      <div className='jpg-img-box'>
        <div className='png-img-box'>
          <img src={grouplogoImg} alt={groupName} />
        </div>
      </div>
      <div className='name-box'>{groupName}</div>
    </StyledCard>
  );
};

export default Card;
