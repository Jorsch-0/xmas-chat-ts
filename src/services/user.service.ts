import { User } from '../models/user';

export class UserService {
  static async getUsersForSidebar(userId: string) {
    const users = await User.find({ _id: { $ne: userId } }).select('-password');

    return users;
  }
}
