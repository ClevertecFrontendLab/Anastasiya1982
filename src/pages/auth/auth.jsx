import { useLocation, useNavigate,Link } from "react-router-dom";
import { useSelector } from "react-redux";


import { Loader } from "../../components/loader/loader";
import { LoginForm } from "../../components/login-form/login-form";

import './auth.scss';

export const AuthPage = () => {
 const navigate=useNavigate();
 const location=useLocation();
//   const user = useSelector((store) => store.userData.userData);
 const fromPage=location.state?.from?.pathname || '/';

  const isUserDataLoading = useSelector((store) => store.userData.isUserDataLoading);

  return (
    <div className='auth-page'>
      {isUserDataLoading && <Loader />}
      <h3 className='auth-page-header'>Cleverland</h3>
      <div className='form-container'>
        <h3 className="form-container-title">Вход в личный кабинет</h3>
        <LoginForm />
        <div className='enter-block'>
          <span className='enter-block-title'>Нет учетной записи?</span>
          <Link to='/registration' className='enter-block-button'>
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
};