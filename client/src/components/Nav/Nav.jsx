import { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const NavBlock = styled.nav`
  width: 100%;
  height: 50px;
  /* background 색상은 나중에 props로 바꾸어주어야 할 부분임 */
  background: linear-gradient(to right, #60abe1, #0b6bb0);

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-top: 80px;
  z-index: 1;
`;

const Button = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
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
    opacity: ${({ selected }) => (selected ? '1' : '0.6')};
  }
`;

const Nav = ({ navMenu }) => {
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Nav = () => {
  const [selected, setSelected] = useState('feed');

  const { groupId } = useParams();

  const clickFeed = () => {
    setSelected('feed');
  };
  const clickArtist = () => {
    setSelected('artist');
  };
  const clickMusic = () => {
    setSelected('music');
  };
  const clickChat = () => {
    setSelected('chat');
  };

  return (
    <NavBlock>
      <Button selected={selected === 'feed'} onClick={clickFeed}>
        <StyledLink to={`/feed/${groupId}`}>
          <span>Feed</span>
        </StyledLink>
      </Button>

      <Button selected={selected === 'artist'} onClick={clickArtist}>
        <StyledLink to={`/artist/${groupId}`}>
          <span>Artist</span>
        </StyledLink>
      </Button>

      <Button selected={selected === 'music'} onClick={clickMusic}>
        <StyledLink to={`/music/${groupId}`}>
          <span>Music</span>
        </StyledLink>
      </Button>

      <Button selected={selected === 'chat'} onClick={clickChat}>
        <StyledLink to={`/chat/${groupId}`}>
          <span>Chat</span>
        </StyledLink>
      </Button>
    </NavBlock>
  );
};

export default Nav;
