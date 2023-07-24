let imgs = document.querySelectorAll('img')
for(let c = 0; c < imgs.length; c++) {
    imgs[c].addEventListener('click', () => {

        // Obtendo o valor do atributo 'src' da imagem
        var src = imgs[c].getAttribute('src')

        // Obtendo apenas o nome do arquivo da URL
        var nomeArquivo = src.split('/').pop()
        var nomeSemTipo = nomeArquivo.split('.')[0]
        location.href = `Pesquisar.html?=${nomeSemTipo}`
    })
}

