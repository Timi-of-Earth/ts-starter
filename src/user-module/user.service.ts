import AppError from '../utils/app-error.util';
import { User } from '../@types/user.type';
import { Roles } from '../enums/roles.enum';

class UserService {
  private user = [] as User[];
  public getAllUsers = async (): Promise<User[]> => {
    return this.user;
  };

  public getUserById = async (id: string): Promise<User> => {
    const user = this.user.find(({ id }) => id === id);
    if (!user) throw new AppError(`No user found with the id of ${id}`, 404);
    return user;
  };

  public updateUserRole = async (
    currUser: User,
    roles: Roles[]
  ): Promise<User> => {
    const user = this.user.find(({ id }) => id === currUser.id);

    if (!user) throw new AppError(`No user found with that id`, 404);

    const roleExistOnUser = roles.some((item: Roles) =>
      user.roles.includes(item)
    );

    if (roleExistOnUser)
      throw new AppError('Role already exist on this user', 400);

    user.roles = [...user.roles, ...roles];

    return user;
  };

  public updateUserDetails = async (
    userDetailsForUpdate: any,
    id: string
  ): Promise<User> => {
    const { firstName, lastName, phoneNumber } = userDetailsForUpdate;

    const user = this.user.find(({ id }) => id === id);

    if (!user) throw new AppError('No user found with that id', 404);

    return user;
  };

  public deleteUserById = async (id: string): Promise<void> => {
    const user = this.user.find(({ id }) => id);
    if (!user) throw new AppError(`No user found with the id of ${id}`, 404);
  };
}

export default UserService;
