import jwt from "jsonwebtoken";

const generateToken = (email: string, id: number) => {
  return jwt.sign({ email: email, id: id }, "blog-app-signature", {
    expiresIn: "30d",
  });
};

export const jwtUtils = {
  generateToken,
};
