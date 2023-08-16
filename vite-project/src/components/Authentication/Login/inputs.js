import { v4 as uuidv4 } from 'uuid';
export const inputsLogin = [
    {  
        id: uuidv4(),
      name: "email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
      icon: "MdEmail",
    },
    {
        id: uuidv4(),
      name: "password",
      type: "password",
      // errorMessage:
      //   "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
      icon: "RiLockPasswordFill",
    },
  ];