import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LabelBlock = styled.div`
  width: 29px;
  transform: translateY(17px);

  svg .stop-color-1 {
    stop-color: ${({ gradColor }) => (gradColor ? `${gradColor[0]}` : `#2F7381`)};
    stop-opacity: 0.5;
  }
  svg .stop-color-2 {
    stop-color: ${({ gradColor }) => (gradColor ? `${gradColor[1]}` : `#7A99A4`)};
    stop-opacity: 0.5;
  }
`;

const Label = () => {
  const { groupId } = useParams();
  const state = useSelector((state) => state.color);
  const group = state.allGroup.find((el) => el.groupId === Number(groupId));
  const gradColor = group ? group.gradColor : [];

  return (
    <LabelBlock gradColor={gradColor}>
      <svg className='bookmark' width='29' height='30' viewBox='0 0 29 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_30_1080)'>
          <path d='M-10 0L-10 30L29 30L22.5 15L29 -1.70474e-06L-10 0Z' fill='url(#paint0_linear_30_1080)' />
        </g>
        <defs>
          <linearGradient id='paint0_linear_30_1080' x1='29' y1='15' x2='-10' y2='15' gradientUnits='userSpaceOnUse'>
            <stop className='stop-color-1' stopColor='#7A99A4' />
            <stop className='stop-color-2' offset='1' stopColor='#2F7381' />
          </linearGradient>
          <clipPath id='clip0_30_1080'>
            <rect width='29' height='30' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </LabelBlock>
  );
};

export default Label;
