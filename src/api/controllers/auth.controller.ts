import { Request, Response } from 'express';
import { CustomError, tryCatch } from '../../utils';
import { AuthService } from '../../services/auth.service';
import { env } from '../../config';
import { validateSignup } from '../validators/auth';

export class AuthController {
  static signup = tryCatch(async (req: Request, res: Response) => {
    const { fullName, username, password, confirmPassword, gender } = validateSignup(req.body);

    if (password !== confirmPassword) {
      throw CustomError.badRequest('Passwords do not match');
    }

    const { user, token } = await AuthService.signup({ fullName, username, password, confirmPassword, gender });

    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
      secure: env.NODE_ENV !== 'development',
    });
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  });

  static login = tryCatch(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const { user, token } = await AuthService.login(username, password);

    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
      secure: env.NODE_ENV !== 'development',
    });
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  });

  static logout = tryCatch(async (_req: Request, res: Response) => {
    // res.cookie('jwt', '', { maxAge: 0 });
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
  });
}
