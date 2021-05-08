/**
 * Get the auth token for currently logged in user.
 * @returns The auth token or null if no user logged in.
 */
export const getAuthToken = (): string | null => {
  return sessionStorage.getItem("token");
};

/**
 * Set the auth token when user logs in or out.
 * @param userToken The auth token to set, or null if logged out.
 */
export const setAuthToken = (userToken: string): void => {
  sessionStorage.setItem("token", userToken);
};

export const getAuthHeaders = (): {} => {
  return {headers: { 'Authorization': `Token ${getAuthToken()}` }};
};
