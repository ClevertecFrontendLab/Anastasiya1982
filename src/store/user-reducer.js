import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';

const initialState = {
  userData: null,
  isUserDataLoading: false,
  isUserRegister: false,
  isUserLogin: false,
  userAuthData: null,
  userRegisterDataError: null,
  user: null,
};

export const userSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'user',
  initialState,
  reducers: {
    setUserRegistrationData: (state, action) => {
      state.userData = action.payload.data;
    },
    setIsUserLogin(state, action) {
      state.isUserLogin = action.payload;
    },
    setIsUserRegister(state, action) {
      state.isUserRegister = action.payload;
    },
    setIsUserDataLoading(state, action) {
      state.isUserDataLoading = action.payload;
    },

    setUserRegisterDataError: (state, action) => {
      state.userRegisterDataError = action.payload;
    },
    setUserAuthData: (state, action) => {
      state.userAuthData = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const {
  setUserRegistrationData,
  setIsUserLogin,
  setIsUserRegister,
  setIsUserDataLoading,
  setUserDataError,
  setUserRegisterDataError,
  setUserAuthDat,
  setUser,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

export const registration = (userData) => async (dispatch) => {
  dispatch(setIsUserDataLoading(true));
  try {
    const responce = await axiosInstance.post('auth/local/register', userData);
    localStorage.setItem('registration-token', responce.data.jwt);
    dispatch(setUserRegistrationData({ data: responce.data.user }));
    dispatch(setIsUserRegister(true));
    dispatch(setIsUserDataLoading(false));
  } catch (error) {
    // handle error
    if (error.response.status === 502) {
      dispatch(
        setUserRegisterDataError({
          name: 'bad request',
          status: 502,
          message: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        })
      );
      dispatch(setIsUserDataLoading(false));
    } else if (error.response.status === 400) {
      dispatch(
        setUserRegisterDataError({
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

export const login = (data) => async (dispatch) => {
  dispatch(setIsUserDataLoading(true));
  try {
    const responce = await axiosInstance.post('auth/local', { identifier: data.username, password: data.password });
    localStorage.setItem('token', responce.data.jwt);
    dispatch(setUser(responce.data.user));
    dispatch(setIsUserLogin(true));
    dispatch(setIsUserDataLoading(false));
  } catch (error) {
    // handle error
    if (error.response.status === 400) {
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
    if (error?.response) {
      dispatch(
        setUserDataError({
          name: 'bad request',
          status: 502,
          message: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        })
      );
      dispatch(setIsUserDataLoading(false));
    }
  }
};

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
