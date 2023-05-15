import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GradationBlock = styled.div`
  padding-top: 80px;
`;

const RealGradation = styled.div`
  width: 100%;
  height: 135px;
  /* background 색상은 나중에 props로 바꾸어주어야 할 부분임 */
  background: ${({ gradColor }) =>
    gradColor ? `linear-gradient(to top, transparent, ${gradColor[2]})` : `linear-gradient(to top, transparent, #c9edff)`};
`;

const Gradation = () => {
  const { groupId } = useParams();
  const state = useSelector((state) => state.color);
  const group = state.allGroup.find((el) => el.groupId === Number(groupId));
  const gradColor = group ? group.gradColor : [];

  return (
    <GradationBlock>
      <RealGradation gradColor={gradColor}></RealGradation>
    </GradationBlock>
  );
};

export default Gradation;
