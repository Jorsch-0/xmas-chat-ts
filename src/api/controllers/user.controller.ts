import { Response } from 'express';
import { tryCatch } from '../../utils';
import { UserService } from '../../services/user.service';
import { Request } from '../middlewares/authenticate';

export class UserController {
  static getUsersForSidebar = tryCatch(async (req: Request, res: Response) => {
    const filteredUsers = await UserService.getUsersForSidebar(req.user.userId);

    res.status(200).json(filteredUsers);
  });
}
