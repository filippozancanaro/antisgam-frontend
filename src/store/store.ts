import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '../components/SideDrawer/store/drawer-slice';
import antisgamReducer from '../shared/antisgam-core-state/antisgam-slice';
import uploaderJsonReducer from '../shared/uploader-json/uploader-json-slice';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    antisgam: antisgamReducer,
    uploaderJson: uploaderJsonReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
