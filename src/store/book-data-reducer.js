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
    dispatch(setIsBookDataLoading(false));
  } catch (error) {
    // handle error
    if (error.response.status === 400) {
      // handle bad request error...
    } else if (error.response.status === 404) {
      // handle not found error...
      dispatch(setBookDataError({ name: 'not found error', status: 404 }));
      dispatch(setIsBookDataLoading(false));
    }
  }
};
