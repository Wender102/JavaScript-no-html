let localImgProducts = document.getElementsByClassName('localImgProducts')
let contador = 0
for(let c = 0; c < localImgProducts.length; c++) {
    if(contador > 2) {
        contador = 0
    }
    localImgProducts[c].style.backgroundImage = `url("assets/img/Produtos/${contador}.png")`
    contador++
}

window.addEventListener('resize', redimencionarTela)

function redimencionarTela() {
    let tmhTela = window.visualViewport.width
    let tamanhoProducts = document.getElementsByClassName('products')[0].getBoundingClientRect()
    let qntProdutosNaTela = Math.floor(parseInt(tmhTela) / parseInt(tamanhoProducts.width)) //? Vai verificar qnts produtos cabem na tela
    let tamanhaMargin = qntProdutosNaTela * 10
    let tamanhoLocalProdutosRedimencionado = qntProdutosNaTela * tamanhoProducts.width
    // document.getElementById('localProducts').style.columnCount = qntProdutosNaTela
    document.querySelector('main').style.width = `${((tamanhoLocalProdutosRedimencionado * 2) / 100) + tamanhoLocalProdutosRedimencionado + tamanhaMargin}px`
} redimencionarTela()