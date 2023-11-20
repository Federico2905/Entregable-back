import app from "./server";
import mongoose from "mongoose";
const port = 5000;

mongoose
  .connect("mongodb+srv://fedegarcia2905:29052006@cluster0.zw4bzu9.mongodb.net/")
  .catch((error) => {
    console.log("The following error has occured:", error);
  })
  .then(() => console.log("Succesfully connected to the database"));

app.listen(port, () => {
  console.log(`Server initiated at http://localhost:${port}`);
});
