const authApiPaths = {
  signIn: "api/auth/signIn",
  signUp: "api/auth/signUp",
  refresh: "api/auth/refresh",
  changePassword: "api/auth/changePassword",
  forgotPassword: "api/auth/forgotPassword",
  resetPassword: "api/auth/resetPassword",
  logout: "api/auth/logout",
  oauthInfo: "api/auth/oauthInfo",
  google: {
    signIn: "api/auth/google",
    callback: "api/auth/google/callback",
  },
};

export default authApiPaths;
