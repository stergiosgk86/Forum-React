import axios from "axios";
import { BASE_URL } from "../../utils/Api";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {

    executeJwtAuthenticationService(username,password){
        return axios.post(`${BASE_URL}/login`,{username:username,password:password})
    }

    createJwtToken(token){
        return "Bearer "+ token;
    }

    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn()){
                    config.headers.authorization= token;
                }
                return config;
            }
        )
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null){
            return false;
        }
        else{
            return true;
        }
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null){
            return "";
        }
        else{
            return user;
        }
    }

    registerSuccessfulLoginForJwt(username,token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        // this.updateLocalAccessToken(token);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    updateLocalAccessToken(token) {
        let user = JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME));
        user.accessToken = token;
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(user));
      }
}

export default new AuthenticationService();