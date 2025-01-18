export type TSignup = {
  name: string;
  email: string;
  password: string;
};
export type TDecodedUserInfo = {
  email: string;
  id: number;
  iat: number;
  exp: number;
};
