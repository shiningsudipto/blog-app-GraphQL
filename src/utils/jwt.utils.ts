import jwt from "jsonwebtoken";
import { TDecodedUserInfo } from "../types";
const signature = "blog-app-signature";

const generateToken = (email: string, id: number) => {
  return jwt.sign({ email: email, id: id }, signature, {
    expiresIn: "30d",
  });
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, signature) as TDecodedUserInfo;
    return userData;
  } catch (error) {
    return null;
  }
};

export const jwtUtils = {
  generateToken,
  getUserInfoFromToken,
};
