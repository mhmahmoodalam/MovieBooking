const tokenKey = "access-token"
const customerUUIDKey = "UUID"

export const isAuthenticated = () => {
  const token = getToken()
  if( token && token !== ''){
      return true
  }
  return false
}

export const getToken = () => {
    return sessionStorage.getItem(tokenKey);
}

export const setToken = (response) => {
    const token = response.headers.get(tokenKey)
    const customerUUID = response.json().id || ''
    sessionStorage.setItem(tokenKey, token);
    setCustomerUUID(customerUUID)
}

export const clearToken = () => {
    sessionStorage.removeItem(tokenKey);
    clearCustomerUUID();
}

export const getCustomerUUID = () => {
    return sessionStorage.getItem(customerUUIDKey);
}

export const setCustomerUUID = (uuid) => {
    sessionStorage.setItem(customerUUIDKey, uuid);
}

export const clearCustomerUUID = () => {
    sessionStorage.removeItem(customerUUIDKey);
}