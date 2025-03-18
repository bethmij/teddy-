import { Request, Response, NextFunction } from "express";
import {
  accessiblePaths,
  Role,
  dirrectAccessRoutes,
} from "../utils/accessiblePaths";
import jwt from "jsonwebtoken";


const matchRoute = (routePath: string, requestPath: string): boolean => {
  const routeParts = routePath.split("/");
  const requestParts = requestPath.split("/");

  if (routeParts.length !== requestParts.length) return false;

  return routeParts.every((part, index) => part.startsWith(":") || part === requestParts[index]);
};

const roleBasedAccess = (req: Request, res: Response, next: NextFunction): void => {

  if (dirrectAccessRoutes.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || "u606aDawnmeMVMgxesY2Dvf55DXrqtl3",
    (err: any, user: any) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      req.user = user;
    }
  );

  const user = req.user;
  if (!user || !user.role) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  if (!(user.role in accessiblePaths)) {
    res.status(401).json({ message: "Invalid role" });
    return;
  }

  const allowedPaths = accessiblePaths[user.role as Role] || [];
  const allPaths = Object.values(accessiblePaths).flat(); 

  const pathExists = allPaths.some(route => matchRoute(route.path, req.path));

  if (!pathExists) {
    res.status(404).json({ message: "Route not found" });
    return;
  }

  const isAllowed = allowedPaths.some(route => matchRoute(route.path, req.path) && route.method === req.method.toUpperCase());

  if (!isAllowed) {
    res.status(403).json({
      message: "Access denied: You do not have permission to access this resource",
    });
    return;
  }

  next();
};

export default roleBasedAccess;
