
export const isAuthenticated = () => {
  const token = getToken()
  if( token && token !== ''){
      return true
  }
  return false
}

export const getToken = () => {
    return sessionStorage.getItem("access-token");
}

export const setToken = (token) => {
    sessionStorage.setItem("access-token", token);
}

export const clearToken = (token) => {
    sessionStorage.clear("access-token");
}