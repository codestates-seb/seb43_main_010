const emailValidation = (str) => {
  const regexEmail = /^[\w]+@([\w]+\.)+[a-z]{2,4}$/;
  if (!regexEmail.test(str)) {
    return [false, '유효한 이메일을 입력해주세요.'];
  }
  return [true, '유효한 이메일 입니다.'];
  // return regexEmail.test(str);
};
const pwdValidation = (str) => {
  const regexPwd = /(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
  if (!regexPwd.test(str)) {
    return [false, '잘못된 형식의 비밀번호 입니다.'];
  }
  return [true, '유효한 비밀번호 입니다.'];
};
//비밀번호 비밀번호 확인 이  다르면 처리
const checkPwdValidation = (password, passwordCheck) => {
  if (password !== passwordCheck) {
    return [false, '비밀번호가 일치하지 않습니다.'];
  }
  return [true, '비밀번호가 일치합니다.'];
};
const commonValidation = (str) => {
  const regexCommon = /^[a-zA-Zㄱ-힣0-9\s]{1,20}$/;
  if (!regexCommon.test(str)) {
    return false;
  }
  return true;
};

export { emailValidation, pwdValidation, checkPwdValidation, commonValidation };
