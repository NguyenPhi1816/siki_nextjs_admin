export type SignInRequest = {
  phoneNumber: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
};

export type SignInError = {
  message: string;
  error: string;
  statusCode: number;
};
