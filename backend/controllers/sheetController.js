const { BadRequestError } = require('../core/error.response');
const { sheets, sheetId, drive } = require("../configs/ggSheet");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');



async function uploadFileToDrive(filePath, fileName, mimeType) {
  console.log("uploadFileToDrive:::", uploadFileToDrive);
  const fileMetadata = {
    name: fileName ,
    parents: ['1WPIdTp2sMP82So6SyDUTEb9Q2F0_V_02'] 
  };
  const media = {
    mimeType,
    body: fs.createReadStream(filePath)
  };

  // Tạo file trên Google Drive
  const fileResponse = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id'
  });
  console.log("fileResponse:::", fileResponse);
  const fileId = fileResponse.data.id;

  // Thiết lập quyền truy cập công khai
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone'
    }
  });

  // Tạo link truy cập công khai cho file
  const publicUrl = `https://drive.google.com/uc?id=${fileId}`;
  return publicUrl;
}

exports.createUser = async (req, res, next) => {
    const newId = uuidv4();
    let imageLinks = [];
    console.log("req.files:::", req.files);
    console.log("req.body:::", req.body);

    // Nếu có file hình ảnh được upload
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const { path: filePath, originalname: fileName, mimetype } = file;
        const link = await uploadFileToDrive(filePath, fileName, mimetype);

        imageLinks.push(link);
        // Xóa file tạm sau khi upload
        fs.unlinkSync(filePath);
      }
    }
    const imageLinksStr = imageLinks.join(', ');
    console.log("imageLinksStr:::", imageLinksStr);
    // const emptyRow = await findFirstEmptyRow();
    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        // range: `Users!A${emptyRow}:D${emptyRow}`,
        range: `Users!A:D`,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [newId ,req.body.mssv, req.body.name, req.body.phone, imageLinksStr]
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
    const findUser = users.find((user) => user.mssv === req.params.mssv);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    console.log("findUser:::", findUser);
    return res.status(201).json({
      success: true,
      message: "User find successfully",
      user: findUser
  });
}