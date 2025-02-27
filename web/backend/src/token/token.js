const { createToken, extractTokenData } = require("./token_lib")

class TokenFactory {

    create(data){
        return createToken(data)
    }

    isValid(token){
        try {
            let data = extractTokenData(token)
            if(data.timestamp > Date.now()){
                return true
            } else {
                return false
            }
        } catch(error){
            return false
        }
    }

    getUser(token){
        try {
            return extractTokenData(token)
        } catch(error){
            return null
        }
    }

}

module.exports = TokenFactory