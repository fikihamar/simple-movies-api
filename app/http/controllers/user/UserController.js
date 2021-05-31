const UserModel = require('../../../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomString = require("crypto-random-string");
const Response = require('../../../helpers/Response');

exports.findAll = (req, res) => {
    userModel.getAll ((err, data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users"
            });
        else res.send(data);
    });
}
const login = async (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return next(
            new Response(
                `${errors.errors[0].msg} in ${errors.errors[0].param}`,
                404
            )
        );
    }

    const { name, password } = req.body;

    let user;
    try {
        user = await UserModel.findOne({ email });
    } catch (err) {
        return next(new Response(err.message, 500));
    }

    if (!user) {
        return next(new Response("Name is wrong", 422));
    }

    let isValid = false;
    try {
        isValid = await bcrypt.compare(password, user.password);
    } catch (err) {
        return next(new Response(err.message, 500));
    }

    if (!isValid){
        return next(new Response("Password not match", 422));
    }

    let token;
    try {
        token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_KEY_ACCESS,
            { expiresIn : "1h" }
        );
    } catch (err) {
        return next(new Response(err, 500));
    }

    res.json({message: "Success", token: token});
}
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return next(
            new Response(
                `${erros.errors[0].msg} in ${errors.errors[0].param}`,
                404
            )
        );
    }

    const { name, password } = req.body;

    let alreadyName;
    try {
         [alreadyName, hashPassword ] = await Promise.all([
             UserModel.findOne({ name: name }),
             bcrypt.hash(password, 12),
            ]);
    } catch (error) {
        return next(new Response(err.message, 500));
    }

    if (alreadyName) {
        return next(new Response("Name has already exist", 422));
    }

    const accessTokenSecret = randomString({ length: 32, type: "url-safe" });

    const newRegist = new UserModel({
        name,
        password : hashPassword
    });

    try {
        await UserModel.create(newRegist);
    } catch (err) {
        return next(new Response(err.message, 500));
    }

    res.json({ message: "Success", token: token }).status(200);
};



module.exports = {
    login,
    signup,
};