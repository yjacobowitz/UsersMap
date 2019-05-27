require("isomorphic-fetch");
const URL = "http://13.69.54.84:9000/users";

module.exports = (payload, callback) =>
  fetch(URL, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(callback)
    .catch(error => {
      console.error(`POST ${URL}, Failed, ${error}`);
    });
