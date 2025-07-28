import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AntisgamState {
  followersData: string[];        // nicknames di chi ti segue
  followingData: string[];        // nicknames di chi tu segui
  unfollowersData: string[];      // nicknames che tu segui ma che non ti seguono
  pendingRequests: string[];      // nicknames di chi hai chiesto di seguire ma deve ancora accettare
  removedSuggestions: string[];   // nicknames di chi era suggerito ma hai tolto
}

const initialState: AntisgamState = {
  followersData: [],
  followingData: [],
  unfollowersData: [],
  pendingRequests: [],
  removedSuggestions: [],
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
    setPendingRequests: (state, action: PayloadAction<string[]>) => {
      state.pendingRequests = action.payload;
    },
    setRemovedSuggestions: (state, action: PayloadAction<string[]>) => {
      state.removedSuggestions = action.payload;
    },
    resetAntisgam: (state) => {
      state.followersData = [];
      state.followingData = [];
      state.unfollowersData = [];
      state.pendingRequests = [];
      state.removedSuggestions = [];
    },
  },
});

export const {
  setFollowers,
  setFollowing,
  setUnfollowers,
  setPendingRequests,
  setRemovedSuggestions,
  resetAntisgam,
} = antisgamSlice.actions;

export default antisgamSlice.reducer;
