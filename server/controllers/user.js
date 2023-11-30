const User = require("../models/user")

exports.read = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    })
}

exports.update = (req, res) => {
    console.log('UPDATE USER', req.auth, "UPDATE DATA", req.body)
    const { name } = req.body;
    User.findOne({ _id: req.auth._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            })
        } else {
            user.name = name
        }
        // if(password.length() < 6){
        //     return res.status(400).json({
        //         error: 'Password should be minimum 6 characters long'
        //     })
        // }
        // else{
        //     user.password = password
        // }
        res.json(user)
        user.save((error, updatedUser)=>{
            if(err){
                return res.status(400).json({
                    error: 'User update failed'
                })
            }
            updatedUser.hashed_password = undefined
            updatedUser.salt = undefined
            res.json(updatedUser)
        })
    })
}