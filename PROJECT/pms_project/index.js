const express = require("express");
const { google } = require("googleapis");

const app = express();
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send ("Port is working")
});

app.get("/sheet", async (req, res) => {

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1BnPM9Kw9PjzNimAfSa3TtylCwrR4wKYCftNdz6ZaVp0";

  // Get metadata about spreadsheet
  // const metaData = await googleSheets.spreadsheets.get({
  //   auth,
  //   spreadsheetId,
  // });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });
  const getRows2 = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet2!A:B",
  });

  console.log(getRows.data.values);
  console.log(getRows2.data.values);


  res.send("Successfully submitted! Thank you!");
});

app.listen(1337, (req, res) => console.log("running on 1337"));
