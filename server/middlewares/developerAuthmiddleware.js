//   to verify token
require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        const developertoken = req.headers['authorization'].split(" ")[1]

        jwt.verify(developertoken, process.env.jwtsecret, (err, decode) => {
            if (err || decode.role!=='DEVELOPER') {
                return res.status(401).send({
                    message: "Auth failed",
                    success: false

                })
            }
            else {

                req.body.developerId = decode.id,

                    next()
            }
        })
    }
    catch (error) {

        return res.status(500).send({ message: "Internal server error", success: false });



    }
}