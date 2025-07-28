import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UploaderJsonState {
  enableJsonFiles: boolean; // abilita il json
  // (nascondo il json dato che un utente medio non sa cosa sia, lo tengo nelle settings solo per debug)
}

const initialState: UploaderJsonState = {
  enableJsonFiles: false,
};

const uploaderJsonSlice = createSlice({
  name: 'uploaderJson',
  initialState,
  reducers: {
    setEnableJsonFiles: (state, action: PayloadAction<boolean>) => {
      state.enableJsonFiles = action.payload;
    },
    resetEnableJsonFile: (state) => {
      state.enableJsonFiles = false;
    },
  },
});

export const {
  setEnableJsonFiles,
  resetEnableJsonFile,
} = uploaderJsonSlice.actions;

export default uploaderJsonSlice.reducer;
