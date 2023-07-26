const Joi = require("@hapi/joi");
const getOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره موبایل وارد شده نادرست است")),

  //   email: Joi.string()
  //     .lowercase()
  //     .trim()
  //     .email()
  //     .required()
  //     .error(new Error("ایمیل وارد شده صحیح نمی‌باشد")),
  //   password: Joi.string()
  //     .min(6)
  //     .max(16)
  //     .trim()
  //     .required()
  //     .error(new Error("پسورد انتخاب شده باید بین 6 الی 16 کاراکتر باشد")),
});

const checkOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره موبایل وارد شده نادرست است")),
  code: Joi.string().min(4).max(6).error(new Error("کد وارد شده نادرست است")),
});

module.exports = {
  getOtpSchema,
  checkOtpSchema,
};
