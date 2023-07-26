const redisDB = require("redis");
const redisClient = redisDB.createClient();
console.log("rediiiis");
// @TODO uncomment
redisClient.connect();
redisClient.on("connect", () => console.log("connected to redis :)"));
redisClient.on("error", (err) => console.log(`redis error: :( ${err.message}`));
redisClient.on("ready", () => console.log("redis is ready :)) "));
redisClient.on("end", () => console.log("disconnected from redis.. "));

module.exports = redisClient;
