import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../components/Login/LoginMaterial/setCookie';
import { useEffect } from 'react';
import { setCurrentUser } from '../reducer/userSlice';
import axios from 'axios';

const currentUserCheckFn = () => {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.user.currentUser);
  const token = getCookie();
  // 현재 로그인한 사용자 가져오기
  useEffect(() => {
    if (token) {
      axios.get('/user').then((res) => {
        console.log(res.data);
        dispatch(
          setCurrentUser({
            // 요저정보 res.data에 맞게 들고와서 세팅하기
            // nickname:
          }),
        );
      });
    }
  }, []);
};

export default currentUserCheckFn;
