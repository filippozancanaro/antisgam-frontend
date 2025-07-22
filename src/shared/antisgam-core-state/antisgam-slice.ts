import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AntisgamState {
  followersData: string[];   // Array di nickname (deduplicati già nel form)
  followingData: string[];
}

const initialState: AntisgamState = {
  followersData: [],
  followingData: [],
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
    resetAntisgam: (state) => {
      state.followersData = [];
      state.followingData = [];
    },
  },
});

export const { setFollowers, setFollowing, resetAntisgam } = antisgamSlice.actions;
export default antisgamSlice.reducer;
