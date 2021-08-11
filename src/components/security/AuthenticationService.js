import TokenService from "../../utils/TokenService";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {

    logout(){
        TokenService.removeUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){        
        let user = TokenService.getUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return !!user;
    }

    getLoggedInUserName(){
        let user = TokenService.getUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user===null ? user : "";
    }

    registerSuccessfulLoginForJwt(username,token){   
        let user = {username:username,accessToken:""};     
        TokenService.setUser(user, USER_NAME_SESSION_ATTRIBUTE_NAME);        
        TokenService.updateLocalAccessToken(token, USER_NAME_SESSION_ATTRIBUTE_NAME);        
    }

    getToken() {
        return TokenService.getLocalAccessToken( USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

}

export default new AuthenticationService();