import app from "./app.js";
// import color from "colors";
// import users from "../data/users.js";
// console.log(users);
const PORT = process.env.PORT || 4000;
console.log("process env port", process.env.PORT);
app.listen(PORT, () => {
  console.log(`app listening on port no. ${PORT}`.yellow.bold);
  console.log(`MODE: ${process.env.NODE_ENV}`.blue.bgGreen);
});
