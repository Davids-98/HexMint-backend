require("dotenv").config();
const UserModel = require("./models/UserModel");
const UserStatusModel = require("./models/UserStatusModel");
// const AdminEditRequestsModel = require("../HexMint-backend/models/AdminEditRequestModel");
const FixedListingModel = require("./models/FixedListingModel");
const ActivityDetailsModel = require("./models/ActivityDetailsModel");
const ActivityModel = require("./models/ActivityModel");
const AdminStatusModel = require("./models/AdminStatusModel");
const AdminUpdatingDetailsModel = require("./models/AdminUpdatingDetailsModel");

const AuctionlistingModel = require("./models/AuctionListingModel");

const BidModel = require("./models/BidModel");
const CollectionModel = require("./models/CollectionModel");
const CollectionOwner = require("./models/CollectionOwnerModel");
const ListingsModel = require("./models/ListingsModel");
const NFTModel = require("./models/NFTModel");
const ReportModel = require("./models/ReportModel");
const AdminDetailsModel = require("./models/AdminDetailsModel");

const express = require("express");

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

//midleware

const cors = require("cors");

const multer = require("multer");

//import mongoose
const mongoose = require("mongoose");

//express app
// const app = express()
// app.use(express.json())

// app.use(bodyParser.json());

// //middleware
// app.use(express.json());
// app.use(cors());

const app = require("./app");

//express app
const db = require("./db_connections");
//Connecting to database
const PORT = process.env.PORT || 1377;

// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

//listen for request

//Route(Respond to the Request)

// app.use("/auth", require("./routes/auth"));
// app.use("/user", require("./routes/user"));
// app.use("/customer", multer().array(), require("./routes/customer"));
// app.use("/admin", multer().array(), require("./routes/admin"));

// listner
db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to DB and Listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
