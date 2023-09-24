import jwt from "jsonwebtoken"

export const verifyUser = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ error: "No token found in cookie." })
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ error: "Invalid token." })
      } else {
        req.tokenInfo = decoded.tokenInfo
        next()
      }
    })
  }
}
