export interface Service {
  id: number;
  title: string;
  contents: Array<string>;
}
export interface FormInputType {
  type: string;
  value: string;
  id: string;
  label: string;
  setValueFunction: (arg0: string) => void;
}
