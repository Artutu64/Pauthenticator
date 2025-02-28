
const { getTOTPfromURI } = require("../src/totp/TOTP");

const input = prompt("Entrez le code :");

let totp = getTOTPfromURI(input)
setInterval(() => {
    console.log(totp.getCode())
}, 1000)