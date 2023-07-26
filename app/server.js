const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

module.exports = class Applicaion {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    // @TODO uncomment
    // this.initRedis();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            info: {
              title: "Ferdos",
              version: "1.0.0",
              description: "Ferdos Gallery",
              contact: {
                name: "Minoo Tavakoli",
                email: "minootavakoli28@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:5000",
              },
            ],
          },
          apis: ["./app/router/*/*.js"],
        })
      )
    );
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(`run > http://localhost:${this.#PORT}`);
    });
  }
  connectToMongoDB() {
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("connected to mongooDB");
      return console.log("faild to connect to MongoDB");
    });
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DBBB.. :)");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("monggose connection is disconnected!! :(");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected...");
      process.exit(0);
    });
  }
  // @TODO uncomment
  // initRedis() {
  //   require("./utils/init_redis");
  // }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("صفحه مورد نظر شما یافت نشد"));
    });
    this.#app.use((err, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = err.status || serverError.status;
      const message = err.message || serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
