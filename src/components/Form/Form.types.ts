type InputFieldType =
  | 'checkbox'
  | 'number'
  | 'email'
  | 'password'
  | 'text'
  | 'search'
  | 'time'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'week'
  | undefined;

export type FieldConfig = {
  id: string;
  label: string;
  type: InputFieldType;
  error?: string;
  placeholder?: string;
  name?: string;
  validation?: {
    pattern: RegExp | string;
    message: string;
  };
};

export type FormProps = {
  formConfig?: FieldConfig[];
  handleSubmit: (formElement: HTMLFormElement) => void;
  authError: string;
};
