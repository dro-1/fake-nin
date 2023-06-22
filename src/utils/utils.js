const sanitizePerson = (person) => ({
  firstName: person.firstName,
  lastName: person.lastName,
  nin: person.nin,
  middleName: person.middleName,
  gender: person.gender,
  address: person.address,
  imageUrl: person.imageUrl,
  stateOfOrigin: person.stateOfOrigin,
  lgaOfOrigin: person.lgaOfOrigin,
});

const sanitizeState = (state) => ({
  name: state.name,
  lgas: state.lgas,
});

const sanitizePopulatedState = (state) => ({
  name: state.name,
  lgas: state.lgas.map(sanitizeLGA),
});

const sanitizeLGA = (lga) => ({
  name: lga.name,
  state: lga.state,
});

module.exports = {
  sanitizePerson,
  sanitizeState,
  sanitizeLGA,
  sanitizePopulatedState,
};
