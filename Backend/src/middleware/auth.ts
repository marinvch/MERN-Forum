import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      res.status(401).json({
        msg: "No authentication token, authorization denied.",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ msg: "JWT_SECRET is not configured" });
      return;
    }

    const verified = jwt.verify(token, jwtSecret) as UserPayload;
    if (!verified) {
      res.status(401).json({
        msg: "Token verification failed, authorization denied.",
      });
      return;
    }

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
