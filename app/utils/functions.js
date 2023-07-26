const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constants");
// @TODO uncomment
// const redisClient = require("./init_redis");

function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}

function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      //   userID: user._id,
    };
    const secret = ACCESS_TOKEN_SECRET_KEY;
    const options = {
      expiresIn: "1h",
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err)
        reject(createError.InternalServerError("خطای سمت سرور رخ داده است"));
      resolve(token);
    });
  });
}

function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const secret = REFRESH_TOKEN_SECRET_KEY;
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, secret, options, async (err, token) => {
      if (err)
        reject(createError.InternalServerError("خطای سمت سرور رخ داده است"));
      // @TODO uncomment
      // await redisClient.SETEX(userId, 365 * 24 * 60 * 60, token);
      resolve(token);
    });
  });
}

function VerifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        reject(createError.Unauthorized("لطفا وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
      // @TODO uncomment
      // const refreshToken = await redisClient.get(user._id);
      // if (token === refreshToken) return resolve(mobile);
      reject(
        createError.Unauthorized("ورود مجدد به حساب کاربری با خطا مواجه شد")
      );
    });
  });
}

module.exports = {
  randomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
};
