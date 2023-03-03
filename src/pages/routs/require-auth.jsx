import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export const RequireAuth=({children})=>{
    const auth=useSelector(store=>store.userData.isUserLogin);
   
    const location=useLocation();
    if(!auth){
        return <Navigate to='/auth' state={{ from: location }} />;
    }
    return children
}