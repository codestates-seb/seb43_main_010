import styled from 'styled-components';
import deleteBtn from '../../../assets/png-file/x-btn.png';
import { useState, useRef } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { editpostClose } from '../../../reducer/editpostSlice';

import HideArtist from '../../WritePost/WritePostMaterial/HideArtist';
import WriteImgPreview from '../../WritePost/WritePostMaterial/WriteImgPreview';

const WritePostBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: ${({ bgc05 }) => (bgc05 ? `rgba(0, 0, 0, 0.45)` : `rgba(0, 0, 0, 0.7)`)};
`;

const PostContentBox = styled.div`
  display: flex;
  transform: translateX(0);
  position: relative;

  .delete-btn {
    width: 45px;
    position: absolute;
    top: 9%;
    right: -45px;
  }
`;

const PostContent = styled.div`
  width: 767px;
  min-height: 540px;
  resize: none;

  background-color: var(--white-100);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgb(19, 28, 35, 0.1);

  .top-txt-box {
    height: 91px;
    width: 767px;
    border-radius: 20px 20px 0 0;
    background-color: var(--white-100);
    transform: translateX(-20px) translateY(-20px);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .post-txt {
      color: var(--dark-blue-900);
      font-size: 19px;
      font-weight: 900;
    }
    .artist-txt {
      color: var(--light-gray-400);
      font-size: 13.5px;
      text-shadow: 0 0 0 var(--light-gray-400);
      transform: translateY(9px);
    }
  }

  .post-form {
    width: 767px;
    transform: translateX(-20px) translateY(-20px);
    position: relative;

    textarea {
      width: 713px;
      min-height: 334px;
      flex: 1;
      margin: 28px 28px 0 28px;
      color: var(--dark-blue-900);
      text-shadow: 0 0 0 var(--dark-blue-900);
      font-size: 15px;
      border: 1px solid var(--light-gray-200);
      padding: 13.5px;
      border-radius: 0.3rem;
      resize: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;

      &:focus {
        outline: none;
      }
      &::placeholder {
        color: var(--light-gray-350);
        text-shadow: 0 0 0 var(--light-gray-350);
      }
    }
  }
