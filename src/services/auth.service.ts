import { SignupInput } from '../api/validators/auth';
import { env } from '../config';
import { User } from '../models/user';
import { CustomError } from '../utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async signup({ username, password, fullName, gender }: SignupInput) {
    const user = await User.findOne({ username });
    if (user) {
      throw CustomError.badRequest('Username is already taken');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, env.JWT_SECRET, { expiresIn: '15d' });

    return { user: newUser, token };
  }

  static async login(username: string, password: string) {
    const user = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(password, user?.password || '');

    if (!user || !isPasswordValid) {
      throw CustomError.unauthorized('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: '15d' });

    return { user, token };
  }
}
