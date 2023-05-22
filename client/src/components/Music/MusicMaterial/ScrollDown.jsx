import styled from 'styled-components';
import downImg from '../../../assets/png-file/down-icon.png';

const ScrollBottomBlock = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: no-repeat url(${downImg});
  background-size: 16.27px 10.53px;
  background-position: 50% 55%;
  background-color: var(--gray-blue-400);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.25);

  position: absolute;
  right: 45%;
  bottom: 12.7%;
`;

const ScrollDown = ({ onClick }) => {
  return <ScrollBottomBlock onClick={onClick}></ScrollBottomBlock>;
};

export default ScrollDown;
