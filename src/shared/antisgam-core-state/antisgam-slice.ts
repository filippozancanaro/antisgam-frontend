import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AntisgamState {
  followersData: string[];     // nicknames di chi ti segue
  followingData: string[];     // nicknames di chi tu segui
  unfollowersData: string[];   // nicknames che tu segui ma che non ti seguono
}

const initialState: AntisgamState = {
  followersData: [],
  followingData: [],
  unfollowersData: [],
};

const antisgamSlice = createSlice({
  name: 'antisgam',
  initialState,
  reducers: {
    setFollowers: (state, action: PayloadAction<string[]>) => {
      state.followersData = action.payload;
    },
    setFollowing: (state, action: PayloadAction<string[]>) => {
      state.followingData = action.payload;
    },
    setUnfollowers: (state, action: PayloadAction<string[]>) => {
      state.unfollowersData = action.payload;
    },
    resetAntisgam: (state) => {
      state.followersData = [];
      state.followingData = [];
      state.unfollowersData = [];
    },
  },
});

export const {
  setFollowers,
  setFollowing,
  setUnfollowers,
  resetAntisgam,
} = antisgamSlice.actions;

export default antisgamSlice.reducer;
