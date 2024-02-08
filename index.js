const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const { models } = require("./config/sequelize-config");
const config = require("./config/config");
const allDataRouter = require("./routes/data.routes");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { notfound } = require("./middlewares/notFound.middleware");
app.use("/", allDataRouter);
app.use(notfound);
app.use(errorHandler);
app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
