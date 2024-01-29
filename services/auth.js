const jwt = require('jsonwebtoken');

const generateToken = ((data) => {
    return jwt.sign(data, 'mySecret-key', { expiresIn: '5h' });
});

const verifyToken = async (req, res, next) => {
    try {
        if (req.headers.cookie) {
            const Token = req.headers.cookie.split('=')[1]
            const data = jwt.verify(Token, 'mySecret-key');
            req.data = data;
            console.log(data);
            next();
        }
        else {
            return res.status(401).json({ msg: 'Login First' });
        };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ msg: 'Your Token has expired, please login.' });
        } else if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ msg: 'Invalid token, please log in again.' });
        } else {
            res.status(500).json({ msg: 'Internal Server Error', error });
        };
    };
};

module.exports = { generateToken, verifyToken };