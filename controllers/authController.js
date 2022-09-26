
// functions 
// /
    // if (duplicateUser) {
    //     return res.status(409).json({ "message": `User :${user_id} already exists...` });
    // }

const UserModel = require("../models/UserModel");

    // const password = user_id + '@V1pd';
    // console.log("password :", password);
    // try {
    //     const hashedPwd = await bcrypt.hash(password, 10);

    //     const userType = await prisma.UserType.findUnique({
    //         where: {
    //             slug: user_type
    //         }
    //     });

        // if (!userType) {
        //     return res.status(400).json({ "message": `User type does not exist...` });
        // }
        // console.log("user type", userType);


        // const [newAuth, newUser] = await prisma.$transaction([
        //     prisma.Auth.create({
        //         data: {
        //             id: user_id,
        //             password: hashedPwd,
        //             user_type_id: userType.id
        //         },
        //     }),
        //     prisma.User.create({
        //         data: {
        //             user_id: user_id,
        //         }
        //     })
        // ])


//         console.log("new auth", newAuth);
//         console.log("new user", newUser);

//         res.status(201).json({ 'message': `new user ${user_id} created ...!` });

//     // } catch (error) {
//     //     console.log(error.message);
//     //     res.status(500).json({ "message": "Internal server error" });
//     // }
// }

const handleConnectWallet = async (req, res) => {
    const { walletaddress } = req.body;
    console.log("wallet address", walletaddress['address']);

    //Add the customer into the db if the customer is a new customer
    try{
    const checkUser = await UserModel.find({ walletaddress: walletaddress['address'] }).count();
    console.log("check user", checkUser);
    if (checkUser == 0) {
        const newCustomer = new UserModel({
            walletaddress: walletaddress['address'],
            usertype: "Customer",
            name: "Customer",
            username: "Customer",
            propic: null
        });
        await newCustomer.save();
        res.status(200).json({ "message": "New user created" });
        console.log(res)
    }
    }  catch(error){
        res.status(400).json({ error: error.message });
    
    }

    }

    // const validation = validate.login_validation({ user_id, password });

    // if (validation.error) {
    //     return res.status(400).json({
    //         "message": validation.error.details
    //     });
    // }

    // const auth = await prisma.Auth.findUnique({
    //     where: {
    //         id: user_id
    //     }
    // })

    // if (!auth) {
    //     return res.status(404).json({ "message": `User :${user_id} does not exist...` });
    // }

    // if (!auth.active) {
    //     return res.status(400).json({ "message": `User :${user_id} is not active...` });
    // }

    // const isMatch = await bcrypt.compare(password, auth.password);
    // if (!isMatch) {
    //     return res.status(400).json({ "message": `User :${user_id} password is incorrect...` });
    // }


    // const authObject = await getAuthObject(auth);

    // const access_token = token.getAccessToken(authObject);
    // const refresh_token = token.getRefreshToken(authObject);

    // const result = await prisma.Auth.update({
    //     where: {
    //         id: user_id
    //     },
    //     data: {
    //         refresh_token,
    //         logged_at: new Date()
    //     }
    // });

    // console.log(result)

    // res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    // return res.status(200).json({
    //     "message": "Login successful",
    //     "access_token": access_token,
    // });




// const handleLogout = async (req, res) => {
//     // const { user_id } = req.body;
//     const cookies = req.cookies;
//     console.log("cookiee value :", cookies);

//     if (!cookies?.jwt) {
//         return res.status(204).json({ "message": "No token found" });
//     }

//     const refresh_token = cookies.jwt;

//     const auth = await prisma.Auth.findUnique({
//         where: {
//             refresh_token
//         }
//     })

//     if (!auth) {
//         return res.status(404).json({ "message": `User does not exist...` });
//     }

//     const result = await prisma.Auth.update({
//         where: {
//             refresh_token
//         },
//         data: {
//             refresh_token: null,
//         }
//     });

//     console.log(result)

//     res.clearCookie('jwt');
//     return res.status(200).json({
//         "message": "Logout successful",
//     });
// }

// const getAuthObject = async (auth) => {
//     const userType = await prisma.UserType.findUnique({
//         where: {
//             id: auth.user_type_id
//         }
//     });

//     return {
//         id: auth.id,
//         user_type: userType.name,
//         active: auth.active,
//         logged_at: auth.logged_at,
//         complete_profile: auth.complete_profile,
//         role: allowedRoles[userType.slug],
//     }
// }

// const getUserTypes = async (req, res) => {
//     const SLUG = process.env.ADMIN_USER_TYPE_SLUG;
//     if (!SLUG) {
//         console.log("ADMIN_USER_TYPE_SLUG is not set");
//         return res.status(500).json({ "message": "Internal server error" });
//     }

//     const userTypes = await prisma.UserType.findMany({
//         select: {
//             name: true,
//             slug: true,
//         },
//         where: {
//             NOT: {
//                 slug: SLUG
//             }
//         }
//     });

//     console.log("user_types :", userTypes);
//     if (userTypes.length <= 0) {
//         return res.status(500).json({ "message": "User types not found" });
//     }

//     return res.status(200).json({
//         status: 'success',
//         data: userTypes
//     });



module.exports = {
    handleConnectWallet
}

