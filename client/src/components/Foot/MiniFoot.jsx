import styled from 'styled-components';

const MiniFootBlock = styled.footer`
  width: 331px;
  height: 34px;
  color: var(--light-gray-400);
  text-shadow: 0 0 0 var(--light-gray-400);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ul {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }

  li {
    cursor: pointer;

    .bold {
      font-weight: 500;
    }
  }

  .company {
    font-size: 12px;
  }
`;

const MiniFoot = () => {
  return (
    <MiniFootBlock>
      <ul>
        <li>이용약관</li>
        <li>서비스운영정책</li>
        <li className='bold'>개인정보처리방침</li>
        <li>공지사항</li>
        <li>고객의소리</li>
      </ul>

      <div className='company'>ⓒ LUMIAN COMPANY Inc.</div>
    </MiniFootBlock>
  );
};

export default MiniFoot;
