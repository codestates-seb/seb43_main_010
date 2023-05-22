import loveMp3 from '../../assets/mp3-file/1-love.mp3';
import septemberMp3 from '../../assets/mp3-file/2-september.mp3';
import whiterMp3 from '../../assets/mp3-file/3-whiter.mp3';
import partyMp3 from '../../assets/mp3-file/4-party.mp3';
import goodMp3 from '../../assets/mp3-file/5-good.mp3';
import coolMp3 from '../../assets/mp3-file/6_cool.mp3';
import daddyMp3 from '../../assets/mp3-file/7_daddy.mp3';

import loveImg from '../../assets/jpg-file/music-jpg/1-love-over.jpg';
import septemberImg from '../../assets/jpg-file/music-jpg/2-september.jpg';
import whiterImg from '../../assets/jpg-file/music-jpg/3_whiter-shade.jpg';
import partyImg from '../../assets/jpg-file/music-jpg/4_party-anthem.jpg';
import goodImg from '../../assets/jpg-file/music-jpg/5-good-to-you.jpg';
import coolImg from '../../assets/jpg-file/music-jpg/6-struttin.jpg';
import daddyImg from '../../assets/jpg-file/music-jpg/7-daddy.jpg';

const musicData = {
  playList: [
    {
      musicId: 1,
      musicTitle: 'Love Over And Over Again',
      singer: 'Switch',
      musicImg: loveImg,
      musicMp3: loveMp3,
      likeNum: 100,
    },
    {
      musicId: 2,
      musicTitle: 'September',
      singer: 'Earth, Wind & Fire',
      musicImg: septemberImg,
      musicMp3: septemberMp3,
      likeNum: 7,
    },
    {
      musicId: 3,
      musicTitle: 'A Whiter Shade Of Pale',
      singer: 'Procol Harum',
      musicImg: whiterImg,
      musicMp3: whiterMp3,
      likeNum: 1,
    },
    {
      musicId: 4,
      musicTitle: 'No.1 Party Anthem',
      singer: 'Arctic monkeys',
      musicImg: partyImg,
      musicMp3: partyMp3,
      likeNum: 0,
    },
    {
      musicId: 5,
      musicTitle: 'Good to you',
      singer: 'Jonny P',
      musicImg: goodImg,
      musicMp3: goodMp3,
      likeNum: 0,
    },
    {
      musicId: 6,
      musicTitle: 'Cool struttin’',
      singer: 'Sonny Clark',
      musicImg: coolImg,
      musicMp3: coolMp3,
      likeNum: 2,
    },
    {
      musicId: 7,
      musicTitle: 'Daddy',
      singer: 'Coldplay',
      musicImg: daddyImg,
      musicMp3: daddyMp3,
      likeNum: 0,
    },
  ],
};

export default musicData;
