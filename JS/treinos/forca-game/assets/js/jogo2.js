//? Vai colocar as imgs do jogadores nos seus respectivos lugares
function criarJogadores() {
    let localJogadores = document.getElementById('localJogadores')
    localJogadores.innerHTML = ''
    let feito = false

     db.collection('Salas').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let Salas = valSalas.data()

            if(valSalas.id == codigoSala && feito == false) {
                feito = true
                for(let c = 0; c < Salas.SobreOsJogadores.length; c++) {
                    let div = document.createElement('div')
                    let p = document.createElement('p')
                    let img = document.createElement('img')

                    div.className = 'jogadores'
                    p.className = 'pontos'
                    
                    p.innerText = 0
                    img.src = Salas.SobreOsJogadores[c].ImgUser

                    div.appendChild(p)
                    div.appendChild(img)
                    localJogadores.appendChild(div)
                }
            }
        })
    })
} criarJogadores()

//? Vai checar de quem é a fez
let ultimoJogador = 0
function checarVez() {
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()

            
            if(valSalas.id == codigoSala) {
                try {
                    if(email == Salas.SobreOsJogadores[Salas.Vez].EmailJogador) {
                        document.getElementById('localTeclado').querySelector('#vezOponente').style.display = 'none'
                        document.getElementsByClassName('keyboard')[0].style.display = 'block'

                    } else {
                        document.getElementById('localTeclado').querySelector('#vezOponente').style.display = 'block'
                        document.getElementsByClassName('keyboard')[0].style.display = 'none'
                    }
                } catch (error) {
                    document.getElementById('localTeclado').querySelector('#vezOponente').style.display = 'block'
                    document.getElementsByClassName('keyboard')[0].style.display = 'none'
                }
            }
        })
    })
} checarVez()

//? Sempre que a vez for alterada, ele vai chamar a função checarVez()
db.collection('Salas').onSnapshot((data) => {
    data.docs.map(function(valSalas) {
        let Salas = valSalas.data()

        if(valSalas.id == codigoSala && Salas.Vez != ultimoJogador) {
            checarVez()
            ultimoJogador = parseInt(Salas.Vez)
        }
    })
})

//? Vai checar se o jogador ganhou e marcar o ponto
function temosUmVencedor(vencedor = false) {
    if(vencedor == true) {
        alert('Parabéns, você acaba de ganhar no jogo da forca')
    } else {
        alert('Não foi dessa vez, é melhor parar por aqui porque se não você vai ser humilhado meu filho')
    }
}

//? Pontos, vai marcar os pontos de cada jogador e arrumar o rank de acordo com a pontuação
