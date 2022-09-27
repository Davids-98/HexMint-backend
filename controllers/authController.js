


const UserModel = require("../models/UserModel");

const handleConnectWallet = async (req, res) => {
    console.log("handle connect wallet calling ")
    const { walletaddress } = req.body;
    console.log("wallet address", walletaddress['address']);

    //Add the customer into the db if the customer is a new customer

    // try{
    //     const checkUser = await UserModel.find({ walletaddress: walletaddress['address'] }).count();
    //     console.log("check user", checkUser);
    //     if (checkUser == 0) {
    //         const newCustomer = new UserModel({
    //             walletaddress: walletaddress['address'],
    //             usertype: "Customer",
    //             name: "Customer",
    //             username: "Customer",
    //             propic: null
    //         });
    //         await newCustomer.save();
    //         return res.status(200).json({ "message": "New user created" });
    //         // console.log(res)
    //     }else{
    //         const user = await UserModel.findOne({ walletaddress: walletaddress['address']}, {usertype : 1})
    //         console.log(user)

    //         if (user?.usertype == 'Admin'){
    //             console(getUserType)

    //             return res.status(200).json({userType : 'Admin'})
    //         }
    //     }
    // }  catch(error){
    //     console.log("error :",error)
    //     return res.status(400).json({ error: error.message });
    
    // }

    try {
        const user = await UserModel.findOne({ walletaddress: walletaddress['address'] })

        if(user){
           return res.status(200).json({
            "message":"success",
            "userType":user.usertype
           }) 
        }else{
            // const customer = new UserModel({
            //                 walletaddress: walletaddress['address'],
            //                 usertype: "Customer",
            //                 name: "Customer",
            //                 username: "Customer",
            //                 propic: null
            //             });
            const newUser = await UserModel.create({
                walletaddress: walletaddress['address'],
                usertype: "Customer",
                name: "Customer",
                username: "Customer",
                propic: null
            });
            return res.status(201).json({
                    
                "userType":newUser.usertype 
            });
        }

        
    }catch(err){
        return res.status(500).json({
            "message":"error"
        })
    }

}

const handleConnect =async(req,res)=>{
    return res.json({
        "message":"hello world"
    })
}
module.exports = {
    handleConnectWallet,
    handleConnect
}

