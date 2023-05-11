import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';

const NavBlock = styled.nav`
  width: 100%;
  height: 50px;
  /* background 색상은 나중에 props로 바꾸어주어야 할 부분임 */
  background: linear-gradient(to right, #70a7e7, #265696);

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-top: 80px;
  z-index: 1;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  margin-right: 78px;

  &:last-of-type {
    margin-right: 0;
  }

  span {
    color: var(--white-100);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    opacity: 0.6;
  }

  &.active span {
    opacity: 1;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Nav = () => {
  const { groupId } = useParams();

  return (
    <NavBlock>
      <StyledLink to={`/feed/${groupId}`}>
        <button>
          <span>Feed</span>
        </button>
      </StyledLink>

      <StyledLink to={`/artist/${groupId}`}>
        <button>
          <span>Artist</span>
        </button>
      </StyledLink>

      <StyledLink to={`/music/${groupId}`}>
        <button>
          <span>Music</span>
        </button>
      </StyledLink>

      <StyledLink to={`/chat/${groupId}`}>
        <button>
          <span>Chat</span>
        </button>
      </StyledLink>
    </NavBlock>
  );
};

export default Nav;
