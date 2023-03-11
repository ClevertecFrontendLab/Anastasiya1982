import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steps: [1, 2, 3, 4],
  currentStepIndex: 0,
  registrationData: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  },
};

export const registrationSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'registration',
  initialState,
  reducers: {
    setCurrentStepIndex: (state, action) => {
      state.currentStepIndex = action.payload;
    },
    addRegistrationData: (state, action) => {
      state.registrationData = { ...state.registrationData, ...action.payload };
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { setCurrentStepIndex, addRegistrationData } = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;
