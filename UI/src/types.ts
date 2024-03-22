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
  label?: string;
  icon: string;
  className: string;
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

export interface MobileTopUpType {
  phoneNumber: string;
  amount: string;
}

export interface BillPaymentType {
  amount: string;
  pin: string;
  phoneNumber?: string;
  description?: string;
}

export interface TransferType {
  bankName: string;
  accountNumber: string;
  amount: string;
  from: string;
  description: string;
}

export interface ForgotPasswordType {
  email: string;
  password: string;
  confirmPassword: string;
}

// const AccountType =  "staff" | "client"

export interface User {
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
// export interface User {
//   id: number;
//   email: string;
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   password: string;
//   type: string;
//   isAdmin: boolean;
//   number: string;
//   transferPin?: string;
//   dob?: string;
// }

export type NewUser = Omit<User, 'id'>;

export interface UpdateUser {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  number: string | undefined;
  dob?: string | undefined;
}

export interface Account {
  id: string;
  balance: number;
  createdOn: Date;
  owner: string;
  status: string;
  accountNumber: number;
  type: string;
}
// export interface Account {
//   id: number;
//   accountNumber: number;
//   createdOn: Date;
//   owner: number;
//   type: string;
//   status: string;
//   balance: number;
// }

export type NewAccount = Omit<Account, 'id'>;

export interface OpenAccountType {
  // accountNumber: number,
  firstName: string;
  lastName: string;
  email: string;
  // type: string;
  // openingBalance : number,
}

export interface TransactionType {
  id: string;
  createdOn: Date;
  type: string; // credit or debit
  accountNumber: number;
  cashier?: string; // cashier who consummated the transaction
  amount: number;
  oldBalance: number;
  newBalance: number;
  description?: string;
}

export type NewTransaction = Omit<TransactionType, 'id'>;

// export interface Transaction {
//   id: number;
//   createdOn: Date;
//   type: string; // credit or debit
//   accountNumber: number;
//   cashier: number; // cashier who consummated the transaction
//   amount: number;
//   oldBalance: number;
//   newBalance: number;
// }

export interface BillPaymentSelectResourceToShow {
  id: number;
  name: string;
}

export interface ResetPinType {
  oldPin: string;
  newPin: string;
  confirmPin: string;
}
