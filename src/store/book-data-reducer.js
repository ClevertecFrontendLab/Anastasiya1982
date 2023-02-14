import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';

const initialState = {
  bookData: null,
  isBookDataLoading: false,
  bookDataError: null,
};

export const bookDataSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'bookData',
  initialState,
  reducers: {
    setBookData: (state, action) => {
      state.bookData = action.payload;
    },
    setIsBookDataLoading: (state, action) => {
      state.isBookDataLoading = action.payload;
    },
    setBookDataError: (state, action) => {
      state.bookDataError = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { setBookData, setIsBookDataLoading, setBookDataError } = bookDataSlice.actions;
export const bookReducer = bookDataSlice.reducer;

// thunks

export const getBookDataAsync = (id) => async (dispatch) => {
  dispatch(setIsBookDataLoading(true));
  try {
    const response = await axiosInstance.get(`books/${id}`);
    dispatch(setBookData(response.data));
  } catch (error) {
    dispatch(setBookDataError(error.response.data.error));
  }
  dispatch(setIsBookDataLoading(false));
};
