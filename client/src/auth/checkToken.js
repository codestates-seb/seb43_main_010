import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, removeCookie } from '../components/Login/LoginMeterial/setCookie';
import { setToken, removeToken } from '../reducer/authSlice';
import axios from 'axios';

const CheckToken = (key) => {
  const [isAuth, setAuth] = useState('Loaded');
  const { authenticated, expireTime } = useSelector((state) => state.auth);
  const refreshToken = getCookie();
  const dispatch = useDispatch();

  //엑세스토큰 만료시 리프레시토큰으로 재발행 요청
  const updateToken = async (refreshToken) => {
    const newToken = await axios
      .post('http://localhost:4000/update/token', refreshToken)
      .catch((err) => console.log('리프레시토큰으로 엑세스 토큰 갱신 실패'));
    return newToken;
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      if (refreshToken === undefined) {
        dispatch(removeToken());
        setAuth('Failed');
      } else {
        if (authenticated && new Date().getTime() < expireTime) {
          setAuth('Success');
        } else {
          const response = await updateToken(refreshToken);

          if (response.status) {
            const token = response.json.access_token;
            dispatch(setToken(token));
            setAuth('Success');
          } else {
            dispatch(removeToken());
            removeCookie();
            setAuth('Failed');
          }
        }
      }
    };
    checkAuthToken();
  }, [refreshToken, dispatch]);

  // return {
  //   isAuth,
  // };
};
export default CheckToken;
