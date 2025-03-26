const app = require("./app");
const connectDatabase = require("./configs/mongodb");

connectDatabase();

const server = app.listen(3000, () => {
    console.log(`Server started on PORT: 3000`);
});