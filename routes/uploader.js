const { randomUUID } = require('crypto');
const express       = require('express');
const router        = express.Router();
const multer        = require("multer");
const path          = require("path");
const {v4: uuidv4}  = require("uuid"); //unique id

let uuid;
let dir;

const uploadPath    = "C:/inetpub/wwwroot/Neoo/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {               
        const ext = file.originalname.toString().split('.').pop();   
        
        if (ext === "csv")
            dir = uploadPath + "csvfiles/"
        else if (ext === "pdf")
            dir = uploadPath + "pdffiles/"
        else if (ext === "docx")
            dir = uploadPath + "wordfiles/"
        else if (ext === "xlsx")
            dir = uploadPath + "excelfiles/"
        else if (ext === "mp4" || ext === "webm")
            dir = uploadPath + "videofiles/"
        else if (ext === "png" || ext === "jpg" || ext === "jpeg") 
            dir = uploadPath + "imagefiles/"
        else if (ext === "msg")
            dir = uploadPath + "emailfiles/"
        else
            dir = uploadPath + "otherfiles/"
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.toString().split('.').pop();
        dir += uuid + "." + ext        
        cb(null, uuid + "." + ext)
    }
})

const uploader = multer({storage}).array('file')

router.post("/upload", (req,res) => {

    uuid = uuidv4();    
    
    uploader(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        return res.json(dir.replace('C:/inetpub/wwwroot', 'https://webservice.neosyx.com'))       
        // return res.json(dir.replace('C:/inetpub/wwwroot', 'https://nsx.almavivadobrasil.com.br'))       
    })
});

module.exports = router;


// const { randomUUID } = require('crypto');
// const express       = require('express');
// const router        = express.Router();
// const multer        = require("multer");
// const path          = require("path");
// const sharp         = require('sharp');
// const {v4: uuidv4}  = require("uuid"); //unique id

// let uuid;
// let dir;

// const uploadPath    = "C:/inetpub/wwwroot/NeoMobile/BRT_WorkMedia/";


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const ext = file.originalname.toString().split('.').pop();          
//         if (ext === "jpg" || ext === "png"){
//             dir = uploadPath + "imagefiles/"
//         } else if (ext === ".mp4" || ext === ".webm")
//             dir = uploadPath + "videofiles/"
//         cb(null, dir);
//     },
//     filename: (req, file, cb) => {
//         const ext = file.originalname.toString().split('.').pop();  
//         dir += uuid + '.' + ext
//         console.log(dir)
//         cb(null, uuid + '.' +ext)
//     }
// })

// const uploader = multer({storage}).array('file')

// router.post("/upload", (req,res) => {

//     uuid = uuidv4();
//     // dir = '';
    
//     uploader(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err)
//         } else if (err) {
//             return res.status(500).json(err)
//         }

//         // criaImagemTamanhoIdeal(tipoUpload)

//         return res.json(dir.replace('C:/inetpub/wwwroot', 'http://35.247.231.34'))       
//     })
// });

// function criaImagemTamanhoIdeal (tipoUpload){
//     //A variável ext recebe a extensão do arquivo (jpg, png...)
//     const ext = dir.toString().split('.').pop();

//     //Cria um objeto pra armazenar os caminhos do diretório referente ao tipo de upload
//     const caminhos = {
//         'fotoPerfil': 'imagefiles/perfil',
//         'fotoGrupo': 'imagefiles/grupo'
//     }
    
//     //Armazena o destino do arquivo baseado no tipo de upload
//     const destination = uploadPath + caminhos[tipoUpload]

//     //Baseado no tipo de upload, usa o biblioteca sharp pra pegar o 'dir' da imagem já criada, cria um clone redimensionado em outro diretório (destination)
//     switch(tipoUpload){
//         case 'fotoPerfil':
//             sharp(dir)
//             .clone()
//             .resize({width: 128})
//             .toFile(`${destination}/${uuid}-128.${ext}`)
//             return;
//         case 'fotoGrupo':
//             sharp(dir)
//             .clone()
//             .resize({width: 80})
//             .toFile(`${destination}/${uuid}-80.${ext}`)
//             return;
//         default:
//             return;

//     }
// }

// module.exports = router;