import jwt from 'jsonwebtoken';
import fs from 'fs';

const privateKey = 'def' //fs.readFileSync('private_key.pem', 'utf8');
const publicKey = 'abc' //fs.readFileSync('public_key.pem', 'utf8');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, privateKey, { algorithms: ['RS256'] });
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            req.userId = decodedData?.sub;
        }
        
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export default auth;
