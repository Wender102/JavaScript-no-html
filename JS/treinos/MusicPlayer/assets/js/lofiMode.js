let buttonLofiMode = document.querySelector('#toggle-switch')

let lofiModeAtivo = false
buttonLofiMode.addEventListener('click', () => {
    if(lofiModeAtivo == false) {
        lofiModeAtivo = true
        document.querySelector('body').style.overflow = 'hidden'
        document.querySelector('#pagLofiMode').style.display = 'block'
        
        tocarLoFi()
    } else {
        lofiModeAtivo = false
        document.querySelector('body').style.overflow = 'auto'
        document.querySelector('#pagLofiMode').style.display = 'none'
    }
})

function tocarLoFi() {
    let imgLofiMode = document.querySelector('#imgLofiMode')
    imgLofiMode.src = `assets/img/lofiMode/${Math.floor(Math.random() * 9)}.gif`

    darPlayNaMusica(JSON.parse(localStorage.getItem('Lista')))
}

function hrLofiPc() {
    let hrPcH1 = document.querySelector('#hrPcH1')
    let data = new Date()
    let hr = data.getHours()
    let minutos = data.getMinutes()

    if(hr < 10) {
        hr = `0${hr}`
    }

    if(minutos < 10) {
        minutos = `0${minutos}`
    }

    hrPcH1.innerHTML = `${hr}:${minutos}`
} hrLofiPc()
 
setInterval(() => {
    hrLofiPc()
}, 60000)