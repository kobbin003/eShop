import app from "./app.js";
import color from "colors";
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`app listening on port no. ${PORT}`.yellow.bold);
  console.log(`MODE: ${process.env.NODE_ENV}`.blue.bgGreen);
});
