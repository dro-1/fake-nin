require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const personController = require("./controllers/personController");
const middlewares = require("./middleware/middlewares");
const dbConnector = require("./utils/db");

const app = express();

app.use(cors());
app.use(express.json());

app.post(
  "/createPerson",
  middlewares.checkTokens,
  personController.createPerson
);

app.post("/getPerson", middlewares.checkTokens, personController.getPerson);

const PORT = process.env.PORT || 8081;

dbConnector(() => {
  app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
  });
});
