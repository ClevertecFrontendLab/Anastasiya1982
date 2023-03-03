import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';

const countNumberOfBooksWithCategory = (name, books) => {
  let i;
  let count = 0;
  for (i = 0; i < books.length; i++) {
    let j;
    const arr = books[i].categories;
    for (j = 0; j < arr.length; j++) {
      count += arr[j] === name ? 1 : 0;
    }
  }
  return count;
};

export const defaultAllCategories = {
  id: 123456,
  name: 'Все книги',
  path: 'all',
};

const initialState = {
  booksData: [],
  isDataLoading: false,
  booksDataError: null,
  currentBook: null,
  categoriesData: [],
  categoriesDataError: null,
  currentCategory: defaultAllCategories,
  isCategoriesDataLoading: false,
  sortOrderType: 'asc',
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
      state.currentCategory = { ...action.payload };
    },
    setCategoriesWithCount: (state, action) => {
      state.categoriesData = [...action.payload];
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
  setCategoriesWithCount,
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
    if (error?.response?.status === 502) {
      dispatch(setBooksDataError({ name: 'bad request', status: 502 }));
    } else if (error?.response?.status === 404) {
      // handle not found error...
      dispatch(setBooksDataError({ name: 'not found error', status: 404 }));      
      dispatch(setIsDataLoading(false));
    }
    dispatch(setBooksDataError({ name: 'error', status: 500 }));
  }
};

// Get all books

export const getBooksDataAsync = () => async (dispatch) => {
  dispatch(setIsDataLoading(true));
  try {
    const response = await axiosInstance.get('books');
    dispatch(setBooksData(response.data));
    dispatch(setIsDataLoading(false));
  } catch (error) {
    // handle error
    if (error?.response?.status === 502) {
      dispatch(setBooksDataError({ name: 'bad request', status: 502 }));
      dispatch(setIsDataLoading(false));
    } else if (error?.response?.status === 404) {
      // handle not found error...
      dispatch(setBooksDataError({ name: 'not found error', status: 404 }));
      dispatch(setIsDataLoading(false));
    }
  }
};

export const setCountToAllCategories = (books, categories) => async (dispatch) => {
  const newCategoriesArr = categories.map((category) => ({
    ...category,
    count: countNumberOfBooksWithCategory(category.name, books),
  }));
  dispatch(setCategoriesWithCount(newCategoriesArr));
};
