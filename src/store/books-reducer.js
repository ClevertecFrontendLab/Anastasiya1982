import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';

const initialState = {
  booksData: [],
  isDataLoading: false,
  booksDataError: null,
  currentBook: null,
  categoriesData: [],
  categoriesDataError: null,
};

export const booksSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'books',
  initialState,
  reducers: {
    setBooksData: (state, action) => {
      state.booksData = [...action.payload];
    },
    setIsDataLoading: (state, action) => {
      state.setIsDataLoading = action.payload;
    },

    setBooksDataError: (state, action) => {
      state.booksDataError = action.payload;
    },

    setCategoriesData: (state, action) => {
      state.categoriesData = [...action.payload];
    },
    setCategoriesDataError: (state, action) => {
      state.categoriesDataError = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { setBooksData, setIsDataLoading, setBooksDataError, setCategoriesData, setCategoriesDataError } =
  booksSlice.actions;
export const booksReducer = booksSlice.reducer;

// thunks

export const getBooksDataAsync = () => async (dispatch) => {
  dispatch(setIsDataLoading(true));
  try {
    const response = await axiosInstance.get('books');
    dispatch(setBooksData(response.data));
  } catch (error) {
    dispatch(setBooksDataError(error.response.data.error));
  }
  dispatch(setIsDataLoading(false));
};

// Categories

export const getCategoriesDataAsync = () => async (dispatch) => {
  dispatch(setIsDataLoading(true));
  try {
    const response = await axiosInstance.get('categories');

    dispatch(setCategoriesData(response.data));
  } catch (error) {
    dispatch(setCategoriesDataError(error.response.data.error))
    
  }
  dispatch(setIsDataLoading(false));
};
