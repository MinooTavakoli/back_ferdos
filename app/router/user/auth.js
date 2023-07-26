const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: user auth section
 */
/**
 * @swagger
 *    /user/get-otp:
 *        post:
 *            summary: login user in userpanel with phone number
 *            tags: [Auth]
 *            description: one time password(OTP) login
 *            parameters:
 *            -   name: mobile
 *                description: fa-IRI phonenumber
 *                in: formData
 *                required: true
 *                type: string
 *            responses:
 *                201:
 *                    description: Succes
 *                400:
 *                    description: Bad request
 *                401:
 *                    description: Unauthorization
 *                500:
 *                    description: Internal Server Error
 *
 */
router.post("/get-otp", UserAuthController.getOtp);
/**
 * @swagger
 *    /user/check-otp:
 *        post:
 *            summary: check otp value in user controller
 *            tags: [Auth]
 *            description: check one time password(OTP) with code mobile and expire date
 *            parameters:
 *            -   name: mobile
 *                description: fa-IRI phonenumber
 *                in: formData
 *                required: true
 *                type: string
 *            -   name: code
 *                description: enter sms code received
 *                in: formData
 *                required: true
 *                type: string
 *            responses:
 *                201:
 *                    description: Succes
 *                400:
 *                    description: Bad request
 *                401:
 *                    description: Unauthorization
 *                500:
 *                    description: Internal Server Error
 *
 */
router.post("/check-otp", UserAuthController.checkOtp);
/**
 * @swagger
 *    /user/refresh-token:
 *        post:
 *            summary: send refresh token for get new token and refresh token
 *            tags: [Auth]
 *            description: fresh token
 *            parameters:
 *            -   name: refreshToken
 *                in: body
 *                required: true
 *                type: string
 *            responses:
 *                200:
 *                    description: Succes
 */
router.post("/refresh-token", UserAuthController.refreshToken);
module.exports = {
  UserAuthRoutes: router,
};
