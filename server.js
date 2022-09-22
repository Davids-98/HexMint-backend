require('dotenv').config();

const express = require('express');

//express app
const app = express();

//middleware
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


app.listen(PORT, () => {
    console.log('Listening on port',process.env.PORT);
});
