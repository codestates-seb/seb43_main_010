export default function login(id, password) {
  if (id === 'asd@asd.com' && password === 'asd15987@') {
    console.log('일치');
    return {
      accessToken: 'jx84e3kjew1njej3al2q9w',
      refreshToken: 'g2rjfd7452bjfgn;a&*(jkehj',
    };
  } else {
    console.log('아디비번불일치');
    return undefined;
  }
}
