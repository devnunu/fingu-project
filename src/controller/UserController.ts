import User from "../model/user/User";

class UserController {
  private user: User;
  private userListnerList: Set<(user: User) => void>;

  constructor() {
    this.user = new User();
    this.userListnerList = new Set();
  }

  public setUser(user: User) {
    console.log("FunctionCalled[setUser]");
    this.user = user;
    this.notifyUserListner();
  }

  public setUserListner(userListner: (user: User) => void): void {
    this.userListnerList.add(userListner);
  }

  public deleteUserListner(userListner: (user: User) => void): void {
    this.userListnerList.delete(userListner);
  }

  public notifyUserListner() {
    console.log("FunctionCalled[notify]");
    this.userListnerList.forEach(item => item(this.user));
  }
}

export default new UserController();
