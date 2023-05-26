const Person = require("../models/person");
const axios = require("axios");
const { sanitizePerson } = require("../utils/utils");

const createPerson = async (req, res) => {
  const {
    nin,
    firstName,
    lastName,
    address,
    middleName,
    gender,
    password,
    imageUrl,
  } = req.body;

  if (
    !nin ||
    !firstName ||
    !lastName ||
    !address ||
    !gender ||
    !password ||
    !imageUrl
  )
    return res.status(400).send({
      status: "Failed",
      message: "All necessary details must be provided",
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
  }
};

const getPerson = async (req, res) => {
  const { nin, password } = req.body;

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

module.exports = {
  createPerson,
  getPerson,
};
