import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";
import User from "../models/userModel.js";

export async function generateAccessAndRefreshTokens(userId) {
  try {
    let user = await User.findById(userId);
    const accessToken = jwt.sign(
      { userId: userId },
      CONFIG.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { userId: userId },
      CONFIG.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    user.refreshToken = refreshToken;
    // store refresh token in the user document
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization token missing." });
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Access Denied. Authorization token missing." });
    }
    var decodedPayload = jwt.verify(accessToken, CONFIG.ACCESS_TOKEN_SECRET);
    req.payload = decodedPayload;
    next();
  } catch (error) {
    // If token is expired, generate new access and refresh token
    if (error.name === "TokenExpiredError") {
      try {
        let { newAccessToken, newRefreshToken } = await generateNewTokens(req);

        var decodedPayload = jwt.verify(
          newAccessToken,
          CONFIG.ACCESS_TOKEN_SECRET
        );
        req.payload = decodedPayload;

        // update cookie and authorization header
        res
          .cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          })
          .set("Authorization", newAccessToken);

        // continue with user request
        next();
      } catch (error) {
        return res.status(401).json({ message: error.message });
      }
    } else {
      return res.status(401).json({ message: error.message });
    }
  }
}

// Returns new access and refresh tokens
export async function generateNewTokens(req) {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new Error("Refresh token missing.");
  }
  try {
    const decodedToken = jwt.verify(refreshToken, CONFIG.REFRESH_TOKEN_SECRET);

    if (!decodedToken) {
      throw new Error("Invalid refresh token.");
    }

    // find user for the refresh token and check its validity
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error("User not found.");
    }
    if (user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token.");
    }

    // generate new access and refresh token
    let result = await generateAccessAndRefreshTokens(user._id.toString());
    let newAccessToken = result.accessToken;
    let newRefreshToken = result.refreshToken;
    return { newAccessToken, newRefreshToken };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Refresh token is also expired.");
      throw error;
    } else {
      throw error;
    }
  }
}

export async function refreshTokens(req, res) {
  try {
    let { newAccessToken, newRefreshToken } = await generateNewTokens(req);
    return res
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .header("Authorization", newAccessToken)
      .status(200)
      .json({ message: "Token refreshed", token: newAccessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
