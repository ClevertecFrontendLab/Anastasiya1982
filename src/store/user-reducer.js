import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../shared/api/http-common';

const initialState = {
  userData: null,
  isUserDataLoading: false,
  isUserRegister: false,
  successfulRegistration: false,
  isUserAuth: false,
  userAuthData: null,
  userRegisterDataError: null,
  authInfo: {
    status:null,
    info: null,

  },
  userAuthError: null,
  user: null,
  isRestoreEmailSend: false,
  restoreEmailError: null,
  resetPassError: null,
  resetPassSuccess: false,
};

export const userSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'user',
  initialState,
  reducers: {
    setUserRegistrationData: (state, action) => {
      state.userData = action.payload.data;
    },
    setIsUserAuth(state, action) {
      state.isUserAuth = action.payload;
    },
    setIsUserRegister(state, action) {
      state.successfulRegistration = action.payload;
    },
    setAuthInfo(state, action) {       
      state.authInfo = action.payload;
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
    setUserAuthError: (state, action) => {
      state.userAuthError = action.payload;
    },
    setIsRestoreEmailSend: (state, action) => {
      state.isRestoreEmailSend = action.payload;
    },
    setRestoreEmailError: (state, action) => {
      state.restoreEmailError = action.payload;
    },
    setResetPassError: (state, action) => {
      state.resetPassError = action.payload;
    },
    setResetPassSuccess: (state, action) => {
      state.resetPassSuccess = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const {
  setUserRegistrationData,
  setIsUserAuth,
  setIsUserRegister,
  setIsUserDataLoading,
  setUserDataError,
  setUserRegisterDataError,
  setUserAuthData,
  setUser,
  setUserAuthError,
  setIsRestoreEmailSend,
  setRestoreEmailError,
  setResetPassError,
  setResetPassSuccess,
  setAuthInfo,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

export const registration = (userData) => async (dispatch) => {
    console.log('====================================');
    console.log('userData from form',userData);
    console.log('====================================');
  dispatch(setIsUserDataLoading(true));
  try {
    const responce = await axiosInstance.post('auth/local/register', userData);
    localStorage.setItem('registration-token', responce.data.jwt);
    dispatch(setUserRegistrationData({ data: responce.data.user }));
    dispatch(setIsUserRegister(true));
    dispatch(setAuthInfo({status:200,info:'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'}))
    dispatch(setIsUserDataLoading(false));
  } catch (error) {
    // handle error   
     if (error.response.status === 400) {
      dispatch(
        setAuthInfo({         
          status: 400,
          info:
            'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
        })
      );
      dispatch(setIsUserDataLoading(false));
    }
     else {
       dispatch(
         setAuthInfo({
           status: 502,
           info: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
         })
       );
       dispatch(setIsUserDataLoading(false));
     }
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(setIsUserDataLoading(true));
  try {
    const responce = await axiosInstance.post('auth/local', { identifier: data.identifier, password: data.password });
    localStorage.setItem('token', responce.data.jwt);
    localStorage.setItem('isAuth', true);
    dispatch(setUser(responce.data.user));
    dispatch(setIsUserAuth(true));
    dispatch(setIsUserDataLoading(false));
  } catch (error) {
    // handle error
    if (error.response.status === 400) {
      dispatch(
        setAuthInfo({        
          status: 400,
          info: 'Неверный логин или пароль',
        })
      );
      dispatch(setIsUserDataLoading(false));
    } else  {
      dispatch(
        setAuthInfo({         
          status: 502,
          info: 'Что-то пошло не так. Попробуйте ещё раз',
        })
      );
      dispatch(setIsUserDataLoading(false));
    }
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAuth');
  dispatch(setIsUserDataLoading(true));
  dispatch(setUser(null));
  dispatch(setIsUserAuth(false));
  dispatch(setUserAuthError(null));
  dispatch(setIsUserDataLoading(false));
};

export const sendEmailForgotPassword = (data) => async (dispatch) => {
  dispatch(setIsUserDataLoading(true));

  try {
    const responce = await axiosInstance.post('auth/forgot-password', { email:data.email });   
     dispatch(setIsRestoreEmailSend(responce.data.ok));

     dispatch(setIsUserDataLoading(false));
  } catch (error) {   
    if (error.response) {
      dispatch(
        setRestoreEmailError({
          name: 'email loading Error',
          status: 400,
          message: 'письмо не отправлено',
        })
      );
      dispatch(setIsUserDataLoading(false));
    }
  }
};


export const resetPassword = (data) => async (dispatch) => {
   dispatch(setIsUserDataLoading(true));
  try {
    const responce = await axiosInstance.post('auth/reset-password', {
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      code: data.code,
    });
    
    dispatch(setUser(responce.data.user));
    dispatch(setResetPassSuccess(true));
    // localStorage.setItem('token', responce.data.jwt);
   
    dispatch(setIsUserDataLoading(false));
  } catch (error) {
    if (error.response) {
      dispatch(
        setResetPassError({
          name: 'reser pass error',
          status: error.response.status,
          message: 'что-то пошло не так. Попробуйте снова',
        })
      );
      dispatch(setIsUserDataLoading(false));
    }
  }
};

export const resetRegistratonOnFirstStep=()=>async(dispatch)=>{
     dispatch(setAuthInfo({status:null,info:null}))
}