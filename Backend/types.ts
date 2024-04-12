export interface User {
  id: number;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
  type: string;
  isAdmin: boolean;
  number: string;
  transferPin?: string;
  dob?: string;
}
