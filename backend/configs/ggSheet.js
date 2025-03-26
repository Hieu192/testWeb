
const { google } = require("googleapis");
const credentials = require("../configKeyGGSheet.json");


const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

const sheetId = "1bNZM6Z4U0yc0C8KsQyFXevrdZqkgvvrPgWgsDedBkk0";
const sheets = google.sheets({ version: "v4", auth });

module.exports = { sheets, sheetId };