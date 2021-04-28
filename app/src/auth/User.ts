import User from "../models/User.model";
import UserData from "../types/UserData.type";

/**
 * Get the current user data stored in session.
 * @returns The user or null if no user logged in.
 */
export const getUserSession = (): User | null => {
  const user = sessionStorage.getItem("user");

  if (user) {
    return new User(JSON.parse(user) as UserData);
  }
  return null;
};

/**
 * Store new user data in session when a user logs in.
 * @param user New logged in user to store in session, or null if user logged out.
 */
export const setUserSession = (user: UserData): void => {
  sessionStorage.setItem("user", JSON.stringify(user));
};
