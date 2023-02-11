const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// routes //
const authenticationroutes = require("./src/routes/authentication/authenticationroutes");
const eventroutes = require("./src/routes/Events/eventroutes");
const companyroutes = require("./src/routes/Companies/companyroutes");
// express app //
const app = express();
const port = 3001;
// mondo db connection //
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1/eventmanagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// body parser middleware //
app.use(bodyParser.json());
// routes //
app.use(cors());
app.use("/", authenticationroutes);
app.use("/", eventroutes);
app.use("/", companyroutes);
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
