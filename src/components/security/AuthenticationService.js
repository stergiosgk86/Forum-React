import axios from "axios";
import { api } from "../../utils/Api";
import TokenService from "../../utils/TokenService";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {

    executeJwtAuthenticationService(username,password){
        return api.login(username,password);
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
        TokenService.removeUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = TokenService.getUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null){
            return false;
        }
        else{
            return true;
        }
    }

    getLoggedInUserName(){
        let user = TokenService.getUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null){
            return "";
        }
        else{
            return user;
        }
    }

    registerSuccessfulLoginForJwt(username,token){
        TokenService.setUser(username, USER_NAME_SESSION_ATTRIBUTE_NAME);
        TokenService.updateLocalAccessToken(token, USER_NAME_SESSION_ATTRIBUTE_NAME);
        this.setupAxiosInterceptors(this.createJwtToken(token));
        console.log(username + "register");
        console.log(token + "register");
    }

    getToken() {
        return TokenService.getLocalAccessToken( USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

}

export default new AuthenticationService();