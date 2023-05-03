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
  }
  .squre-fill {
    width: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
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
