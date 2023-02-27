import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';

const initialState = {
 userData:{},
 isUserDataLoading:false
}


export const userSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.currentStepIndex = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;

// thunks
