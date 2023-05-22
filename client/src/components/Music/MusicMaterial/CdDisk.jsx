import styled from 'styled-components';
import cdImg from '../../../assets/png-file/cd.png';
import lineImg from '../../../assets/png-file/lp-line.png';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CdDiskBlock = styled.div`
  margin-top: -183px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0%;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .cd-box {
    width: 562px;
    border-radius: 50%;
    animation: rotate 7.2s linear infinite;
    animation-play-state: ${({ isPlaying }) => (isPlaying ? 'running' : 'paused')};
  }

  .cd-bg {
    position: absolute;
    width: 562px;
    height: 562px;
    border-radius: 50%;
    background: ${({ gradColor }) =>
      gradColor ? `linear-gradient(to right, ${gradColor[0]}, ${gradColor[1]})` : `linear-gradient(to right, #5faae1, #0c6bb0)`};
    mix-blend-mode: multiply;
    box-shadow: ${({ gradColor }) =>
      gradColor
        ? `0 0 61px rgba(${parseInt(gradColor[1].slice(1, 3), 16)}, ${parseInt(gradColor[1].slice(3, 5), 16)}, ${parseInt(
            gradColor[1].slice(5, 7),
            16,
          )}, 0.7)`
        : `0 0 61px rgba(12, 107, 176, 0.7)`};
    animation-play-state: ${({ isPlaying }) => (isPlaying ? 'running' : 'paused')};
    opacity: 70%;
  }
`;

const Tonearm = styled.div`
  position: absolute;
  width: 213px;
  bottom: 21.9%;
  right: -19.75%;

  img {
    filter: drop-shadow(5px 0px 9px rgb(0, 0, 0, 0.75)) invert(3%);
  }
`;

const Neon = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  top: 69%;

  span {
    display: block;
    margin: auto;
    padding: 1rem 1.25rem;
    font-family: sans-serif;
    font-size: 21.5px;
    font-weight: 800;
    text-decoration: none;
    text-shadow: -2px 4px 4px #091d43, 0 0 10px #00d0ff, inset 1px 1px 1px white;
    text-shadow: ${({ isPlaying }) => (isPlaying ? '0 0 10px #287e81' : '0 0 20px rgba(0, 247, 255, 0.2)')};
    color: ${({ isPlaying }) => (isPlaying ? '#1fffff' : '#126567')};
    border: ${({ isPlaying }) => (isPlaying ? '2px solid' : '2.45px solid')};
    border-radius: 4px;
    background-color: transparent;
    box-shadow: ${({ isPlaying }) =>
      isPlaying
        ? `0 1px 2px rgba(19, 28, 35, 0.6), 2px 1px 4px rgba(19, 28, 35, 0.3), 2px 4px 3px rgba(14, 25, 34, 0.3),
      0 0 7px 2px rgba(27, 234, 239, 0.6), inset 0 1px 2px rgba(19, 28, 35, 0.6), inset 2px 1px 4px rgba(19, 28, 35, 0.3),
      inset 2px 4px 3px rgba(14, 25, 34, 0.3), inset 0 0 7px 2px rgba(27, 234, 239, 0.6)`
        : `0 1px 2px rgba(19, 28, 35, 0.6), 2px 1px 4px rgba(19, 28, 35, 0.3), 2px 4px 3px rgba(14, 25, 34, 0.3),
      0 0 7px 2px rgba(154, 215, 217, 0.15), inset 0 1px 2px rgba(19, 28, 35, 0.6), inset 2px 1px 4px rgba(19, 28, 35, 0.3),
      inset 2px 4px 3px rgba(14, 25, 34, 0.2), inset 0 0 7px 2px rgba(154, 215, 217, 0.15)`};
    animation: ${({ isPlaying }) => (isPlaying ? `flickering 5s infinite` : 'none')};
  }

  @keyframes flickering {
    0% {
      border-color: transparent;
      opacity: 0.2;
    }

    2% {
      border-color: #1fffff;
      opacity: 1;
    }

    4% {
      border-color: transparent;
      opacity: 0.2;
    }

    8% {
      border-color: #1fffff;
      opacity: 1;
    }

    28% {
      border-color: #1fffff;
      opacity: 1;
    }

    30% {
      border-color: transparent;
      opacity: 0.2;
    }

    36% {
      border-color: #1fffff;
      opacity: 1;
    }

    100% {
      border-color: #1fffff;
      opacity: 1;
    }
  }
`;

const CdDisk = () => {
  const { groupId } = useParams();
  const state = useSelector((state) => state.color);
  const group = state.allGroup.find((el) => el.groupId === Number(groupId));
  const gradColor = group ? group.gradColor : [];

  const { isPlaying } = useSelector((state) => state.music);

  return (
    <CdDiskBlock gradColor={gradColor} isPlaying={isPlaying}>
      <div className='cd-box'>
        <img src={cdImg} alt='cd' />
      </div>
      <div className='cd-bg'></div>
      <Tonearm>
        <img src={lineImg} alt='tonearm' />
      </Tonearm>
      <Neon isPlaying={isPlaying}>
        <span>&nbsp;&nbsp;&nbsp; ON AIR &nbsp;&nbsp;&nbsp;</span>
      </Neon>
    </CdDiskBlock>
  );
};

export default CdDisk;
