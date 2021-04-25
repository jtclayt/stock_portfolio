export const getAuthToken = (): string | null => {
  return sessionStorage.getItem('token');
};

export const setAuthToken = (userToken: string): void => {
  sessionStorage.setItem('token', userToken);
};
