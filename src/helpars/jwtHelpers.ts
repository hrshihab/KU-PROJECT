import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const generateToken = (payload: any, secret: Secret, expireTime: string) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: expireTime
    });
    return token;
};

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload;
}

export const jwtHelpers = {
    generateToken,
    verifyToken
}