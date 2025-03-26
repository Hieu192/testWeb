
const { google } = require("googleapis");
const credentials = require("../configKeyGGSheet.json");



const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

const sheetId = process.env.SHEET_ID;
const sheets = google.sheets({ version: "v4", auth });

module.exports = { sheets, sheetId };