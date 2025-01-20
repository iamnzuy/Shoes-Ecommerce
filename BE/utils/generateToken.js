import jwt from 'jsonwebtoken'
export function generateToken(user) {
    let id= user._id || user.id;
    let accessToken=jwt.sign({
        id,
        role: user.role
    },process.env.SECRET_KEY,{
        expiresIn: '40s'
    })
    let refreshToken=jwt.sign({
        id,
        role: user.role
    },process.env.SECRET_KEY,{
        expiresIn: '1h'
    })
    return {accessToken,refreshToken}
}
