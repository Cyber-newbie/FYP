const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (err) {
        res.status(400).json({
            error: 'Invalid token.'
        });
    }
}

module.exports = {
    verifyToken
}