`;

const BottomBox = styled.div`
  width: 767px;
  height: 75px;
  border-radius: 0 0 20px 20px;
  background-color: var(--white-100);
  transform: translateX(-20px) translateY(-20px);
  position: absolute;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .submit-btn {
    width: 55px;
    height: 38px;
    transform: translateX(-28px);
    border-radius: 8px;
    background-color: var(--light-gray-200);
    background: ${({ validity }) => (validity ? 'linear-gradient( -45deg, #1CBEC8, #FFCE4F )' : ' var(--light-gray-200)')};
    transition: 0.3s ease-in;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: ${({ validity }) => (validity ? 'var(--white-100)' : 'var(--light-gray-500)')};
      font-size: 14.5px;
      font-weight: 800;
      transition: 0.3s ease-in;
    }
  }

  .hide-block {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// 이미지 버튼
const ImgIcon = styled(BsFillCameraFill)`
  width: 32px;
  height: 32px;

  font-weight: 100;
  transform: translateX(32px);
  cursor: pointer;
  color: var(--light-gray-360);
  :hover {
    color: var(--light-gray-400);
    transform: scale(1.01) translateX(32px);
  }
`;
//이미지 인풋태그
const ImgInput = styled.input`
  display: none;
`;

// Feed와 Artist에서 쓰는 포스트 작성 창입니다.
const EditPostMusic = ({ postData, setPostData, bgc05 }) => {
  const [content, setContent] = useState('');
  const [validity, setValidity] = useState(false);
  const [hide, setHide] = useState(false);

  const { isOpen, commentContent } = useSelector((state) => state.editpost);
  const dispatch = useDispatch();

  //이미지파일 저장 + 미리보기를 위한것
  const [imgList, setImgList] = useState([]);
  // 이미지 파일 최대 올릴수 있는 개수 4개로 제한하는 변수관리
  const limitRef = useRef(4);
  // 사진버튼 클릭시 이미지 인풋에 접근하기 위한 inputRef
  const imgInput = useRef();
  // 이미지를 {id: x, img: string} 객체로 관리하기 위한 이미지 하나의 고유 id 관리를 위한 변수
  const imgIdRef = useRef(1);

  const autoResizeTextarea = () => {
    let textarea = document.querySelector('.autoTextarea');

    if (textarea) {
      textarea.style.height = 'auto';
      let height = textarea.scrollHeight;
      let maxHeight = window.innerHeight * 0.45; // 0.74
      textarea.style.height = `${Math.min(height + 8, maxHeight)}px`;
    }

    if (content.trim().length > 1) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const deleteBtnFn = () => {
    dispatch(editpostClose());
    setContent('');
    setImgList([]);
    limitRef.current = 4;
    // imgIdRef.current = 1;
  };

  // submit
  const submitFn = (e) => {
    e.preventDefault();
    if (content.trim().length > 1) {
      // 이 부분 조건을 바꿔야할까? 컨텐츠나 이미지 둘 다 null 일 경우 submit 안되게??
      // 여기서 서버한테 content 데이터 전송해야 함.
      // 서버에 데이터 전송 되면 내용 비우고 창 닫기
      // 조건을 더 추가해서 현재 로그인한 유저가 연예인인지 아닌지에 따라 데이터 전송하는 부분을 나누면 될 것 같아요.
      setPostData([{ content, img: imgList }, ...postData]);
      setContent('');
      setImgList([]);
      limitRef.current = 4;
      imgIdRef.current = 1;
      dispatch(editpostClose());
    }
    console.log(imgList);
  };

  //이미지 아이콘 누르면 imgInput에 접근
  const onClickImgIcon = (e) => {
    e.preventDefault();
    imgInput.current.click();
  };

  //이미지 미리보기위한 함수, input의 onChange이벤트임
  const handleUploadImg = (e) => {
    e.preventDefault();
    const fileArr = e.target.files;
    let fileURLs = [];
    let file;
    let tempObj = {};
    let tempArr = [];
    limitRef.current -= fileArr.length;

    //한번에 올릴 최대 파일의 개수를 제한하기 위해 사용
    if (fileArr.length > 4) {
      alert(`사진은 한번에 최대 4장까지 업로드 가능합니다.`);
      return;
    }
    //현재 limit이 4장보다 작은경우에만 imgList에 추가할 수 있다.
    if (limitRef.current < 0) {
      alert(`현재 사진은 ${limitRef.current + fileArr.length}장까지 더 업로드 가능합니다.`);
      limitRef.current += fileArr.length;
      return;
    } else {
      for (let i = 0; i < fileArr.length; i++) {
        file = fileArr[i];
        let reader = new FileReader();
        // 비동기로 동작함
        reader.onload = () => {
          fileURLs[i] = reader.result;
          tempObj = { id: imgIdRef.current, url: fileURLs[i] };
          tempArr.push(tempObj);
          imgIdRef.current++;
          setImgList([...imgList, ...tempArr]);

          e.target.value = '';
        };
        reader.readAsDataURL(file);
      }
    }
    e.target.value = '';
  };

  //이미지 삭제 버튼 함수
  const handleDeleteImg = (fileId) => {
    const newImgList = imgList.filter((file) => file.id !== fileId);
    limitRef.current++;
    setImgList(newImgList);
  };
  return (
    <>
      {isOpen ? (
        <WritePostBlock bgc05={bgc05}>
          <PostContentBox>
            <PostContent>
              <div className='top-txt-box'>
                <span className='post-txt'>포스트 수정</span>
                <span className='artist-txt'>BTS</span> {/* 나중에 수정해야 할 부분임 */}
              </div>
              {/* 이미지 업로드시 미리보기를 위한 곳 */}
              {imgList.length === 0 ? null : <WriteImgPreview imgList={imgList} handleDeleteImg={handleDeleteImg} />}
              <form className='post-form'>
                <textarea
                  id='post-content'
                  className='autoTextarea'
                  onKeyDown={autoResizeTextarea}
                  onKeyUp={autoResizeTextarea}
                  onChange={changeContent}
                  type='text'
                  placeholder='내용을 입력해 주세요.'
                  name='content'
                  autoComplete='off'
                  defaultValue={commentContent}
                  required
                />
                <ImgInput
                  className='img-post'
                  type='file'
                  multiple='multiple'
                  name='img-post'
                  placeholder='이미지업로드'
                  accept='image/*'
                  ref={imgInput}
                  onChange={handleUploadImg}
                ></ImgInput>
              </form>

              <BottomBox validity={validity} hide={hide}>
                {/* 현아님! 이미지 추가버튼입니다 */}
                <ImgIcon onClick={onClickImgIcon} />
                <div className='hide-block'>
                  {/* HideArtist 컴포넌트, 아티스트인지 아닌지 여부에 따라 notArtist에 값을 넣어주는 거로 수정해야 함 */}
                  <HideArtist notArtist='true' setHide={setHide} hide={hide} />

                  <button onClick={submitFn} className='submit-btn'>
                    <span>등록</span>
                  </button>
                </div>
              </BottomBox>
            </PostContent>
            <button onClick={deleteBtnFn} className='delete-btn'>
              <img src={deleteBtn} alt='delete-button' />
            </button>
          </PostContentBox>
        </WritePostBlock>
      ) : null}
    </>
  );
};

export default EditPostMusic;
