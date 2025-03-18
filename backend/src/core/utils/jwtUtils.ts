import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET_KEY || 'u606aDawnmeMVMgxesY2Dvf55DXrqtl3';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'u606aDawnmeMVMgxesY2Dvf55DXrqtl3';
const TOKEN_EXPIRATION = "1h";
const REFRESH_EXPIRATION = "7d";

interface CustomJwtPayload extends JwtPayload {
    username: string;
    role?: string;
  }

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_EXPIRATION });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  try {
  
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);

    if (typeof payload !== "object" || payload === null || !("username" in payload)) {
      throw new Error("Invalid token payload");
    }

    return payload as CustomJwtPayload;
  } catch (err) {
    console.error("Refresh token verification failed:", err);
    throw new Error("Invalid or expired refresh token");
  }
};
