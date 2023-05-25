import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBlock = styled.nav`
  width: 100%;
  height: 50px;
  /* background 색상은 나중에 props로 바꾸어주어야 할 부분임 */
  background: ${({ gradColor }) =>
    gradColor ? `linear-gradient(to right, ${gradColor[0]}, ${gradColor[1]})` : `linear-gradient(to right, #5faae1, #0c6bb0)`};

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-top: 80px;
  z-index: 2;
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
    font-weight: 700;
    font-size: 17px;
    opacity: 0.6;
    transition: 0.07s ease-in-out;

    &:hover {
      opacity: 0.8;
      transition: 0.07s ease-in-out;
    }
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
  const state = useSelector((state) => state.color);
  const group = state.allGroup.find((el) => el.groupId === Number(groupId));
  const gradColor = group ? group.gradColor : [];

  return (
    <NavBlock gradColor={gradColor}>
      <StyledLink to={`/music/${groupId}`}>
        <button>
          <span>Music</span>
        </button>
      </StyledLink>

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
    </NavBlock>
  );
};

export default Nav;
