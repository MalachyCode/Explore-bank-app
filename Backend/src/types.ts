export interface UserType {
  id: string;
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
