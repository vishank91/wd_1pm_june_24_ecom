const jwt = require("jsonwebtoken")

function verifyBuyer(req, res, next) {
    let token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.BUYER_SECRET_KEY, (error) => {
            if (error)
                res.send({ result: "Fail", reason: "Token Verification Fail. Invalid Token or Expired Token. Please Login Again" })
            else
                next()
        })
    }
    else
        res.send({ result: "Fail", reason: "Unauthorised Activity" })
}
function verifyAdmin(req, res, next) {
    let token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.ADMIN_SECRET_KEY, (error) => {
            if (error)
                res.send({ result: "Fail", reason: "Token Verification Fail. Invalid Token or Expired Token. Please Login Again" })
            else
                next()
        })
    }
    else
        res.send({ result: "Fail", reason: "Unauthorised Activity" })
}
function verifyBoth(req, res, next) {
    let token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.BUYER_SECRET_KEY, (error) => {
            if (error) {
                jwt.verify(token, process.env.ADMIN_SECRET_KEY, (error) => {
                    if (error)
                        res.send({ result: "Fail", reason: "Token Verification Fail. Invalid Token or Expired Token. Please Login Again" })
                    else
                        next()
                })
            }
            else
                next()
        })
    }
    else
        res.send({ result: "Fail", reason: "Unauthorised Activity" })
}

module.exports = {
    verifyBuyer,
    verifyAdmin,
    verifyBoth
}