import { createSlice } from '@reduxjs/toolkit';
import imgs from '../img';

// api 받으면 이렇게 냅둘거임
// const initialState = { allGroup: []};

// 일단 임시로 만듬.
const initialState = {
  allGroup: [
    {
      groupId: 1,
      groupName: 'BTS',
      groupImg: imgs.bts,
      grouplogoImg: imgs.btsPng,
      gradColor: ['#5faae1', '#0c6bb0', '#c9edff', '#62a6e0'],
    },
    {
      groupId: 2,
      groupName: 'TXT',
      groupImg: imgs.txt,
      grouplogoImg: imgs.txtPng,
      gradColor: ['#59bae3', '#1c709f', '#d0ecff', '#46afdc'],
    },
    {
      groupId: 3,
      groupName: 'NewJeans',
      groupImg: imgs.newJeans,
      grouplogoImg: imgs.newJeansPng,
      gradColor: ['#387ed1', '#513fc3', '#cadcff', '#4b65d7'],
    },
    {
      groupId: 4,
      groupName: 'SUZY',
      groupImg: imgs.suzy,
      grouplogoImg: imgs.suzyPng,
      gradColor: ['#a0cfdd', '#1eadb5', '#def7ff', '#a0cfdd'],
    },
    {
      groupId: 5,
      groupName: 'LE SSERAFIM',
      groupImg: imgs.lesserafim,
      grouplogoImg: imgs.lesserafimPng,
      gradColor: ['#5c819d', '#233050', '#c2cfe5', '#31172d'],
    },
    {
      groupId: 6,
      groupName: 'IVE',
      groupImg: imgs.ive,
      grouplogoImg: imgs.ivePng,
      gradColor: ['#f2a751', '#c03c74', '#ffdddf', '#eb6f77'],
    },
    {
      groupId: 7,
      artistId: 7,
      groupName: 'STRAY KIDS',
      groupImg: imgs.skids,
      grouplogoImg: imgs.skidsPng,
      gradColor: ['#ddda65', '#67c6bc', '#f9ffe4', '#e0d35d'],
    },
    {
      groupId: 8,
      groupName: 'NMIXX',
      groupImg: imgs.nmixx,
      grouplogoImg: imgs.nmixxPng,
      gradColor: ['#2398ad', '#5f9148', '#e0fff5', '#89994c'],
    },
    {
      groupId: 9,
      groupName: '(G)I-DLE',
      groupImg: imgs.gIdle,
      grouplogoImg: imgs.gIdlePng,
      gradColor: ['#ae0bb4', '#6101db', '#fde1ff', '#d059d8'],
    },
    {
      groupId: 10,
      groupName: 'BLACKPINK',
      groupImg: imgs.blackPink,
      grouplogoImg: imgs.blackPinkPng,
      gradColor: ['#748ac3', '#324985', '#d5e0f2', '#6f89bf'],
    },
    {
      groupId: 11,
      groupName: 'BIBI',
      groupImg: imgs.bibi,
      grouplogoImg: imgs.bibiPng,
      gradColor: ['#90908f', '#646563', '#e2e7eb', '#959b9c'],
    },
    {
      groupId: 12,
      groupName: 'BOL4',
      groupImg: imgs.bol4,
      grouplogoImg: imgs.bol4Png,
      gradColor: ['#8e7765', '#47362e', '#ffeee1', '#ad885f'],
    },
    {
      groupId: 13,
      groupName: 'SEVENTEEN',
      groupImg: imgs.seventeen,
      grouplogoImg: imgs.seventeenPng,
      gradColor: ['#086c72', '#2c7c13', '#c7edd9', '#4d9585'],
    },
    {
      groupId: 14,
      groupName: 'AKMU',
      groupImg: imgs.akmu,
      grouplogoImg: imgs.akmuPng,
      gradColor: ['#b7825e', '#633b24', '#e5cfc1', '#c6997c'],
    },
    {
      groupId: 15,
      groupName: 'PENTAGON',
      groupImg: imgs.pentagon,
      grouplogoImg: imgs.pentagonPng,
      gradColor: ['#2b5c92', '#1b3856', '#d2deec', '#376694'],
    },
    {
      groupId: 16,
      groupName: 'IU',
      groupImg: imgs.iu,
      grouplogoImg: imgs.iuPng,
      gradColor: ['#ee514f', '#8b0503', '#ffc3c3', '#e38080'],
    },
    {
      groupId: 17,
      groupName: 'Apink',
      groupImg: imgs.apink,
      grouplogoImg: imgs.apinkPng,
      gradColor: ['#ad5c83', '#aa7267', '#efc9db', '#c78f96'],
    },
    {
      groupId: 18,
      groupName: 'SUNMMI',
      groupImg: imgs.summi,
      grouplogoImg: imgs.summiPng,
      gradColor: ['#ed835c', '#cd4825', '#ffdccc', '#ed835c'],
    },
    {
      groupId: 19,
      groupName: 'ZICO',
      groupImg: imgs.zico,
      grouplogoImg: imgs.zicoPng,
      gradColor: ['#44b2be', '#287d89', '#c9eef2', '#44b2be'],
    },
    {
      groupId: 20,
      groupName: 'BamBam',
      groupImg: imgs.bambam,
      grouplogoImg: imgs.bambamPng,
      gradColor: ['#576d6c', '#17302d', '#dcf0ef', '#576d6c'],
    },
    {
      groupId: 21,
      groupName: 'LEE YOUNG JI',
      groupImg: imgs.youngJi,
      grouplogoImg: imgs.youngJiPng,
      gradColor: ['#9ca29e', '#1e3034', '#dce4df', '#9ca29e'],
    },
    {
      groupId: 22,
      groupName: 'MAMAMOO',
      groupImg: imgs.mmmoo,
      grouplogoImg: imgs.mmmooPng,
      gradColor: ['#677807', '#e75400', '#f3dcc1', '#bb700f'],
    },
    {
      groupId: 23,
      groupName: 'STAYC',
      groupImg: imgs.stayc,
      grouplogoImg: imgs.staycPng,
      gradColor: ['#9d1d46', '#b251a3', '#f8cbd7', '#bc6291'],
    },
    {
      groupId: 24,
      groupName: 'HWANG MIN HYUN',
      groupImg: imgs.minhyun,
      grouplogoImg: imgs.minhyunPng,
      gradColor: ['#a09081', '#493a37', '#d8cfc6', '#a09081'],
    },
    {
      groupId: 25,
      groupName: 'PARK BO GUM',
      groupImg: imgs.bogum,
      grouplogoImg: imgs.bogumPng,
      gradColor: ['#616878', '#2d303a', '#cfd7e5', '#616878'],
    },
  ],
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColorData: (state, action) => {
      return { ...state, allGroup: [...action.payload] };
    },
  },
});

export const { setColorData } = colorSlice.actions;
export default colorSlice.reducer;
