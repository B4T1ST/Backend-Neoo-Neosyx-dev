//carregando modulos
const bcrypt            = require('bcryptjs');
const LocalStrategy     = require('passport-local').Strategy;
const sql               = require('mssql');
const config            = require('./config/config.json');
const connection        = require('./config/' + config.banco);

//funcoes exportadas do passport
module.exports = function (passport){

    //serializa o usuário
    passport.serializeUser((user, done) => {

        //retorna o código do usuário
        done(null, user.codigo);

    });

    //deserializa o usuario
    passport.deserializeUser((codigo, done) => {

        (async function () {
            try {

                //cria a conexao
                let pool = await sql.connect(connection)
               
                //monta o request
                let result = await pool.request()
                    //define os parametros
                    .input('codigoUsuario', sql.Int, codigo)
                    //define a procedure
                    .execute('s_Autenticacao_Retorna_Login_Codigo')
              
                //pega o resultado
                let user = result.recordset[0];

                 //verifca se o usuário existe
                 if (typeof user === "undefined"){
                    //retorna n ok
                    return done(null, false);
                } else {
                    //retorno ok
                    return done(null, user);
                }
           
            } catch (err) {
                //retorno de erro
                return done(err, false);
            }
        })()
        
        sql.on('error', err => {
            //retorno de erro
            return done(err, false);
        })

    })

    passport.use(new LocalStrategy({
        usernameField   : 'username',
        passwordField   : 'password'
    },
    (username, password, done) => {
     
        (async function () {
            try {
                //cria a conexao
                let pool = await sql.connect(connection);

                //monta o request
                let result = await pool.request()
                    //define os parametros
                    .input('loginUsuario', sql.VarChar(100), username)
                    //define a procedures
                    .execute('s_Autenticacao_Retorna_Login')
                
                //pega o resultado
                let user = result.recordset[0];

                //verifca se o usuário existe
                if (typeof user === "undefined"){
                    //retorna n ok
                    return done(null, false);
                }

                //compara as senhas
                const isValid = bcrypt.compareSync(password, user.senha);
                
                //caso seja valida
                if (typeof isValid === "undefined"){
                    //retorna n ok
                    return done(null, false);
                } 

               
                //se autenticou
                if (isValid) {
                    //retorno ok
                    return done(null, user);
                } else {
                    //retorno n ok
                    return done(null, false);
                }
            
            } catch (err) {
                //retorno de erro
                return done(err, false);
            }
        })()
        
        sql.on('error', err => {
            //retorno de erro
            return done(err, false);
        })
    }))
}