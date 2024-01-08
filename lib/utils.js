const utils = {
    //pipeia os codigos dos objetos de uma array
    arrayObjCodeToPipe: function(array) {
        //declara a variavel do retorno
        let result = '';
 
        //percorre cada item
        array.forEach((item, index) => {
            //concatena o resultado com o valor pipeado
            result += item.codigo + (array.length - 1 !== index  ? '|' : '');    
        });
        
        //retorna a string pipeada
        return result;
    },
    //transforma um array em string pipeada
    arrayToPipe: function(array) {
        //retorna a string pipeada
        return array.join('|');
    },
    mesclaArrays: function(array) {
        //declara a variavel do retorno
        let result = [];
   
        if (array[0] !== null) {
            for(let i = 0; i < array[0].length; i++) {
                
                let obj = {
                    codigo: array[0][i], 
                    nome: array[1][i]
                };
                
                result.push(obj);
            }
        }
            
        //retorna a string pipeada
        return (result.length > 0) ? result : null;
    },
    mesclaArrayTriplo: function(array) {
        //declara a variavel do retorno
        let result = [];
   
        if (array[0] !== null) {
            for(let i = 0; i < array[0].length; i++) {
                
                let obj = {
                    codigo: array[0][i], 
                    label: array[1][i],
                    value: array[2][i]
                };
                
                result.push(obj);
            }
        }
            
        //retorna a string pipeada
        return (result.length > 0) ? result : null;
    },
    //transforma a string pipeada em array
    pipeToArray: function(str) {
        //retorna o array
        return (str === null ? str : str.split('|'));
    },
    b64EncodeUnicode(str) {
        const btoa = (text) => {
            return Buffer.from(text, 'binary').toString('base64');
        };
        
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode(parseInt(p1, 16))
        }))
    }, 
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
    }
};
  
module.exports = utils;
  