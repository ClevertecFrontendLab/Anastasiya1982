import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';



const initialState = {
  booksData: [],
  isBookssDataLoading: false,
  booksDataError: null,  
  currentBook:null
};

export const booksSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'books',
  initialState,
  reducers: {
    setBooksData: (state, action) => {       
      state.booksData = [state.booksData,...action.payload];
    },
    setIsBooksDataLoading: (state, action) => {
      state.isBookssDataLoading = action.payload;
    },

    setBooksDataError: (state, action) => {
      state.booksDataError = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { setBooksData, setIsBooksDataLoading, setBooksDataError } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;

// thunks 

export const getBooksDataAsync = () => async (dispatch) => {  
  dispatch(setIsBooksDataLoading(true));
  try {
    const response = await axiosInstance.get('books');   
   
    if (response.data) {       
      dispatch(setBooksData(response.data));
    } else {
      dispatch(setBooksDataError('Error with loading data'));
    //   toast.error('Failed to loading user');
    }
  } catch (err) {
    // dispatch(setUsersDataError('Error with loading data'));
    // toast.error('Error with loading data');
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  }
  dispatch(setIsBooksDataLoading(false));
};

