import jwt from "jsonwebtoken";

export const getJWTFunc = (data) => {
        let token = jwt.sign({
            _id : data._id,
            firstName : data.name.firstName,
            middleName : data.name.middleName,
            lastName : data.name.lastName,
            email : data.email
        },'RESTFULAPIs')
        return token
}

export const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        let verifyJwt = jwt.verify(token, 'RESTFULAPIs');
        if (verifyJwt){
            req.user = verifyJwt;
            next();
        } else {
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};

export const decode = (token) => {
    return new Promise((resolve) => {
        let jwtDecoded = jwt.verify(token, 'RESTFULAPIs');
        resolve(jwtDecoded);
    });
}