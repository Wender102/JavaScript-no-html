function fecharAbasNav() {
    var abaNav = document.getElementsByClassName('abaNav');

    for (var i = 0; i < abaNav.length; i++) {
        abaNav[i].style.display = 'none'
    }
} fecharAbasNav()

let photoURL
auth.onAuthStateChanged((val) => {
    if(val.email) {
        document.querySelector('#fotoDePerfilUser').src = val.photoURL
        photoURL = val.photoURL
        // document.querySelector('#carregamento').className = 'carregandoFechado'
    }
})

//? Sempre que ocorrer alguma alteração, essa função será chamada
function obterHoraServidor() {
    return new Promise((resolve, reject) => {
        fetch("https://worldtimeapi.org/api/ip")
        .then(response => response.json())
        .then(data => {
            var hora_servidor = new Date(data.datetime)
            var Hora = hora_servidor.getHours()
            var Min = hora_servidor.getMinutes()
            var Ano = hora_servidor.getFullYear()
            var Mes = hora_servidor.getMonth()
            var Dia = hora_servidor.getDate()

            let HoraGeral = {
                Hora,
                Min,
                Ano,
                Mes,
                Dia
            }

            resolve(HoraGeral)
        })
        .catch(error => {
            reject(error)
        })
    })
}

//? Vai atualizar a hr na sala
function checarHrPc() {
    let data = new Date()
    let hr = data.getHours()
    let minutos = data.getMinutes()

    if(hr < 10) {
        hr = `0${hr}`
    }

    if(minutos < 10) {
        minutos = `0${minutos}`
    }

    document.querySelector('#relogio').innerText = `${hr}:${minutos}`
} checarHrPc()

setInterval(() => {
    checarHrPc()
}, 60000)

//? Vai abrir a aba de editar sala
let carregarbackGround = false
document.querySelector('#editIcon').addEventListener('click', () => {
    
    fecharAbasNav()
    let backgoundsNav = document.querySelector('#backgoundsNav')
    let pagOpcoes = document.querySelector('#pagOpcoes')
    backgoundsNav.style.display = 'flex'
    // backgoundsNav.innerHTML = ''
    
    if(carregarbackGround == false) {
        carregarbackGround = true
        fetch('Assets/Json/InfosImagens.json').then(resposta => {
            return resposta.json()
        }).then(result => {
    
            for(let c = 0; c < result.Backgrounds.length; c++) {
                pagOpcoes.style.display = 'block'
                
                let img = document.createElement('img')
                img.src = result.Backgrounds[c].LinkImagem
                img.className = 'imgsBackgrounds'
    
                backgoundsNav.appendChild(img)
                
                img.addEventListener('click', () => {
                    let imgTrocadaNoDB = false
                    if(result.Backgrounds[c].EstadoImagem == 'Normal' || result.Backgrounds[c].EstadoImagem != 'Normal') {
                        let imagem = img.src
                        imagem = imagem.replace('/baixaQualidade', '')
                        trocarBackground(imagem)
    
                        db.collection('Users').onSnapshot((data) => {
                            data.docs.map(function(valor) {
                                let Usuarios = valor.data()
                                
                                if(emailUser == Usuarios.Email && imgTrocadaNoDB == false) {
                                    imgTrocadaNoDB = true
                                    let SalaUser = {
                                        BackgroundImg: imagem
                                    }
                                    db.collection('Users').doc(valor.id).update({SalaUser: SalaUser})
                                }
                            })
                        })
    
                    } else {
                        alert('Tem que ser Premium pra ter está fiote')
                    }
                })
            }
        })
    } else {
        pagOpcoes.style.display = 'block'
    }
})

//? Vai abrir a aba crias salas
document.querySelector('#plusIcon').addEventListener('click', () => {
    fecharAbasNav()
    document.querySelector('#pagOpcoes').style.display = 'flex'
    document.querySelector('#salaNav').style.display = 'flex'
})

