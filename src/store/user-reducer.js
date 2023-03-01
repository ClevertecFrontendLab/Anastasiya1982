import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';

const initialState = {
  userData: null,
  isUserDataLoading: false,
  isUserLogin: false,
  userDataError: null,
};

export const userSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload.data;
    },
    setIsUserLogin(state, action) {
      state.isUserLogin = action.payload;
    },
    setIsUserDataLoading(state, action) {
      state.isUserDataLoading = action.payload;
    },

    setUserDataError: (state, action) => {
      state.userDataError = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { setUserData, setIsUserLogin, setIsUserDataLoading, setUserDataError } = userSlice.actions;
export const userReducer = userSlice.reducer;

// thunks

export const registration = (userData) => async (dispatch) => {  
   
  dispatch(setIsUserDataLoading(true));
  try {
    const responce = await axiosInstance.post('auth/local/register', userData); 
     localStorage.setItem('token', responce.data.jwt);
     dispatch(setUserData({ data: responce.data.user }));
     dispatch(setIsUserDataLoading(false));
   
  } catch (error) {
    // handle error
    if (error.response.status === 502) {
      dispatch(
        setUserDataError({
          name: 'bad request',
          status: 502,
          message: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        })
      );
    } else if (error.response.status === 400) {
      dispatch(
        setUserDataError({
          name: 'login and password error',
          status: 400,
          message:
            'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
        })
      );
     dispatch(setIsUserDataLoading(false));
    }
   
  }
};

// export const login = (email, password) => (dispatch) => {
//   dispatch(setIsLoading(true));
//   api
//     .post('http://localhost:5000/api/login', { email, password })
//     .then((res) => {
//       localStorage.setItem('token', res.data.accessToken);
//       dispatch(setUser({ data: res.data.user }));
//       dispatch(setIsUserLogin(true));
//     })
//     .catch((err) => {
//       toast.warn(`${err.response.status}! ${err.response.data}`, { autoClose: TIME_FOR_CLOSE });
//       dispatch(setError({ value: err.response.status }));
//     });
//   dispatch(setIsLoading(false));
// };

// export const logout = () => (dispatch) => {
//   api
//     .post('http://localhost:5000/api/logout')
//     .then(() => {
//       localStorage.removeItem('token');
//       dispatch(setUser({}));
//       dispatch(setIsUserLogin(false));
//       toast.warn('you are out of the game... to start playing again, you need to log in', {
//         autoClose: TIME_FOR_CLOSE,
//       });
//     })
//     .catch((err) => {
//       dispatch(setError(err.message));
//     });
// };
