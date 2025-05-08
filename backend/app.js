require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const PORT = process.env.PORT || 5050;
const expressLayouts = require("express-ejs-layouts");

//custom middleware
const errorHandler = require("./middleware/errorHandler");

// ---3RD PARTY MIDDLEWARE---

//set multer engine
const storage = multer.diskStorage({});
export const upload = multer({ storage: storage });

//set morgan
app.use(morgan()); //just a quality of life logger for server requests

//set cors
app.use(
  cors({
    origin: "http://localhost:3000", // replace with the frontend url later 🚧🚧🚧🚧
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
//implementing routes
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/comments", commentRoutes);
//ROOT get request + view
app.get("/", (req, res) => {
  res.send("Welcome to the API");
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