//? Vai criar s sala
function criarSala() {
    let salaCriada = false
    let salaEncontrada = false
    let salaDeletada = false
    let checarSala = false

    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Salas = valor.data()
            
            if(checarSala == false) {
                checarSala = true

                try {
                    for(let c = 0; c < Salas.UserConectados.length; c++) {
                        if(Salas.UserConectados[c].Email == emailUser || Salas.Host == emailUser) {
                            salaDeletada = true
                            salaEncontrada = true
                            var dentroDaSala = document.getElementsByClassName('dentroDaSala')
                            var foraDaSala = document.getElementsByClassName('foraDaSala')
                            for (var i = 0; i < dentroDaSala.length; i++) {
                                dentroDaSala[i].style.display = 'none'
                                foraDaSala[i].style.display = 'none'
                            }
                            document.querySelector('#excluirSala').style.display = 'block'
        
                        }
                    }
                } catch (error) {
                    console.warn(error)
                }
            }
        })
    
        console.log(salaEncontrada);
        if (salaEncontrada == false && salaCriada == false && checarSala == false) {
            checarSala = true
            db.collection('Users').onSnapshot((data) => {
                data.docs.map(function(valor) {
                    let Usuarios = valor.data()
        
                    if (emailUser == Usuarios.Email && salaCriada == false){
                        salaCriada = true

                        let backgoundSala
                        if(Usuarios.SalaUser.BackgroundImg != 'Normal') {
                            backgoundSala = Usuarios.SalaUser.BackgroundImg
                        } else {
                            backgoundSala = document.getElementsByClassName('backgroundsPage')[0].src
                        }

                        //? Vai pegar a hr do servidor
                        let hrTotal
                        obterHoraServidor()
                        .then(HoraGeral => {
                            hrTotal = {
                                Horas:`${HoraGeral.Hora}${HoraGeral.Min}`,
                                Data: `${HoraGeral.Mes}${HoraGeral.Dia}${HoraGeral.Ano}`,
                            }

                            let novaSala = {
                                Host: emailUser,
                                BackgroundImg: backgoundSala,
                                UserConectados: [{
                                    Email: emailUser,
                                    ImgPerfil: photoURL,
                                    HoraUser: hrTotal
                                }],
                                Chat: [],
                                Estado: 'Publica'
                            }
                            
                            db.collection('Salas').add(novaSala)

                            var dentroDaSala = document.getElementsByClassName('dentroDaSala')
                            var foraDaSala = document.getElementsByClassName('foraDaSala')
                            for (var i = 0; i < dentroDaSala.length; i++) {
                                dentroDaSala[i].style.display = 'none'
                                foraDaSala[i].style.display = 'none'
                            }
                            document.querySelector('#excluirSala').style.display = 'block'
                        })
                    }
                })
            })
        }
    })
}

function trocarBackground(Img = 'http://127.0.0.1:5500/Assets/img/backgrounds/0.png') {
    if(Img == undefined) {
        Img = 'http://127.0.0.1:5500/Assets/img/backgrounds/0.png'
    }

    try {
        let backgroundImg1 = document.getElementsByClassName('backgroundsPage')[0]
        let backgroundImg2 = document.getElementsByClassName('backgroundsPage')[1]

        backgroundImg2.src = backgroundImg1.src

        backgroundImg1.src = Img
        backgroundImg2.id = 'hide'
        
        setTimeout(() => {
            backgroundImg2.src = Img
            backgroundImg2.id = ''
        }, 500)
    } catch (error) {
        console.warn(error)
        alert('Não conseguimos carregar seu background.')
        trocarBackground('http://127.0.0.1:5500/Assets/img/backgrounds/0.png')
    }
}

//? Vai excluir a sala
function excluirSala() {
    let salaDeletada = false
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Salas = valor.data()

            if (emailUser == Salas.Host && salaDeletada == false) {
                salaDeletada = true
                
                valor.ref.delete()
                .then(() => {
                    console.log('Sala excluída com sucesso!')
                    vltSalaPessoal()

                })
                .catch((error) => {
                    console.error('Ocorreu um erro ao excluir a sala:', error)
                })
            }
        })
    })
}

let codigoSala
let codigoUltimaSala = localStorage.getItem('CodigoUltimaSala')

if(codigoUltimaSala != undefined) {
    codigoSala = codigoUltimaSala
}

