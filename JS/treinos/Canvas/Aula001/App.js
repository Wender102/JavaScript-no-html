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
    ctx.fillStyle = '#fff' //* Definir preenchimento: ctx.fillStyle: "css"


    ctx.fillRect(0, 0, 100, 100) //* fillRect(x, y, largura, altura) vai pegar o ultimo estilo acima

    ctx.fillStyle = 'blue'
    ctx.fillRect(100, 100, 100, 100)
}