export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInRequestBody = {
  client_id: string;
  grant_type: string;
  client_secret: string;
  username: string;
  password: string;
  scope: string;
};

export type SignInResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
};

export type SignInError = {
  error: string;
  error_description: string;
};