//? Vai carregar as infos da sala pessoal do user
function vltSalaPessoal() {
    let vlt = false
    return new Promise((resolve, reject) => {
        db.collection('Users').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let Users = valor.data()
    
                if(Users.Email == emailUser && vlt == false) {
                    vlt = true
                    document.querySelector('#localCodigoSala').style.display = 'none'
                    document.querySelector('#localPerfilUsers').innerHTML = ''
                    document.querySelector('#localMsgChat').innerHTML = ''
    
                    let backgound
                    if(Users.SalaUser.BackgroundImg == 'Normal' || Users.SalaUser.BackgroundImg == undefined) {
                        backgound = 'Assets/img/backgrounds/0.png'
                    } else {
                        backgound = Users.SalaUser.BackgroundImg
                    }

                    document.getElementsByClassName('backgroundsPage')[0].src = backgound
                    document.getElementsByClassName('backgroundsPage')[1].src = backgound
                    codigoSala = undefined
    
                    var dentroDaSala = document.getElementsByClassName('dentroDaSala')
                    var foraDaSala = document.getElementsByClassName('foraDaSala')
                    for (var i = 0; i < dentroDaSala.length; i++) {
                        dentroDaSala[i].style.display = 'none'
                        foraDaSala[i].style.display = 'block'
                    }

                    resolve()
                }
            })
        })
    })
} 

function carregarSala() {
    let temSalas = false

    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valor) {
        let Salas = valor.data()

            temSalas = true

            if(Salas.Host == emailUser) {
                document.querySelector('#localCodigoSala').style.display = 'block'
                document.querySelector('#codigoSala').innerHTML = valor.id
                codigoSala = valor.id
                trocarBackground(Salas.BackgroundImg)
                
            } else {
                vltSalaPessoal().then(() => {
                    let backgroundsPage =  document.getElementsByClassName('backgroundsPage')[0]

                    setTimeout(() => {
                        if(backgroundsPage.src != backgroundsPage.getAttribute('data-src')) {
                            document.querySelector('#carregamento').className = 'carregandoFechado'
                            setTimeout(() => {
                                document.querySelector('#carregamento').style.display = 'none'
                            }, 800)
                        }
                    }, 3000)
                })
            }

        })
    })

    setTimeout(() => {
        if(temSalas == false) {
            vltSalaPessoal().then(() => {
                let backgroundsPage =  document.getElementsByClassName('backgroundsPage')[0]

                setTimeout(() => {
                    if(backgroundsPage.src != backgroundsPage.getAttribute('data-src')) {
                        document.querySelector('#carregamento').className = 'carregandoFechado'
                        setTimeout(() => {
                            document.querySelector('#carregamento').style.display = 'none'
                        }, 800)
                    }
                }, 1000)
            })
        }
    }, 1000)
} carregarSala()

function entrarEmSala() {
    codigoSala = prompt('Código da sala: ')
    let entrouNaSala = false

    if(codigoSala) {
        document.querySelector('#pagOpcoes').style.display = 'none'
        db.collection('Salas').onSnapshot((data) => {
            data.docs.map(function(valor) {
            let Salas = valor.data()
    
                if(valor.id == codigoSala && entrouNaSala == false) {
                    entrouNaSala = true
                    trocarBackground(Salas.BackgroundImg)

                    localStorage.setItem('CodigoUltimaSala', codigoSala)

                    //? Vai pegar a hr do servidor
                    let hrTotal
                    obterHoraServidor()
                    .then(HoraGeral => {
                        hrTotal = {
                            Horas:`${HoraGeral.Hora}${HoraGeral.Min}`,
                            Data: `${HoraGeral.Mes}${HoraGeral.Dia}${HoraGeral.Ano}`,
                        }

                        //? Vai mostrar q este user entrou na sala
                        let UserConectados = Salas.UserConectados
                        UserConectados.push({
                            Email: emailUser,
                            ImgPerfil: photoURL,
                            HoraUser: hrTotal
                        })
    
                        db.collection('Salas').doc(valor.id).update({UserConectados: UserConectados})
                    })
                }
    
            })
        })
    }
}

//? Vai sair da sala
function sairDaSala() {
    let saiuDaSala = false
    document.querySelector('#pagOpcoes').style.display = 'none'
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valor) {
        let Salas = valor.data()

            if(valor.id == codigoSala && saiuDaSala == false) {
                saiuDaSala = true
                
                let UserConectados = Salas.UserConectados
                for (let c = 0; c < UserConectados.length; c++) {
                    if(emailUser == UserConectados[c].Email) {
                        UserConectados.splice(c, 1)
                    }
                }

                db.collection('Salas').doc(valor.id).update({UserConectados: UserConectados})

                vltSalaPessoal()
            }
        })
    })
}

