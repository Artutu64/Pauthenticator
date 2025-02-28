const { getTOTPfromURI } = require("../src/totp/TOTP");

const input = "otpauth://totp/Pauthenticator:test@test.Te?secret=JN4USP5TJSYZAI3PPGJ7N4273D32MIRSLQIIRJSSJ4AXJCIXPC5Q&issuer=Pauthenticator&algorithm=SHA512&digits=8&period=30"

let totp = getTOTPfromURI(input)
setInterval(() => {
    console.log(totp.getCode())
}, 1000)