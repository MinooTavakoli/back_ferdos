const createError = require("http-errors");
const { UserModel } = require("../../models/users");
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");

function VerifyAccessToken(req, res, next) {
  const headers = req.headers;
  const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
  if (token && bearer?.toLowerCase() === "bearer") {
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        return next(createError.Unauthorized("لطفا وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"));
      req.user = user;
      return next();
    });
  } else
    return next(createError.Unauthorized("لطفا وارد حساب کاربری خود شوید"));
}

module.exports = {
  VerifyAccessToken,
};
