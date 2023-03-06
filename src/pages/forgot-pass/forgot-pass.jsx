import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ForgotPassPage = () => {
  const isAuth = localStorage.getItem('isAuth');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/books/all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return <div>ForgotPassPage</div>;
};
