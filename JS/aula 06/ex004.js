var nome = window.prompt('Qual é o seu nome?')
document.write(`Olá, <strong>${nome}</strong>! Seu nome tem ${nome.length} letras.<br>`) //Serve para contar quantas letras seu nome tem

document.write(`<br>Seu nome em maiúsculo é <strong">${nome.toUpperCase()}</strong>!`) //Serve para colocar o "nome" em maiúsculo  

document.write(`<br>Seu nome em minúsculas é <strong">${nome.toLocaleLowerCase()}</strong>!`) //Serve para colocar o "nome" em minucúlo

document.write('<br>Seu nome de forma normal é <strong>' + nome + '</strong>')

while(b != 40){
var b = window.prompt('Senha:')

if(b != 40)
{
    var a = window.prompt('Senha incorreta! Escreva "Sim" para redefinir a senha.')

    if(a == 'Sim')
    {
        var nome = window.prompt('Qual é seu nome?')

        if(nome == 'Wender')
        {
            var b = window.prompt('Nova senha:')
        }
        
        if(nome != 'Wender')
        {
            window.alert('Aparentemente o nome salvo não é esse!')
        }
    }
}
}