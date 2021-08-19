import {Role} from './Role';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  roles: Role[]
}
