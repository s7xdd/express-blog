export interface AuthState {
  user: UserProps | null;
  guestData: UserProps | null;
  token: string | null;
  guestToken: string | null;
  isVerified: boolean;
  isGuestAuthenticated: boolean;
  isAuthenticated: boolean;
  login: (userData: LoginFormProps) => Promise<{ data: LoginResponseProps; isVerified: boolean; error: any }>;
  forgotPassword: (
    forgotPasswordFormData: ResetPasswordFormProps,
  ) => Promise<{ data: ResetPasswordResponseProps; error: any }>;
  setPassword: (setPasswordFormData: SetPasswordFormProps) => Promise<{ data: SetPasswordResponseProps; error: any }>;
  changePassword: (
    changePasswordFormData: ChangePasswordFormProps,
  ) => Promise<{ data: ChangePasswordResponseProps; error: any }>;
  logout: () => void;
}

export interface LoginResponseProps {
  success: boolean;
  message: string;
  data: UserProps;
}

export interface UserProps {
  id: number;
  email: string;
  nicename: string;
  firstName: string;
  lastName: string;
  displayName: string;
  token: string;
  isguest: boolean;
  isverified: boolean;
  issocialmedia?: boolean;
}

export interface RegisterResponseProps {
  success: boolean;
  user: {
    username: string;
    email: string;
  };
  message: string;
  isverified: boolean;
  code: string;
}

export interface LoginFormProps {
  username: string;
  password: string;
}

export interface RegisterFormProps {
  username: string;
  password: string;
  confirmpassword: string;
  email: string;
  agreetermsandconditions: boolean;
}

export interface GuestRegisterFormParams {
  email: string;
}

export interface GuestRegisterResponseProps {
  success: boolean;
  user_id: number;
  user: {
    id: number;
    name: string;
    is_new_user: boolean;
    email: string;
    isguest: boolean;
    isverified: boolean;
    guesttoken: string;
  };
  message: string;
}

export interface OTPFormProps {
  email: string;
  username: string;
  otp: string;
}

export interface OTPResponseProps {
  success: boolean;
  message: string;
  user: {
    token: string;
    id: number;
    email: string;
    nicename: string;
    firstName: string;
    lastName: string;
    displayName: string;
    guesttoken: null;
    isguest: boolean;
    isverified: boolean;
  };
}

export interface ResetPasswordFormProps {
  email: string;
}

export interface ResetPasswordResponseProps {
  success: boolean;
  message: string;
}

export interface SetPasswordFormProps {
  email: string;
  password: string;
  confirmpassword: string;
  code: string;
}

export interface SetPasswordResponseProps {
  success: boolean;
  message: string;
}

export interface ChangePasswordFormProps {
  email: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordResponseProps {
  success: boolean;
  message: string;
  require_logout: boolean;
}

export interface ResendOTPFormProps {
  username: string;
  email: string;
}
