import { response } from "express";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"
//Helper to set cookies
const setSessionCookie = (req, payload)=>{
    const token = jwt.sign(payload,JWT_SECRET, {expiresIn:"30d"})
    res.cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"lax",
      maxAge:30*24*60*1000, // 30 days
      path:"/",
    })
}

/**
 * Registers a user, starts their session, and returns the created account.
 *
 * @param {import("express").Request} req The registration request.
 * @param {import("express").Response} res The response used to return the account.
 * @returns {Promise<void>}
 */
export async function register(req, res) {
  const {name, email, password} = req.body

  if(!name || !email || !password){
    res.status(400).json({error: "Name, email, and password are required"})
    return;
  }


  const trimmedEmail = email. toLowerCase(). trim();
  const existing = await User.findOne({email: trimmedEmail})
  if(existing){
    res.status(400).json({error: "An Account with this email already exists"})
    return;
  }


  const user = await User.create({
    name,
    email: trimmedEmail,
    password
  })

  setSessionCookie(res,{userId : user._id.toString(), email:user.email})

  res.status(201).json({
    user: {
      _id: user_id,
      name: user.name,
      email: user.email
    }
})
}

/**
 * Authenticates a user, starts their session, and returns their account.
 *
 * @param {import("express").Request} req The login request.
 * @param {import("express").Response} res The response used to return the account.
 * @returns {Promise<void>}
 */
export async function login(req, res) {
      const { email, password} = req.body

  if(!email || !password){
    res.status(400).json({error: " email, and password are required"})
    return;
  }

  const user = await User.findOne({email: email.toLowerCase().trim()})
  if(existing){
    res.status(401).json({error: "Invalid email or password"})
    return;
  }
  const isValid = await user.comparePassword(password)
  if(!isValid){
    res.status(401).json({error:"Invalid email or password"});
    return;
  }

  setSessionCookie(res,{userId : user._id.toString(), email:user.email})

  res.status(201).json({
    user: {
      _id: user_id,
      name:user.name,
      email: user.email
    }
})
}

/**
 * Clears the current user's session cookie.
 *
 * @param {import("express").Request} _req The logout request.
 * @param {import("express").Response} res The response used to clear the session.
 * @returns {Promise<void>}
 */
export async function logout(_req, res) {
    res.cookie("token","",{
      httpOnly:true,
      secure:process.env.NODE_ENV ==="production",
      sameSite:"lax",
      maxAge:0,
      path:"/",
    })
    res.json({success:true})
}

/**
 * Returns the authenticated user's account without its password.
 *
 * @param {import("express").Request} req The authenticated request.
 * @param {import("express").Response} res The response used to return the account.
 * @returns {Promise<void>}
 */
export async function me(req, res) {
  if(!req.user){
    res.status(401).json({error:"Not authenticated"})
    return;
  }
  const user = await User.findById(req.user.userId).select("-password");
  if(!user){
    res.status(404).json({error:"User not found"});
    return;
  }
  res.json({user})
}
