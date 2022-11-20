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

const app = require("./app");

//express app
const db = require("./db_connections");
//Connecting to database
const PORT = process.env.PORT || 1377;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to DB and Listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
