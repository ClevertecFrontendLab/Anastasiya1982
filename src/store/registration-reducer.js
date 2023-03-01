import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    steps:[1,2,3],
    currentStepIndex:0
};

export const registrationSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'registration',
  initialState,
  reducers: {
    setCurrentStepIndex: (state, action) => {
      state.currentStepIndex = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { setCurrentStepIndex } = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;




