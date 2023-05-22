import styled from 'styled-components';
import { Range } from 'react-range';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaying } from '../../../reducer/musicSlice';

const VolumeBlock = styled.div`
  @keyframes leftIn {
    from {
      opacity: 0;
      transform: translateX(-15px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  animation: leftIn 0.3s;
`;

const StyledRange = styled(Range)`
  width: 400px;
  height: 8px;
  display: flex;
`;

const Track = styled.div`
  height: 8px;
  width: 400px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    #5d7a80,
    #2f7381 ${({ values }) => (values[0] / 100) * 100}%,
    #131c23 ${({ values }) => (values[0] / 100) * 100}%
  );
  align-self: center;
  box-shadow: 2px 2px 5px rgba(122, 153, 164, 0.2);
`;

const Thumb = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: ${({ isDragged }) =>
    isDragged ? 'radial-gradient(ellipse at top, #9abfcd, #4f98a6);' : 'radial-gradient(ellipse at top, #7a99a4, #2f7381);'};
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(19, 28, 35, 0.2);
  transform: translateX(-50%);
  left: ${({ value, min, max }) => `${((value - min) / (max - min)) * 100}%`};
  top: 0px;
  position: absolute;

  &:focus {
    outline: none;
  }
`;

const VolumeRange = () => {
  const { isPlaying, currentVolume } = useSelector((state) => state.music);

  const dispatch = useDispatch();

  const handleVolumeChange = (newVolume) => {
    dispatch(setPlaying({ currentVolume: newVolume }));
  };

  return (
    <>
      {isPlaying && (
        <VolumeBlock>
          <StyledRange
            values={[currentVolume]}
            step={1}
            min={0}
            max={100}
            onChange={handleVolumeChange}
            renderTrack={({ props, children }) => (
              <Track {...props} values={[currentVolume]}>
                {children}
              </Track>
            )}
            renderThumb={({ props, isDragged }) => <Thumb {...props} isDragged={isDragged} volume={[currentVolume]} />}
          />
        </VolumeBlock>
      )}
    </>
  );
};

export default VolumeRange;
