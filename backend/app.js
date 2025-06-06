require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const PORT = process.env.PORT || 5050;
const expressLayouts = require("express-ejs-layouts"); //consider using later

//custom middleware
const errorHandler = require("./middleware/errorHandler");

// ---3RD PARTY MIDDLEWARE---

//set multer storage
const upload = require("./middleware/upload"); //DEFINITELY USE LATER🚧

//set helmet
app.use(helmet()); //using default security

//set morgan
app.use(morgan("common")); //just a quality of life logger for server requests

//set cors
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

//  Native Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses incoming form data
app.use(express.static("./public"));

//ROUTERS
const userRoutes = require("./routes/userRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");
//implementing routes
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes); 

//ROOT get request + view
app.get("/", (req, res) => {
  res.send("DEVLINK API ROOT ENDPOINT");
});

//test
app.get("/test-error", (req, res) => {
  throw new Error("Intentional failure");
});
// Connect to Database + Start Server
mongoose
  .connect(process.env.ATLAS_URI, {
    family: 4, //I needed this for me, change later depending on IP
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

//error handling

app.use(errorHandler);

//exports
