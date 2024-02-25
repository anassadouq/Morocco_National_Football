import { Navigate } from "react-router-dom";
import { AccountService } from "./AccountService";

const AuthGuard = ({children}) => {
    if(!AccountService.isLogged()){
        return <Navigate to="/login"/>
    }
   
    return children
};
export default AuthGuard;