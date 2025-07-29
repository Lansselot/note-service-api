export type AppJwtPayload = {
  userId: string;
  sessionId: string;
};

export type JwtTokens = {
  accessToken: string;
  refreshToken: string;
};
