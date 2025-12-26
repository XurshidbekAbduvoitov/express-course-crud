const express = require("express");
const app = express();
const uuid = require("uuid");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();



app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3000;
// Routerni ulash
app.use("/", require("./Routers/userRouters"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});