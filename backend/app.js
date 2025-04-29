require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5050;
const expressLayouts = require("express-ejs-layouts");

//  Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//views
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use(expressLayouts);
app.set("view engine", "ejs");

//ROUTERS
const userRoutes = require("./routes/userRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const commentRoutes = require("./routes/commentRoutes");
//implementing routes
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/comments", commentRoutes);
//ROOT get request + view
app.get("/", (req, res) => {
  res.render("index");
});
// Connect to Database + Start Server
mongoose
  .connect(process.env.ATLAS_URI, {
    family: 4, //I needed this for me
  })
  .then(() => {
    console.log(`Connected to database DevLink`);
    app.listen(PORT, () => {
      console.log(`Connected to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to database DevLink`);
  });
