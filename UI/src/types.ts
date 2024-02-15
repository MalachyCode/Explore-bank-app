interface Content {
  id: string;
  text: string;
}
interface InfoContent {
  id: string;
  text: string;
}

export interface Service {
  id: number;
  title: string;
  contents: Array<Content>;
}

export interface Icons {
  label: string;
  icon: string;
  iconClassName?: string;
  spanClassName?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export interface Info {
  id: number;
  title: string;
  infoContents: Array<InfoContent>;
}
export interface FormInputType {
  name: string;
  type: string;
  value: string;
  id: string;
  label: string;
  placeholder: string;
  errorMessage?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  // onChange: (arg0: string) => void;
}
export interface SignUpType {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
export interface CreateStaff {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface TransferType {
  bankName: string;
  accountNumber: string;
  amount: string;
}

export interface ForgotPasswordType {
  email: string;
  password: string;
  confirmPassword: string;
}

// const AccountType =  "staff" | "client"

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
}
