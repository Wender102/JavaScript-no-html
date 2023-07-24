//? Vai checar se o user já tem uma conta
auth.onAuthStateChanged((val) => {

    //? Vai tentar acessar o email do user
    try {
        if(val.email) {
            db.collection('Users').where('Email', '==', val.email).get()
            .then((querySnapshot) => {
               //? Caso encontre o email
               
               //* Vai pegar as infos do user
               let infosCarregadas = false
               querySnapshot.forEach((doc) => {
                   const UserData = doc.data()
                    if(infosCarregadas == false) {
                        infosCarregadas = true

                        trocarBackground(UserData.SalaUser.BackgroundImg).then(() => {
                            //* Vai fechar o carregamento
                            setTimeout(() => {
                                document.querySelector('#carregamento').className = 'carregandoFechado'
                                setTimeout(() => {
                                    document.querySelector('#carregamento').style.display = 'none'
                                }, 800)
                            }, 2000)
                        })
                    }

               })
            })
        }

    //? Caso n consiga
    } catch (error) {
        setTimeout(() => {
            location.href = 'Login.html'
        }, 2000)
    }
})

//? Vai trocar o backgrounde da página
function trocarBackground(Img = 'http://127.0.0.1:5500/Assets/img/backgrounds/0.png') {
    return new Promise((resolve, reject) => {
        if(Img == undefined) {
            Img = 'http://127.0.0.1:5500/Assets/img/backgrounds/0.png'
        }
    
        try {
            console.log(Img);
            let backgroundImg1 = document.getElementsByClassName('backgroundsPage')[0]
            let backgroundImg2 = document.getElementsByClassName('backgroundsPage')[1]
    
            backgroundImg2.src = backgroundImg1.src
    
            backgroundImg1.src = Img
            backgroundImg2.id = 'hide'
            
            setTimeout(() => {
                backgroundImg2.src = Img
                backgroundImg2.id = ''
            }, 500)

            resolve()
        } catch (error) {
            console.warn(error)
            alert('Não conseguimos carregar seu background, error: ' + error)
            trocarBackground('http://127.0.0.1:5500/Assets/img/backgrounds/0.png')
            reject()
        }
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