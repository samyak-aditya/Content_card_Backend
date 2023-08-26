import jwt from 'jsonwebtoken'

const jwt_secret = process.env.JWT_SECRET 
const auth = async (req, res, next) => {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        const isCustomAuth = token.length<500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData= jwt.verify(token, jwt_secret);

            //get to know user id
            req.userId = decodeData?.id;
        } else {
            decodedData= jwt.decode(token);

            req.userId = decodedData?.sub;
        }
        next(); 
    } catch (error) {
        console.error(error);
    }

}

export default auth;