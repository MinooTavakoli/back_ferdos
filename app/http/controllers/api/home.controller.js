const { getOtpSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");
const createError = require("http-errors");

module.exports = new (class HomeController extends Controller {
   indexPage(req, res, next) {
    try {
      // const result = await getOtpSchema.validateAsync(req.body);
      return res.status(200).send("Index Page Ferdos");
    } catch (error) {
      // next(createError.BadRequest(error.message));
      next(error);
    }
  }
})();
