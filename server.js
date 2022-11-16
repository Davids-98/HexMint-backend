require("dotenv").config();
const UserModel = require("../HexMint-backend/models/UserModel");
const UserStatusModel = require("../HexMint-backend/models/UserStatusModel");
// const AdminEditRequestsModel = require("../HexMint-backend/models/AdminEditRequestModel");
const FixedListingModel = require("../HexMint-backend/models/FixedListingModel");
const ActivityDetailsModel = require("../HexMint-backend/models/ActivityDetailsModel");
const ActivityModel = require("../HexMint-backend/models/ActivityModel");
const AdminStatusModel = require("../HexMint-backend/models/AdminStatusModel");
const AdminUpdatingDetailsModel = require("../HexMint-backend/models/AdminUpdatingDetailsModel");

const AuctionlistingModel = require("../HexMint-backend/models/AuctionListingModel");

const BidModel = require("../HexMint-backend/models/BidModel");
const CollectionModel = require("../HexMint-backend/models/CollectionModel");
const CollectionOwner = require("../HexMint-backend/models/CollectionOwnerModel");
const ListingsModel = require("../HexMint-backend/models/ListingsModel");
const NFTModel = require("../HexMint-backend/models/NFTModel");
const ReportModel = require("../HexMint-backend/models/ReportModel");
const AdminDetailsModel = require("../HexMint-backend/models/AdminDetailsModel");



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
const PORT = process.env.PORT || 5000;

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
