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
  placeholder?: string;
  regex?: string;
  // pattern?: RegExp;
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
  profilePicture?: string;
}

export type NewUser = Omit<User, 'id'>;

export interface ConfirmUserPin {
  email: string;
  transferPin: string;
}

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

export interface NotificationBody {
  id: string;
  message: string;
  accountId?: string;
  accountNumber?: number;
  transactionId?: string;
}

export type NewNotificationBody = Omit<NotificationBody, 'id'>;

export interface Notification {
  id: string;
  owner: string;
  newNotifications: Array<NotificationBody | NewNotificationBody>;
  oldNotifications: Array<NotificationBody>;
}

export type NewNotification = Omit<Notification, 'id'>;

export interface BarDataBody {
  id: string;
  name: string;
  difference: number;
  income: number;
  expensis: number;
}

export interface BarChartInfo {
  id: string;
  owner: string;
  barData: Array<BarDataBody | NewBarDataBody>;
}

export type NewBarChartInfo = Omit<BarChartInfo, 'id'>;
export type NewBarDataBody = Omit<BarDataBody, 'id'>;

export interface FindByAccountNumberType {
  accountNumber: number;
}

export interface FindUserAccountsType {
  owner: string;
}

export interface FindUserByEmailType {
  email: string;
}

export interface MailContactType {
  name: string;
  email: string;
  message: string;
}

export interface ReportScamType {
  name: string;
  email: string;
  report: string;
}
