class ControleRemoto {
    constructor(tv) {
        this.tv = tv
        this.volume = 0
    }

    //? Método de instância
    aumentarVolume() {
        this.volume += 2
    }

    diminuirVolume() {
        this.volume -= 2
    }

    //? Método estático
    static trocaPilha() {
        console.log('Okay, vou trocar!');
    }
}

const controle1 = new ControleRemoto('LG')
controle1.aumentarVolume()
controle1.aumentarVolume()
controle1.aumentarVolume()
console.log(controle1)

//? Os métodos estáticos funcionam para todos os objs de uma mesma classe, o contrario dos metodos instânciais que são funciona para uma mesmo obj por vez.
//? E para acessa-los, vc precisa chamar a classe e não o obj
ControleRemoto.trocaPilha()