import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../theme/store/theme-slice'
import drawerReducer from '../components/SideDrawer/store/drawer-slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    drawer: drawerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