function Chat(msg) {    
    try {
        if (event.keyCode === 13 && msg.length > 0) {
            let msgEnviada = false
    
            //? Vai enviar a msg
            db.collection('Salas').onSnapshot((data) => {
                data.docs.map(function(valor) {
                let Salas = valor.data()
    
                if(valor.id == codigoSala && msgEnviada == false) {
                    msgEnviada = true
                    let chatSala = Salas.Chat
                    chatSala.push({
                        EmailUser: emailUser,
                        Msg: msg,
                        ImgUser: photoURL
                    })
                    
                    db.collection('Salas').doc(valor.id).update({Chat: chatSala})
                    document.querySelector('#inputChat').value = ''
                }
    
                })
            })
        }
    } catch{}

}

function carregarChat() {
    let novaMsg = true
    let localMsgChat = document.querySelector('#localMsgChat')
    
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Salas = valor.data()

            if(valor.id == codigoSala) {

                if(novaMsg == true) {
                    novaMsg = false
                    localMsgChat.innerHTML = ''
                }

                setTimeout(() => {
                    novaMsg = true
                }, 1000)

                try {
                    for (let c = 0; c < Salas.Chat.length; c++) {
                        let div = document.createElement('div')
                        let img = document.createElement('img')
                        let p = document.createElement('p')
                      
                        if (Salas.Chat[c].EmailUser == emailUser) {
                          div.className = 'msgsYour'
                        } else {
                          div.className = 'msgsfriend'
                        }
                      
                        img.src = Salas.Chat[c].ImgUser
                        p.innerText = Salas.Chat[c].Msg
                      
                        div.appendChild(img)
                        div.appendChild(p)
                        localMsgChat.appendChild(div)
                        div.scrollIntoView({ behavior: 'smooth', block: 'end' })
                      }
                } catch{}
            }

        })
    })
} carregarChat()
  
//? Vai informar q o user está online de 5 em 5 mins
function informeUserOnline() {
    setInterval(() => {
        let hrAtualizada = false
        if(codigoSala != undefined) {
            db.collection('Salas').onSnapshot((data) => {
                data.docs.map(function(valor) {
                    let Salas = valor.data()
        
                    if(valor.id == codigoSala && hrAtualizada == false) {
                        console.log('Data atualizada')
                        let UserConectados = Salas.UserConectados
                        for(let c = 0; c < UserConectados.length; c++) {
                            if(emailUser == UserConectados[c].Email && hrAtualizada == false) {
                                hrAtualizada = true
                                //? Vai pegar a hr do servidor
                                let hrTotal
                                obterHoraServidor()
                                .then(HoraGeral => {
                                    hrTotal = {
                                        Horas:`${HoraGeral.Hora}${HoraGeral.Min}`,
                                        Data: `${HoraGeral.Mes}${HoraGeral.Dia}${HoraGeral.Ano}`,
                                    }
                                    //? Vai mostrar q este user entrou na sala
                                    UserConectados[c].HoraUser = hrTotal
                                    db.collection('Salas').doc(valor.id).update({UserConectados: UserConectados})
                                })
                            }
                        }
                    }
                })
            })
        }
    }, 30000)
} informeUserOnline()

