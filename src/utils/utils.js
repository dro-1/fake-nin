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

module.exports = {
  sanitizePerson,
};
