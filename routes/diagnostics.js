const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile(`./db/diagnostics.json`).then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log(req.body);

  const { tip, topic, username } = req.body;

  if (req.body) {
    const newDiagnostic = {
      time,
      error_id: uuidv4(),
      tip,
      topic,
      username,
    };

    readAndAppend(newDiagnostic, `./db/diagnostics.json`);
    res.json(`Diagnostic report added successfully.`);
  } else {
    res.error(`Error in adding diagnostic report.`);
  }
});

module.exports = diagnostics;
