// const nome = 'Wender Natanael'
// const sobrenome = 'M. V. Dos Santos'

// const falaNome = () => nome + ' ' + sobrenome

// module.exports.nome = nome
// module.exports.sobrenome = sobrenome
// module.exports.falaNome = falaNome
// this.qualquerCois = 'O this neste contexto aponta para o module, mas n é mt usado'

// console.log(module.exports);

class Pessoa {
    constructor(nome) {
        this.nome = nome
    }
}

exports.Pessoa = Pessoa