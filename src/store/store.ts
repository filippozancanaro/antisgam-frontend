import { configureStore } from '@reduxjs/toolkit';
import antisgamReducer from '../shared/antisgam-core-state/antisgam-slice';

export const store = configureStore({
  reducer: {
    antisgam: antisgamReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
