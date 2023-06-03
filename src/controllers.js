const { Person } = require("./models/person");
const { snakeCase } = require("snake-case");
const axios = require("axios");
const { sanitizePerson } = require("./utils/utils");
const { LGA } = require("./models/lga");
const { sanitizeState, sanitizeLGA } = require("./utils/utils");
const { State } = require("./models/state");

const createPerson = async (req, res) => {
  let {
    nin,
    firstName,
    lastName,
    address,
    middleName,
    gender,
    password,
    imageUrl,
    state,
    lga,
  } = req.body;

  if (
    !nin ||
    !firstName ||
    !lastName ||
    !address ||
    !gender ||
    !password ||
    !imageUrl ||
    !state ||
    !lga
  )
    return res.status(400).send({
      status: "Failed",
      message: "All necessary details must be provided",
    });

  state = snakeCase(state);
  lga = snakeCase(lga);

  let searchedState;
  try {
    searchedState = await State.findById(state);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }

  if (!searchedState)
    return res.status(404).send({
      status: "Failed",
      message: "State does not exist",
    });

  let searchedLga;
  try {
    searchedLga = await LGA.findById(lga);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }

  if (!searchedLga)
    return res.status(404).send({
      status: "Failed",
      message: "LGA does not exist",
    });

  let person = new Person({
    nin,
    firstName,
    lastName,
    middleName: middleName || "",
    gender,
    address,
    password,
    imageUrl,
    stateOfOrigin: state,
    lgaOfOrigin: lga,
  });

  try {
    await person.save();
    return res.status(201).send({
      status: "Successful",
      message: "Person created successfully",
      nin: nin,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }
};

const getPerson = async (req, res) => {
  let { nin, password } = req.body;

  if (!nin || !password)
    return res.status(400).send({
      status: "Failed",
      message: "All necessary details must be provided",
    });

  let person;
  try {
    person = await Person.findOne({ nin });
  } catch (e) {
    console.log(e);
  }

  if (person && person.password === password) {
    return res.status(200).send({
      status: "Successful",
      person: sanitizePerson(person),
    });
  } else {
    return res.status(404).send({
      status: "Failed",
      message: "This NIN and password combination does not exist",
    });
  }
};

const createState = async (req, res) => {
  let { name } = req.body;

  if (!name)
    return res.status(400).send({
      status: "Failed",
      message: "All necessary details must be provided",
    });

  name = snakeCase(name);

  let state = new State({
    name,
  });

  try {
    await state.save();
    return res.status(201).send({
      status: "Successful",
      message: "State created successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

const createStates = async (req, res) => {
  let { names } = req.body;

  if (!names)
    return res.status(400).send({
      status: "Failed",
      message: "All necessary details must be provided",
    });

  const stateSavePromises = names.map((name) => {
    name = snakeCase(name);
    let state = new State({
      name,
    });
    return state.save();
  });

  try {
    await Promise.all(stateSavePromises);
    return res.status(201).send({
      status: "Successful",
      message: "States created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }
};

const getState = async (req, res) => {
  let { state } = req.params;

  if (!state)
    return res.status(404).send({
      status: "Failed",
      message: "State does not exist",
    });

  state = snakeCase(state);

  let searchedState;
  try {
    searchedState = await State.findOne({ name: state });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }

  if (!searchedState)
    return res.status(404).send({
      status: "Failed",
      message: "State does not exist",
    });

  res.status(200).send({
    status: "Success",
    state: sanitizeState(searchedState),
  });
};

const createLGA = async (req, res) => {
  let { name, stateId } = req.body;

  if (!name || !stateId)
    return res.status(400).send({
      status: "Failed",
      message: "All necessary details must be provided",
    });

  name = snakeCase(name);

  let searchedState;
  try {
    searchedState = await State.findById(stateId);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }

  if (!searchedState)
    return res.status(404).send({
      status: "Failed",
      message: "State does not exist",
    });

  let lga = new LGA({
    name,
    state: searchedState.id,
  });

  try {
    await lga.save();
    return res.status(201).send({
      status: "Successful",
      message: "LGA created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }
};

const createLGAs = async (req, res) => {
  let { lgas, stateId } = req.body;

  if (!lgas || !stateId)
    return res.status(400).send({
      status: "Failed",
      message: "All necessary details must be provided",
    });

  let state;
  try {
    state = await State.findById(stateId);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }

  if (!state)
    return res.status(404).send({
      status: "Failed",
      message: "State does not exist",
    });

  const lgasSavePromises = lgas.map((lga) => {
    lga = snakeCase(lga);
    lga = new LGA({
      name: lga,
      state: stateId,
    });
    state.lgas.push(lga.id);
    return lga.save();
  });

  try {
    await Promise.all(lgasSavePromises);
    await state.save();
    return res.status(201).send({
      status: "Successful",
      message: "LGAs created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }
};

const getLGA = async (req, res) => {
  let { lga } = req.params;

  if (!lga)
    return res.status(404).send({
      status: "Failed",
      message: "LGA does not exist",
    });

  lga = snakeCase(lga);

  let searchedLga;
  try {
    searchedLga = await LGA.findOne({ name: lga });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong. Please try again",
    });
  }

  if (!searchedLga)
    return res.status(404).send({
      status: "Failed",
      message: "LGA does not exist",
    });

  res.status(200).send({
    status: "Success",
    state: sanitizeLGA(searchedLga),
  });
};

module.exports = {
  createPerson,
  getPerson,
  createState,
  createStates,
  createLGA,
  createLGAs,
  getState,
  getLGA,
};
