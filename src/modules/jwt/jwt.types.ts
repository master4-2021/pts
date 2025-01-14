export type JwtPayload = {
  username: string;
  sub: string;
  iat?: number;
  exp?: number;
};

export type ValidatedUser = {
  username: string;
  uid: string;
};
