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
  password: string;
  confirmPassword: string;
}

export interface LoginType {
  email: string;
  password: string;
}
