const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorsHandling");
const config = require("./config");
const routes = require("./routes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("./mongoConnection");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
    cors({
        origin: config.frontend_url,
    })
);

//access to public folder
app.use(express.static(__dirname + "/public"));

// initial route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to app-store-api application." });
});

// api routes prefix
app.use("/api", routes);

// error handling
app.use(errorHandler);

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Dream team API",
            version: "0.1.0",
            description: "This is the api for the dream team project",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// run server
app.listen(config.port, () => {
    console.log("server launch");
});

module.exports = app;
