import { unAuthResp, errResp } from "../utils/http.js";
import { verifyToken } from "../utils/token.js";

export async function auth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader !== "") {
      const bearer = authHeader.split(" ");
      const token = bearer[1];

      const payload = verifyToken(token);
      req.user = payload;

      return next();
    }

    return errResp(401, { message: "Unauthorized" }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function isMember(req, res, next) {
  if (req.user.type && req.user.type === "member") {
    return next();
  }

  return unAuthResp(res);
}

export async function isAdmin(req, res, next) {
  if (req.user.type && req.user.type === "admin") {
    return next();
  }

  return unAuthResp(res);
}
