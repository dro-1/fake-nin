require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const controllers = require("./controllers");
const middlewares = require("./middleware/middlewares");
const dbConnector = require("./utils/db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/createPerson", middlewares.checkTokens, controllers.createPerson);

app.post("/getPerson", middlewares.checkTokens, controllers.getPerson);

app.post("/state", middlewares.checkTokens, controllers.createState);

app.post("/states", middlewares.checkTokens, controllers.createStates);

app.get("/state/:state", middlewares.checkTokens, controllers.getState);

app.get("/states", middlewares.checkTokens, controllers.getStates);

app.post("/lga", middlewares.checkTokens, controllers.createLGA);

app.post("/lgas", middlewares.checkTokens, controllers.createLGAs);

app.get("/lga/:lga", middlewares.checkTokens, controllers.getLGA);

const PORT = process.env.PORT || 8081;

dbConnector(() => {
  app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
  });
});
