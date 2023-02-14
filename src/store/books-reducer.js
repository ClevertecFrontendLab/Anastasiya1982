import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';

const initialState = {
  booksData: [],
  isDataLoading: false,
  booksDataError: null,
  currentBook: null,
  categoriesData: [],
  categoriesDataError: null,
  currentCategory: null,
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
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const {
  setBooksData,
  setIsDataLoading,
  setBooksDataError,
  setCategoriesData,
  setCategoriesDataError,
  setCurrentCategory,
} = booksSlice.actions;
export const booksReducer = booksSlice.reducer;

// thunks

// Get Categories

export const getCategoriesDataAsync = () => async (dispatch) => {
setIsDataLoading(true)
  try {
    const response = await axiosInstance.get('categories');
    if (response) {
      dispatch(setCategoriesData(response.data));
    } else if (response.status === 404) {
      dispatch(setBooksDataError({ name: 'error 404' }));
    }
  } catch (error) {
    dispatch(setBooksDataError(error.response.data.error));
  }
  setIsDataLoading(false)
};

  
export const getBooksDataAsync = () => async (dispatch) => {
  dispatch(setIsDataLoading(true));
  try {
    const response = await axiosInstance.get('books');
    if (response) {
      dispatch(setBooksData(response.data));
    } else {
      dispatch(setBooksDataError({ name: 'error 404' }));      
    }
  } catch (error) {
    dispatch(setBooksDataError(error.response.data.error));
    dispatch(setIsDataLoading(false));
  }
  dispatch(setIsDataLoading(false));
};

