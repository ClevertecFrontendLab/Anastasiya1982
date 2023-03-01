import { useLocation, Navigate } from "react-router-dom";

export const RequireAuth=({children})=>{
    const auth=false;
    const location=useLocation();
    if(!auth){
        return <Navigate to='/auth' state={{from:location}} />;
    }
    return children
}