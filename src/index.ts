import app from "./server";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString)
  .catch((error) => {
    console.log("The following error has occured:", error);
  })
  .then(() => console.log("Succesfully connected to the database"));

app.listen(port, () => {
  console.log(`Server initiated at http://localhost:${port}`);
});
