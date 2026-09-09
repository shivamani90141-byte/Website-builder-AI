import jwt from "jsonwebtoken";

/**
 * Verifies the session token and adds its decoded payload to the request.
 *
 * @param {import("express").Request} req The request containing the session cookie.
 * @param {import("express").Response} res The response used for authentication errors.
 * @param {import("express").NextFunction} next Continues to the protected handler.
 * @returns {void}
 */
export function authMiddleware(req,res,next){
  const token = req.cookies.token;

  if(!token){
    res.status(401).json({error:"Access denied. No session token provided"});
  }

  try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      req.user = decoded;
      next()
  }catch(error){
      res.status(401).json({error:"Session expired or invalid. Please sign in again."});
  }
}
