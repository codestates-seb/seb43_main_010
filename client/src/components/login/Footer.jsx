import styled from 'styled-components';

//div3개가 담김
const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-bottom: 40px;
  @media screen and (min-width: 768px) {
    max-width: 860px;
    height: 180px;
    margin: 30px auto 0;
  }
  @media screen and (min-width: 600px) and (max-width: 767px) {
    max-width: 860px;
    height: 200px;
    margin-top: 20px;
  }
  @media screen and (max-width: 599px) {
    max-width: 860px;
    min-width: 350px;
    min-height: 292px;
    margin-top: 20px;
  }
`;

const Content = styled.div`
  min-width: 260px;
  height: 20px;
  display: flex;
  gap: 15px;
  font-size: 13px;
  font-weight: 500;
  line-height: 17px;
  color: var(--gray-600);
  span {
    font-weight: 600;
    color: var(--gray-700);
  }
  @media screen and (max-width: 767px) {
  }
`;
const Inc = styled.div`
  height: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: var(--gray-700);
`;

const Footer = () => {
  return (
    <>
      <FooterBox>
        <Content>
          이용약관 <span>개인정보처리방침 쿠키정책</span> 공지사항
        </Content>
        <Content>
          <span>LUMIAN PROJECT</span> 팀원 <span>곽미소 조원호 최현아 정수진 김현지</span>
        </Content>
        <Inc>LUMIAN PROJECT</Inc>
      </FooterBox>
    </>
  );
};

export default Footer;
