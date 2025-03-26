const { BadRequestError } = require('../core/error.response');
const { sheets, sheetId } = require("../configs/ggSheet");
const { v4: uuidv4 } = require("uuid");

// async function findFirstEmptyRow() {
//   const range = "Users!A:A";
//   const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: sheetId,
//       range,
//   });

//   const rows = response.data.values;
//   return rows ? rows.length + 1 : 2;
// }
exports.createUser = async (req, res, next) => {
    const newId = uuidv4();
    // const emptyRow = await findFirstEmptyRow();
    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        // range: `Users!A${emptyRow}:D${emptyRow}`,
        range: `Users!A:D`,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [newId ,req.body.mssv, req.body.name, req.body.phone]
            ]
        }
    });
    return res.status(201).json({
        success: true,
        message: "User created successfully"
    });
}
async function getUsers (req, res, next) {
    const range = "Users!A2:D"; 
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });
    const rows = response.data.values;
    if (!rows.length) {
      console.log("Không có dữ liệu!");
      return [];
    }
  
    return rows.map((row) => ({
      id: row[0],
      mssv: row[1],
      name: row[2],
      phone: row[3],
    }));
  }
  
exports.getUserDetails = async (req, res, next) => {
    console.log("test:::", req.params.mssv);
    const users = await getUsers();
    console.log(users);
    const findUser = users.filter((user) => user.mssv === req.params.mssv);
    console.log("findUser:::", findUser);
    return res.status(201).json({
      success: true,
      message: "User find successfully",
      user: findUser[0]
  });
}