export interface JWTPayloadType {
  sub: number;  // user id
  email: string;
  role: string;
  iat?: number;
}