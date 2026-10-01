import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

// Helper to set authentication cookie
const setSessionCookie = (res, payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

/**
 * Registers a user, starts their session, and returns the created account.
 */
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.toLowerCase().trim();

    if (!trimmedName) {
      return res.status(400).json({
        error: "Name is required",
      });
    }

    if (!trimmedEmail) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({
      email: trimmedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        error: "An account with this email already exists",
      });
    }

    const user = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password,
    });

    setSessionCookie(res, {
      userId: user._id.toString(),
      email: user.email,
    });

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[Auth Register Error]", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "An account with this email already exists",
      });
    }

    return res.status(500).json({
      error: "Failed to create account",
    });
  }
}

/**
 * Authenticates a user, starts their session, and returns their account.
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const trimmedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: trimmedEmail,
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    setSessionCookie(res, {
      userId: user._id.toString(),
      email: user.email,
    });

    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[Auth Login Error]", error);

    return res.status(500).json({
      error: "Failed to log in",
    });
  }
}

/**
 * Clears the current user's session cookie.
 */
export async function logout(_req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 0,
    path: "/",
  });

  return res.status(200).json({
    success: true,
  });
}

/**
 * Returns the authenticated user's account without their password.
 */
export async function me(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("[Auth Me Error]", error);

    return res.status(500).json({
      error: "Failed to load user session",
    });
  }
}