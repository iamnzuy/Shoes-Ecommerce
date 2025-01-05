export default function generateOTP() {
    //6 digits OTP
    let token=Math.floor(Math.random()*900000)+100000;
    return token;
}