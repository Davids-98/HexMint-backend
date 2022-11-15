const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const handleLogin = async (walletaddress, usertype) => {
  try{

    console.log("handle login calling ");
    const token = jwt.sign(
      { walletaddress: walletaddress, usertype: usertype },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // const return_token = jwt.decode(get_token);
    
    return ({
      status : 200,
      message: "Succesfull!",
      token: token,
    });
  } catch(err){
    return({
      status : 500,
      message: err,
    });
  }

};

const authenticate = async (req, res, next) => {
  console.log("authenticating");
  try {
    console.log("In authenticating .................", req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      }
      console.log("data", data);
      req.data = data;
      next();
    });
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed",
      status: 401,
    });
  }
};





const handleConnectWallet = async (req, res) => {
  console.log("handle connect wallet calling ")
  const { walletaddress } = req.body;
  console.log("passing data", walletaddress);
  console.log("wallet address", walletaddress);

  try {
    const user = await UserModel.findOne({
      walletaddress: walletaddress['address'],
    });
    console.log("user getted", user);
    console.log("1")
    let userType_JWT;
    console.log("2")
    if (user) {
      userType_JWT = user.usertype;
      console.log("user type", userType_JWT);
    } else {
      userType_JWT = "Customer";
      const newUser = await UserModel.create({
        walletaddress: walletaddress['address'],
        usertype: "Customer",
        name: "Customer",
        username: "Customer",
        propic: null,
      });

    }

    const JWTData = await handleLogin(walletaddress['address'], userType_JWT);

    console.log("JWTData", JWTData);

    return res.status(200).json({
      JWTData: JWTData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
    });
  }
};

module.exports = {
  handleConnectWallet,
  handleLogin,
  authenticate,
};
