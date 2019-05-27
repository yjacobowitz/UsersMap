require("isomorphic-fetch");
const URL = "http://13.69.54.84:9000/users";

module.exports = callback =>
  fetch(URL)
    .then(res => res.json())
    .then(callback)
    .catch(error => {
      console.error(`GET ${URL}, Failed, ${error}`);
    });
