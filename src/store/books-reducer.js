
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
  isCategoriesDataLoading: false,
  sortOrderType:'asc'
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
      state.isDataLoading = action.payload;
    },
    setIsCategoriesDataLoading: (state, action) => {
      state.isCategoriesDataLoading = action.payload;
    },
    setSortOrderType: (state, action) => {
      state.sortOrderType = action.payload;
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
  setIsCategoriesDataLoading,
  setSortOrderType,
} = booksSlice.actions;
export const booksReducer = booksSlice.reducer;

// thunks

// Get Categories

export const getCategoriesDataAsync = () => async (dispatch) => {
  dispatch(setIsDataLoading(true));
  try {
    const response = await axiosInstance.get('categories');
    dispatch(setCategoriesData(response.data));
    dispatch(setIsDataLoading(false));
  } catch (error) {
    // handle error
    if (error.response.status === 502) {
      dispatch(setBooksDataError({ name: 'bad request', status: 502 }));
    } else if (error.response.status === 404) {
      // handle not found error...
      dispatch(setBooksDataError({ name: 'not found error', status: 404 }));
      dispatch(setIsDataLoading(false));
    }
  }
  //    dispatch(setIsDataLoading(false));
};

export const getBooksDataAsync = () => async (dispatch) => {
  dispatch(setIsDataLoading(true));
  try {
    const response = await axiosInstance.get('books');
    dispatch(setBooksData(response.data));
    dispatch(setIsDataLoading(false));
  } catch (error) {
    // handle error
    if (error.response.status === 502) {
      dispatch(setBooksDataError({ name: 'bad request', status: 502 }));
      dispatch(setIsDataLoading(false));
    } else if (error.response.status === 404) {
      // handle not found error...
      dispatch(setBooksDataError({ name: 'not found error', status: 404 }));
      dispatch(setIsDataLoading(false));
    }
  }
};
