const jwt = require('jsonwebtoken');


//authentication checker
const authChecher = async (req, res, next) => {
    //get the token
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message:'invalid authorization'})
    }

    const onlyToken = token.split(' ')[1];

    jwt.verify(onlyToken, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ message:'invalid token'})
        }
        req.auth = user
        next();
    })
};

module.exports = {authChecher};