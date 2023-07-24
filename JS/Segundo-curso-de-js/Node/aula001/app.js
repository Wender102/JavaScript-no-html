// const mod1 = require('./mod1')
// console.log(mod1.falaNome())


// const {nome, sobrenome, falaNome} = require('./mod1')
// console.log(nome, sobrenome)
// console.log(falaNome())

//? Os pacotes baixados poderão ser importados sem escrever o caminho, apenas o nome

const {Pessoa} = require('./mod1')
const p1 = new Pessoa('Wender')
console.log(p1);
