import { Roles } from '../enums/roles.enum';

export type User = {
  id: string;
  name: string;
  password: string;
  email: string;
  roles: Roles[];
};
