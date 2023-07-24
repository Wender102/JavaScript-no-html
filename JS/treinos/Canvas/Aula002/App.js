const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//# Vai deixar o canvas no tamanho da tela sem perder proporção
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    desenhar()
} resizeCanvas()
window.addEventListener('resize', resizeCanvas)

function desenhar() {
    const metadeW = window.innerWidth / 2
    const metadeH = window.innerHeight / 2

    ctx.fillStyle = '#fff' //* Definir preenchimento: ctx.fillStyle: "css"


    ctx.fillRect(0, 0, 100, 100) //* fillRect(x, y, largura, altura) vai pegar o ultimo estilo acima

    ctx.fillStyle = 'blue'
    ctx.rect(100, 100, 100, 100) //* Não vai preencher
    ctx.fill()

    ctx.clearRect(metadeW, metadeH, 100, 100) //* Vai apagar, como se fosse uma borracha
}