class TokenService {
    getLocalRefreshToken(authenticatedUser) {
        const user = JSON.parse(sessionStorage.getItem(authenticatedUser));
        return user?.refreshToken;
    }
  
    getLocalAccessToken(authenticatedUser) {
      const user = JSON.parse(sessionStorage.getItem(authenticatedUser));
      return user?.accessToken;
    }
  
    updateLocalAccessToken(token, authenticatedUser) {
      let user = JSON.parse(sessionStorage.getItem(authenticatedUser));
      user.accessToken = token;
      console.log(user);
      console.log(token);
      sessionStorage.setItem(authenticatedUser, JSON.stringify(user));
    }
  
    getUser(authenticatedUser) {
      return JSON.parse(sessionStorage.getItem(authenticatedUser));
    }
  
    setUser(user, authenticatedUser) {
      sessionStorage.setItem(authenticatedUser, JSON.stringify(user));
    }
  
    removeUser(authenticatedUser) {
      sessionStorage.removeItem(authenticatedUser);
    }
  }
  
  export default new TokenService();