import type { NextFunction, Request, Response } from "express";
import { decodeJWT } from "../helper/jwtHelper";
import userRepository from "../modules/user/userRepository";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const cookieToken = req.cookies.auth_token as string | undefined;

    if (!cookieToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const [, token] = cookieToken.split(" ");

    const user = decodeJWT(token);

    const dbUser = await userRepository.read(user.id);

    if (!dbUser) {
      res.clearCookie("auth_token");
      res.status(401).json({ message: "Utilisateur introuvable" });
      return;
    }

    const rawUser = await userRepository.findByEmailOrUsername(user.email);

    if (rawUser.user_is_ban) {
      res.clearCookie("auth_token");

      res.status(403).json({
        message: "Votre compte est suspendu",
      });

      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authorization;
