import { useLocation, useNavigate } from "react-router-dom";


export const AuthPage = () => {
 const navigate=useNavigate();
 const location=useLocation();
//   const user = useSelector((store) => store.userData.userData);
 const fromPage=location.state?.from?.pathname || '/';
  return (
    <div className='auth-page'>      
      <h3 className='auth-page-header'>Cleverland</h3>
      LOGIN /AUTH page
      {fromPage}           
    </div>
  );
};