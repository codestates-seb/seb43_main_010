import styled from 'styled-components';
import { useRef } from 'react';

const Button = styled.button`
  color: ${({ selected }) => (selected ? `var(--dark-blue-900)` : `color: var(--gray-blue-400)`)};
  border-bottom: ${({ selected }) => (selected ? `2px solid var(--skyblue-500);` : `none`)};
`;

const NoticeArtLi = ({ isScroll, setLeftBtnHide, setRightBtnHide, selected, setSelected, groupName }) => {
  const liRef = useRef(null);

  const scrollToCenter = () => {
    const liElement = liRef.current;
    if (liElement && isScroll) {
      const container = liElement.parentElement;
      const containerWidth = container.offsetWidth;
      const liOffsetLeft = liElement.offsetLeft;
      const liWidth = liElement.offsetWidth;
      const scrollLeft = liOffsetLeft - (containerWidth - liWidth) / 2;
      container.scrollLeft = scrollLeft;

      const listLength = container.children.length;
      const lastIndex = listLength - 1;

      if (liOffsetLeft < containerWidth / 3) {
        setLeftBtnHide(true);
        setRightBtnHide(false);
      } else if (liOffsetLeft + liWidth > (2 / 3) * containerWidth) {
        setLeftBtnHide(false);

        if (liElement === container.children[lastIndex - 1] || liElement === container.children[lastIndex]) {
          setRightBtnHide(true);
        } else {
          setRightBtnHide(false);
        }
      } else {
        setLeftBtnHide(false);
        setRightBtnHide(false);
      }
    }
  };

  const selectArtTxt = () => {
    setSelected(`${groupName}`);
    scrollToCenter();
  };

  return (
    <li ref={liRef}>
      <Button selected={selected === `${groupName}`} onClick={selectArtTxt} className='art-name'>
        {groupName}
      </Button>
    </li>
  );
};

export default NoticeArtLi;
