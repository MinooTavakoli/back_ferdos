const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");
const addCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی نادرست است")),
  parent: Joi.string()
    .allow("")
    .pattern(MongoIDPattern)
    .allow("")
    .error(new Error("شناسه وارد شده نادرست است")),
});

module.exports = {
  addCategorySchema,
};
