let inputName = document.querySelector('#inputName')
function login() {
    if(inputName.value.length > 0) {
        auth.signInWithPopup(provider)

    } else {
        inputName.className = 'inputVazio'
        setTimeout(() => {
            inputName.className = ''
        }, 2000)
    }
}

let email1
let emailConectado
auth.onAuthStateChanged((val) => {
    try {
        if(val.email) {
            email1 = val.email

            //? Vai checar se o user logado tem uma conta ou não
            let temConta = false
            function checkUsers() {
                return new Promise((resolve, reject) => {
                    db.collection('Users').onSnapshot((data) => {
                    data.docs.map(function (valor) {
                        let Users = valor.data()

                        if (Users.Email == email1) {
                            temConta = true
                        }
                    })

                        resolve() // Indica que a verificação foi concluída
                    })
                })
            }

            checkUsers()
            .then(() => {

                if (!temConta) {
                    // Executa a ação se temConta ainda for falsa
                    console.log('Email não encontrado. criamos uma conta novinha para vc!')
                    const ContaUser = {
                        Email: email1,
                        WishList: [],
                        MyCart: [],
                        FullName: inputName.value,
                        Number: '',
                        Location: {
                            Estado: 'Goiás',
                            Cidade: 'Formosa',
                            Bairro: '',
                            RuaAvenida: '',
                            CEP: ''
                        }
                    } 
                    
                    db.collection('Users').add(ContaUser).then(() => {
                        location.href = 'Home.html'
                    })

                } else {
                    console.log('Email localizado.')
                    if(confirm(`Você já tem uma conta cadastrada: ${email1}. Deseja se conectar com este email?`)) {
                        location.href = 'Home.html'
                    }
                }
            })
            .catch((error) => {
                // Lida com possíveis erros na verificação
                console.error(error)
            })
        }
    }catch(e){console.warn(e)}
})