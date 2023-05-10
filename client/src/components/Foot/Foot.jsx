import styled from 'styled-components';

const FootBlock = styled.footer`
  height: 141px;
  border-top: 1px solid var(--light-gray-200);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const RealFootBlock = styled.div`
  width: 457px;
  height: 39px;
  transform: translateY(-21px);

  display: flex;
  align-items: center;
  flex-direction: column;

  ul {
    width: 457px;
    color: var(--gray-800);
    font-size: 12px;

    display: flex;
    justify-content: space-between;

    li {
      display: flex;
      font-weight: 600;
      cursor: pointer;
    }

    .bar-wrapper {
      transform: translateY(-0.8px);
      font-weight: 300;
      cursor: default;
    }

    .bar {
      color: var(--light-gray-200);
      margin-left: 11px;
    }

    .bold {
      text-shadow: 0 0 0 var(--gray-800);
    }
  }

  .company {
    color: var(--light-gray-400);
    font-weight: 600;
    font-size: 12px;
    transform: translateY(13px);
  }
`;

const Foot = () => {
  return (
    <FootBlock>
      <RealFootBlock>
        <ul>
          <li>
            이용약관
            <div className='bar-wrapper' aria-hidden='true'>
              <span className='bar'>|</span>
            </div>
          </li>
          <li>
            서비스운영정책
            <div className='bar-wrapper' aria-hidden='true'>
              <span className='bar'>|</span>
            </div>
          </li>
          <li>
            <span className='bold'>개인정보처리방침</span>
            <div className='bar-wrapper' aria-hidden='true'>
              <span className='bar'>|</span>
            </div>
          </li>
          <li>
            공지사항
            <div className='bar-wrapper' aria-hidden='true'>
              <span className='bar'>|</span>
            </div>
          </li>
          <li>
            고객의소리
            <div className='bar-wrapper' aria-hidden='true'>
              <span className='bar'>|</span>
            </div>
          </li>
          <li>인재채용</li>
        </ul>

        <div className='company'>ⓒ LUMIAN COMPANY Inc.</div>
      </RealFootBlock>
    </FootBlock>
  );
};

export default Foot;
