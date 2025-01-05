import jwt from 'jsonwebtoken'
export function verifyToken(req,res,next) {
    let token=req.headers.token?.split(' ')[1];
    if (!token) {
       throw new Error('you are not authenticated')
    }
    
    try {
       let decoded=jwt.verify(token,process.env.SECRET_KEY)
       req.user=decoded
       console.log(decoded);
       next()
    } catch (error) {
       //error.message='invalid token';
       next(error)
    }
    
}
export function verifyRefreshToken(req,res,next) {
    let token=req.cookies.refreshToken;
    if (!token) {
       throw new Error('session expried')
    }
    try {
       let decoded=jwt.verify(token,process.env.SECRET_KEY)
       req.user=decoded
       next()
    } catch (error) {
       error.message='session expried';
       next(error)
    }
    
}
export function verifyAdmin(req,res,next) {
   let role=req.user.role;
   try {
       if (role!='admin') {
           let err=new Error()
           err.message='UNAUTHORIZED'
           err.status=401;
           throw err
       }
       next()
   } catch (error) {
       next(error)
   }
}