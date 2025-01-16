import jwt from 'jsonwebtoken'
export function generateToken(user) {
    let id= user._id || user.id;
    let accessToken=jwt.sign({
        id,
        role: user.role
    },process.env.SECRET_KEY,{
        expiresIn: '4h'
    })
    let refreshToken=jwt.sign({
        id,
        role: user.role
    },process.env.SECRET_KEY,{
        expiresIn: '5h'
    })
    return {accessToken,refreshToken}
}
