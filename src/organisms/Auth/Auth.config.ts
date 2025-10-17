export const registrationFormConfig = [
  {
    id: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your name',
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    validation: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Invalid email address',
    },
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    validation: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      message:
        'Password must contain at least 8 characters, one letter and one number',
    },
  },
];

export const loginFormConfig = [
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    validation: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Invalid email address',
    },
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
  },
  // { id: "remember", label: "Remember me", type: "checkbox" },
];