function carregarInfosDaSala() {
    let entrarEmSalaConectado = false

    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Salas = valor.data()

            //? Vai carregar as imgs de perfil dos users da sala
            if(valor.id == codigoSala){
                const localPerfilUsers = document.querySelector('#localPerfilUsers')
                localPerfilUsers.innerHTML = ''

                for(let c = 0; c < Salas.UserConectados.length; c++) {
                    const img = document.createElement('img')

                    img.src = Salas.UserConectados[c].ImgPerfil

                    localPerfilUsers.appendChild(img)
                }
            }

            //? Vai checar se vc não esta conectado a alguma sala
            if(entrarEmSalaConectado == false && codigoSala == valor.id) {
                for(let c = 0; c < Salas.UserConectados.length; c++) {
                    if(emailUser == Salas.UserConectados[c].Email && entrarEmSalaConectado == false) {
                        entrarEmSalaConectado = true
                        codigoSala = valor.id
                        
                        //? Vai conectar na sala
                        document.getElementsByClassName('backgroundsPage')[0].src = Salas.BackgroundImg
                        document.getElementsByClassName('backgroundsPage')[1].src = Salas.BackgroundImg

                        //? Vai alterar os btns para caso vc esteja dentro da sala, for o host ou n ou esteja fora
                        const foraDaSala = document.getElementsByClassName('foraDaSala')
                        for (let b = 0; b < foraDaSala.length; b++) {
                            foraDaSala[b].style.display = 'none'

                            if(emailUser != Salas.Host) {
                                document.querySelector('#sairDaSala').style.display = 'block'
                            } else {
                                document.querySelector('#excluirSala').style.display = 'block'
                            }
                            
                        }

                        //? Vai pegar a hr do servidor
                        let hrTotal
                        obterHoraServidor()
                        .then(HoraGeral => {
                            hrTotal = {
                                Horas:`${HoraGeral.Hora}${HoraGeral.Min}`,
                                Data: `${HoraGeral.Mes}${HoraGeral.Dia}${HoraGeral.Ano}`,
                            }

                            //? Vai mostrar q este user entrou na sala
                            let UserConectados = Salas.UserConectados
                            UserConectados.HoraUser = hrTotal
        
                            db.collection('Salas').doc(valor.id).update({UserConectados: UserConectados})

                            const localPerfilUsers = document.querySelector('#localPerfilUsers')
                            localPerfilUsers.innerHTML = ''

                            for(let c = 0; c < Salas.UserConectados.length; c++) {
                                const img = document.createElement('img')

                                img.src = Salas.UserConectados[c].ImgPerfil

                                localPerfilUsers.appendChild(img)
                            }

                            carregarChat()
                        })
                    }
                }
            }
        })
    })
} carregarInfosDaSala()

//? Vai abrir o chat gpt
document.querySelector('#chatGPT').addEventListener('click', () => {
    fecharAbasNav()
    document.querySelector('#pagOpcoes').style.display = 'flex'
    document.querySelector('#sectionChatGPT').style.display = 'flex'
})

//? Vai enviar a pergunta para o chat gpt
function enviarPergunta() {
    const prompt = document.querySelector('#inputPerguntaChatGPT').value
    criarTextoChatGPT(prompt, 'User')
    
    if(prompt.length  > 0) {
        const apiKey = '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';
        
        fetch(`https://api.openai.com/v1/completions`, {

            //? Método para enviar os dados
            method: 'POST', 
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 2048,
                temperature: 0.5,
            })
        })
        .then((resposta) => resposta.json())
        .then((dados) => {
            const respostaChatGPT = dados.choices[0].text.replace(/\n/g, "")

            criarTextoChatGPT(respostaChatGPT, 'GPT')
        }).catch(error => {
            alert('Algo deu errado: ' + error)
        })
    }
}

function AtualizarInputChatGPT() {
    if(document.querySelector('#inputPerguntaChatGPT').value.length > 0) {
        document.querySelector('#svgBtnChatGPT').style.color = "white"
        document.querySelector('#btnEnviarMsgChatGPT').style.backgroundColor = "#19c37d"
    } else {
        document.querySelector('#btnEnviarMsgChatGPT').style.backgroundColor = "transparent"
        document.querySelector('#svgBtnChatGPT').style.color = "#6b6b6b"
    }
}

function criarTextoChatGPT(resp, qm = 'User') {
    let localChatGPT = document.querySelector('#localChatGPT')
    let div = document.createElement('div')
    let img = document.createElement('img')
    let p = document.createElement('p')

    if(qm == 'User') {
        div.className = 'perguntaChatGPT'
        img.src = photoURL
        p.innerText = document.querySelector('#inputPerguntaChatGPT').value

    } else {
        div.className = 'respChatGPT'
        img.src = 'Assets/img/icons/chatgptLogo.png'
        p.innerText = resp
    }

    div.appendChild(img)
    div.appendChild(p)
    localChatGPT.appendChild(div)

    document.querySelector('#inputPerguntaChatGPT').value = ''
    AtualizarInputChatGPT()
}