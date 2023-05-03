import styled from 'styled-components';

const GradationBlock = styled.div`
  padding-top: 80px;
`;

const RealGradation = styled.div`
  width: 100%;
  height: 135px;
  /* background 색상은 나중에 props로 바꾸어주어야 할 부분임 */
  background: linear-gradient(to top, transparent, #c7e7ff);
`;

const Gradation = () => {
  return (
    <GradationBlock>
      <RealGradation></RealGradation>
    </GradationBlock>
  );
};

export default Gradation;
