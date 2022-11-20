const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const handleLogin = async (walletaddress, usertype) => {
  try {
    const token = jwt.sign(
      { walletaddress: walletaddress, usertype: usertype },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return {
      status: 200,
      message: "Succesfull!",
      token: token,
    };
  } catch (err) {
    return {
      status: 500,
      message: err,
    };
  }
};

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      }

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
  const { walletaddress } = req.body;

  try {
    const user = await UserModel.findOne({
      walletaddress: walletaddress["address"],
    });

    let userType_JWT;

    if (user) {
      userType_JWT = user.usertype;
    } else {
      userType_JWT = "Customer";
      const newUser = await UserModel.create({
        walletaddress: walletaddress["address"],
        usertype: "Customer",
        name: "Customer",
        username: "Customer",
        propic: null,
      });
    }

    const JWTData = await handleLogin(walletaddress["address"], userType_JWT);

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
