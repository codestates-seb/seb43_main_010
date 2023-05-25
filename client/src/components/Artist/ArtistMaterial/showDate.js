const showDate = (a) => {
  const milliSeconds = new Date() - new Date(a + 'Z');
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)} 분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)} 시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)} 일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)} 주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}달 전`;
  const years = days / 365;
  return `${Math.floor(years)} 년 전`;
};
const showMonthDay = (a) => {
  let time = new Date(a);
  let month = time.toDateString().split(' ')[1];
  let day = time.getDate();
  return [month, day];
};

export { showDate, showMonthDay };

// let t = '2023-05-25t03:02:17.773668';
// console.log(new Date());
// const now = new Date(); // 현재 시간
// const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값
// const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
// const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
// console.log(utcNow);
// console.log(new Date());
// // console.log(utcNow + koreaTimeDiff);
// // console.log(new Date(utcNow + koreaTimeDiff));
