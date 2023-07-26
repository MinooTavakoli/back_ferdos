// const redisClient = require("../utils/init_redis");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");

// @TODO uncomment
// (async () => {
//   await redisClient.set("key", "value");
//   const value = await redisClient.get("key");
//   console.log(value);
// })();

////////// کامنت بماند
// redisClient.set("key", "value", (err, reply) => {
//   if (err) console.log(err.message);
//   console.log(reply);
// });
// redisClient.get("key", (err, value) => {
//   if (err) console.log(err.message);
//   console.log(value);
// });

const router = require("express").Router();
router.use("/user", UserAuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/", HomeRoutes);

module.exports = {
  AllRoutes: router,
};
