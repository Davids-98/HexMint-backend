require('dotenv').config();
const UserModel = require('../HexMint-backend/models/UserModel');
const UserStatusModel = require('../HexMint-backend/models/UserStatusModel');
const AdminEditRequestsModel = require('../HexMint-backend/models/AdminEditRequestModel');
const FixedListingModel = require('../HexMint-backend/models/FixedListingModel');
const ActivityDetailsModel = require('../HexMint-backend/models/ActivityDetailsModel');
const ActivityModel = require('../HexMint-backend/models/ActivityModel');
const AdminStatusModel = require('../HexMint-backend/models/AdminStatusModel');
const AdminUpdatingDetailsModel = require('../HexMint-backend/models/AdminUpdatingDetailsModel');
const auctionlistingModel = require('../HexMint-backend/models/auctionlistingModel');
const BidModel = require('../HexMint-backend/models/BidModel');
const CollectionModel = require('../HexMint-backend/models/CollectionModel');
const ListingsModel = require('../HexMint-backend/models/ListingsModel');
const NFTModel = require('../HexMint-backend/models/NFTModel');
const ReportModel = require('../HexMint-backend/models/ReportModel');
const AdminDetailsModel = require('../HexMint-backend/models/AdminDetailsModel');

const express = require('express');

//import mongoose
const mongoose = require('mongoose');

//express app
const app = express();


//middleware
app.use(express.json());

//Connecting to database
mongoose.connect(process.env.MONG_URI)
   .then(() => {
        app.listen(PORT, () => {
        console.log('Connected to DB and Listening on port',process.env.PORT);
    });
   })
   .catch((err) => console.log(err));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//listen for request

const PORT = process.env.PORT;


//Route(Respond to the Request)
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app!'})
});



