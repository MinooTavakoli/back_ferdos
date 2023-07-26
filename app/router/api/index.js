const homeController = require("../../http/controllers/api/home.controller");
const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: Public
 *  description: Public routes
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [Public]
 *      description: get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Not Found
 */

router.get("/", VerifyAccessToken, homeController.indexPage);
module.exports = {
  HomeRoutes: router,
};
