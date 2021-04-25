import User from "../models/User.model";
import UserData from "../types/UserData.type";

export const getUserSession = (): User | null => {
  const user = sessionStorage.getItem("user");

  if (user) {
    return new User(JSON.parse(user) as UserData);
  }
  return null;
}

export const setUserSession = (user: UserData): void => {
  sessionStorage.setItem("user", JSON.stringify(user));
}
