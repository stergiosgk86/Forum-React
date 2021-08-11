class TokenService {
    getLocalRefreshToken(authenticatedUser) {
        const user = JSON.parse(localStorage.getItem(authenticatedUser));        
        return user?.refreshToken;
    }
  
    getLocalAccessToken(authenticatedUser) {
      const user = JSON.parse(localStorage.getItem(authenticatedUser));
      return user?.accessToken;
    }
  
    updateLocalAccessToken(token, authenticatedUser) {

      const u = localStorage.getItem(authenticatedUser);      
      let user = JSON.parse(u);      
      user.accessToken = token;            
      localStorage.setItem(authenticatedUser, JSON.stringify(user));      
    }
  
    getUser(authenticatedUser) {
      return JSON.parse(localStorage.getItem(authenticatedUser));
    }
  
    setUser(user, authenticatedUser) {
      localStorage.setItem(authenticatedUser, JSON.stringify(user));
    }
  
    removeUser(authenticatedUser) {
      localStorage.removeItem(authenticatedUser);
    }
  }
  
  export default new TokenService();