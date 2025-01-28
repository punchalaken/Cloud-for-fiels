interface LoginField {
  login: string;
  loginLength: number;
  loginLetters: number;
}

interface PasswordField {
  password: string;
  passwordLength: number;
}

interface EmailField {
  email: string;
  emailIsValid: boolean;
}

export type StateLogin = Record<"login", LoginField>;
export type StatePassword = Record<"password", PasswordField>;
export type StateEmail = Record<"email", EmailField>;


export type SetEmailOrLoginPayload = {
  value: string;
  field: "login" | "email";
};






// Server Response

export interface UsedLogin {
  status: "Success" | "Error",
  message: "User is already" | "User is not used"
}
