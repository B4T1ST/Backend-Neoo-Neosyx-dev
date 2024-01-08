const jwt       = require('jsonwebtoken');
const config    = require('../config/auth.config.js');

//cria o token passando a chave secreta na pasta config
function geraToken(loginUsuario){
    const token = jwt.sign({loginUsuario}, config.secret, {
        subject:  loginUsuario,
        expiresIn: "8h" 
    })
    return token
}

//verifica se o token passado pela header e nulo ou expirado para autorizar a requisicao a ser feita
function verificaToken(req, res, next){
    let tokenHeader = req.headers["x-access-token"]
    
    if(!tokenHeader){
        return res.status(403).send("Nenhum token foi identificado!")
    }

    jwt.verify(tokenHeader, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send("Usuario nao autorizado!")
        }

        next();
    })
}

async function verificaTokenApiChat(token){
    const result = await jwt.verify(token, config.secret, (err, decoded) => {
        if(err){            
            return false
        }
        return true
    })
    return result
}

module.exports = {
    geraToken,
    verificaToken,
    verificaTokenApiChat
}