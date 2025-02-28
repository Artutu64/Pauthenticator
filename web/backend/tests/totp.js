const { getTOTPfromURI } = require("../src/totp/TOTP");

const input = "otpauth://totp/Pauthenticator:depreterre@cy-tech.fr?secret=ZZZKUPWX7A4QIXULJ2BFRU76VXIB55532JMLJIWDPKLQ77DZZ6NQ&issuer=Pauthenticator&algorithm=SHA512&digits=8&period=30"

let totp = getTOTPfromURI(input)
setInterval(() => {
    console.log(totp.getCode())
}, 1000)