const TOTPDatabase = require("../src/database/TOTPDatabase");
const { getTOTPfromURI } = require("../src/totp/TOTP");

async function main(){
    let totpDB = new TOTPDatabase()
    let codeQR = await totpDB.getTOTP("arthur.rimaudiere@free.fr")
    let totp = getTOTPfromURI(codeQR)
    setInterval(() => {
        console.log(totp.getCode())
    }, 1000)
}

main();