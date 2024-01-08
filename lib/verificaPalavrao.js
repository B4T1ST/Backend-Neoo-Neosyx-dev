const Piii = require("piii");

const piiiFilters = require("piii-filters");
const palavrasBRT = require("./palavras.json")

const removeAccents = string => string
    .replace(/â/g, "a")
    .replace(/ã/g, "a")
    .replace(/á/g, "a")
    .replace(/à/g, "a")
    .replace(/ê/g, "e")
    .replace(/é/g, "e")
    .replace(/è/g, "e")
    .replace(/í/g, "i")
    .replace(/ì/g, "i")
    .replace(/î/g, "i")
    .replace(/ô/g, "o")
    .replace(/ó/g, "o")
    .replace(/ò/g, "o")
    .replace(/õ/g, "o")
    .replace(/ú/g, "u")
    .replace(/ù/g, "u")
    .replace(/û/g, "u")
    .replace(/-/g, "")
    .replace(/pela/g, " ")
    .replace(/ediçao/g, " ")
    .replace(/Perry/g, " ")
    
    const piii = new Piii({
        filters: [
            ...Object.values(palavrasBRT),
            ...Object.values(piiiFilters)            
        ],
        censor: badWord => {
            return "<palavrao> " + badWord
        },
        aliases: {
            a: ["2", "4", "@", "*", "x"],
            e: ["3", "&", "*", "x"],
            i: ["1", "!", "|", "y", "*", "x"],
            o: ["0", "º", "°", "*", "x"],
            u: ["v", "y", "*", "x"]
        },
        repeated: true,
        cleaner: removeAccents
    });
    

const VerificaPalavrao = {

    existe: function(texto) {
        return piii.has(texto)
    },
    retornaStringCensurado: function(texto) {
        return piii.filter(texto)
    },
    retornaPalavroes: function(texto) {

        let palavras = piii.filter(texto).split(' ')
        
        let palavroes = [];

        palavras.forEach((value, index) => {
            if (value === '<palavrao>'){
                palavroes.push(palavras[index + 1])
            }
        });
        
        return "Foram detectadas no seu texto algumas palavras ofensivas, são elas: " + palavroes.toString()
    }

}
module.exports = VerificaPalavrao;