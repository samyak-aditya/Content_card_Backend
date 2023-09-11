import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey =process.env.PrivateKey;
const publicKey = process.env.PublicKey;



const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(405).json({ message: 'Authorization header is missing' });
        }

        const token = authorizationHeader.split(" ")[1];
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
        res.status(406).json({ message: 'Authentication failed' });
    }
};

export default auth;
