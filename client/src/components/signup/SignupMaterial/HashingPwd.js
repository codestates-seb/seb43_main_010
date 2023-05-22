import crypto from 'crypto-js';
const hashPwd = (pwd) => {
  // eslint-disable-next-line no-undef
  return crypto.AES.encrypt(pwd, process.env.REACT_APP_SECRET_KEY).toString();
};
export default hashPwd;
