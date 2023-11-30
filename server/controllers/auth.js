
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {expressjwt} = require("express-jwt");
const elasticEmail = require('@elasticemail/elasticemail-client');

exports.signup = (req, res) => {
    //console.log(req.body)
    const { name, email, password } = req.body
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }
        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' })

        const client = elasticEmail.ApiClient.instance;
        const apikey = client.authentications['apikey'];
        apikey.apiKey = process.env.ELASTICMAIL_API_KEY;

        let api = new elasticEmail.EmailsApi()
        
            const emailData = {
                Recipients:{
                    To: [email]
                },
                Content:{
                    Body:[
                        {
                            ContentType: "HTML",
                            Charset: "utf-8",
                            Content: `
                        <h1>Please use the following link to activate your account</h1>
                        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                    `
                        },
                        {
                            ContentType: "plainText",
                            Charset: "utf-8",
                            Content: "Activate your Account"
                        }
                    ],
                    From: process.env.EMAIL_FROM,
                    subject: "Account Activation Link",
                },
            }
            const callback = (err, data, response) => {
                if(err){
                    console.error(err)
                    res.status(200).json({success: err})
                }
                else{
                    console.log('API called successfully')
                    console.log('Email sent')
                    console.log(req.body)
                    res.status(200).json({
                        success: "done",
                        message: `Email is successfully sent to ${email}`
                    })
                }
            }
            api.emailsTransactionalPost(emailData, callback)
        })
}

exports.accountActivation = (req, res) => {
    const {token} = req.body;

    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
            if(err){
                console.log('JWT VERIFY IN ACTIVATION ERROR', err)
                return res.status(401).json({
                    error: 'Expired link! SignUp again'
                })
            }
            const {name, email, password} = jwt.decode(token)
            const newUser = new User({name, email, password})
            console.log(newUser)
            newUser.save((err, user)=>{
                if(err){
                    console.log('SAVE USER IN ACTIVATION ACCOUNT ERROR', err)
                    return res.status(400).json({
                        error: 'Error saving user in database, Try signup again'
                    })
                }
                return res.json({
                    message: 'SignUp success, please signin'
                })
            })
        })
    }
    else{
        return res.json({
            message: 'Something went wrong! Try again'
        })
    }
}

exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User with that email doesn't exist, please SignUp!"
            })
        }
        //authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Incorrect password"
            })
        }

        //generate a token and send to client
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        const {_id, name, email, role} = user

        return res.json({
            token: token,
            user: {_id, name, email, role}
        })
    })
}

exports.requireSignin = expressjwt({ // so that only authorized/logged in user can see the profile
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], //makes data available in req.user
})