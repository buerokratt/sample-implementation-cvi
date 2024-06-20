import { ROLES } from './roles.ts';

export interface User {
  login?: string;
  firstName?: string;
  lastName?: string;
  idCode: string;
  displayName: string;
  csaTitle: string;
  csaEmail: string;
  authorities: ROLES[];
  customerSupportStatus: 'online' | 'idle' | 'offline';
}

export interface UserDTO extends Pick<User, 'login' | 'idCode' | 'authorities' | 'displayName' | 'csaTitle' | 'csaEmail'> {
}
