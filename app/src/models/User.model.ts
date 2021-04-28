import UserData from "../types/UserData.type";

/** User model from api. */
class User {
  username: string;
  firstName: string;
  lastName: string;

  /** Class constructor */
  constructor(userData: UserData) {
    this.username = userData.username;
    this.firstName = userData.first_name;
    this.lastName = userData.last_name;
  }

  /**
   * Controls logic for displaying a users name.
   * @returns String for identifying user.
   */
  displayName(): string {
    if (this.firstName || this.lastName) {
      let name = "";
      if (this.firstName) {
        name += this.firstName + " ";
      }
      if (this.lastName) {
        name += this.lastName;
      }

      return name;
    }
    return this.username;
  }
}

export default User;
