import styled from 'styled-components';

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
    background-position: center;
    transition: 0.2s ease-in-out;

    display: flex;
    justify-content: start;
    align-items: end;

    &:hover {
      background-size: 214px 228px;
      transition: 0.2s ease-in-out;
    }

    .png-img-box {
      width: 98px;
      display: flex;

      .png-img {
        transform: translateY(0.6px);
      }
    }
  }

  .name-box {
    width: 208px;
    height: 59px;
    color: var(--dark-blue-900);
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
          <img className='png-img' src={grouplogoImg} alt={groupName} />
        </div>
      </div>
      <div className='name-box'>{groupName}</div>
    </StyledCard>
  );
};

export default Card;
