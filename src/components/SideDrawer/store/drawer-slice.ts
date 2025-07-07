import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Anchor = 'left' | 'right' | 'top' | 'bottom';

interface DrawerState {
  position: Anchor;
  open: boolean;
}

const initialState: DrawerState = {
  position: 'left',
  open: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.open = !state.open;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setDrawerPosition: (state, action: PayloadAction<Anchor>) => {
      state.position = action.payload;
    },
  },
});

export const { setDrawerPosition, toggleDrawer, setDrawerOpen } = drawerSlice.actions;
export default drawerSlice.reducer;
