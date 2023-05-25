import styled from 'styled-components';
import checkFill from '../../../assets/svg-file/check-fill.svg';

const HideArtistBlock = styled.div`
  display: ${({ notArtist }) => (notArtist ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  .hide-txt {
    color: ${({ hide }) => (hide ? 'var(--dark-blue-900)' : 'var(--gray-600)')};
    font-size: 13.5px;
    font-weight: 600;
    margin: 0 45px 0 8.5px;
    transition: 0.12s;
  }

  .squre {
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19px;
    &:hover {
      background: transparent;
    }
  }
  .squre-fill {
    width: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    transform: translateX(0px);
    &:hover {
      background: transparent;
    }
  }
`;

const HideArtist = ({ notArtist, setHide, hide }) => {
  const changeCheck = () => {
    setHide(!hide);
  };

  return (
    <HideArtistBlock notArtist={notArtist} hide={hide}>
      {hide ? (
        <button onClick={changeCheck} className='squre-fill'>
          <img src={checkFill} alt='hide-check' />
        </button>
      ) : (
        <button onClick={changeCheck} className='squre'>
          <i className='i-square-icon' />
        </button>
      )}
      <span className='hide-txt'>Hide from Artists</span>
    </HideArtistBlock>
  );
};

export default HideArtist;
