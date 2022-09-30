require("dotenv").config();
const UserModel = require("../HexMint-backend/models/UserModel");
const UserStatusModel = require("../HexMint-backend/models/UserStatusModel");
const AdminEditRequestsModel = require("../HexMint-backend/models/AdminEditRequestModel");
const FixedListingModel = require("../HexMint-backend/models/FixedListingModel");
const ActivityDetailsModel = require("../HexMint-backend/models/ActivityDetailsModel");
const ActivityModel = require("../HexMint-backend/models/ActivityModel");
const AdminStatusModel = require("../HexMint-backend/models/AdminStatusModel");
const AdminUpdatingDetailsModel = require("../HexMint-backend/models/AdminUpdatingDetailsModel");
const auctionlistingModel = require("../HexMint-backend/models/auctionlistingModel");
const BidModel = require("../HexMint-backend/models/BidModel");
const CollectionModel = require("../HexMint-backend/models/CollectionModel");
const ListingsModel = require("../HexMint-backend/models/ListingsModel");
const NFTModel = require("../HexMint-backend/models/NFTModel");
const ReportModel = require("../HexMint-backend/models/ReportModel");
const AdminDetailsModel = require("../HexMint-backend/models/AdminDetailsModel");

const express = require("express");

const bodyParser = require("body-parser");

//midlewaee
const cors = require("cors");

//import mongoose
const mongoose = require("mongoose");

//express app
const app = express();

app.use(bodyParser.json());

//middleware
app.use(express.json());
app.use(cors());

//Connecting to database
const PORT = process.env.PORT;

// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

//listen for request

//Route(Respond to the Request)
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app!" });
});

// listner
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to DB and Listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
