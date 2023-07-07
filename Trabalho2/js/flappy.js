function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function Barreira(reversa = false) {
    this.elemento = novoElemento('div', 'barreira')
    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`

}

function Carro(larguraJogo){
    let paraEsquerda = false;
    this.elemento = novoElemento('img','carro');
    this.src = 'img/carro.png'
    this.getX = ()=>parseInt(this.elemento.style.left.split('px'[0]))
    this.setX = x => this.elemento.style.left = `${x}px`


}
var time;
function background(area){
    
    const imagens = ['./img/dia01.png', './img/dia02.png']; // Array com os caminhos das imagens
    let indiceImagemAtual = 0;
    
    function trocarImagem() {
      area.style.backgroundImage = `url(${imagens[indiceImagemAtual]})`;
      indiceImagemAtual = (indiceImagemAtual + 1) % imagens.length;
    }
    
    setInterval(trocarImagem, 500);

}

function Rival (alturaJogo,larguraJogo,notificarPonto) {

    this.elemento = novoElemento('img', 'rival')
    this.elemento.src = 'img/carro-verde.png'
    const imagens = ['./img/carro-azul.png', './img/carro-branco.png','./img/carro-verde.png']; 
    const direcaoX = [2.4,-2.4,0]
    const incrementoY = [3,4,5]
    let incrementoAtualY = 0
    let incrementoAtualX = 0

    this.setV = (visivel)=>this.elemento.style.display=visivel
    
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`
    this.getX = ()=>parseInt(this.elemento.style.left.split('px'[0]))
    this.setX = x => this.elemento.style.left = `${x}px`
    let indiceImagemAtual = 0;
    this.animar = () => {
        const novoY = this.getY() -incrementoY[incrementoAtualY]
        const novoX = this.getX() - direcaoX[incrementoAtualX]

        incrementoAtual=(incrementoAtualY+1)%imagens.length
        
        const alturaMaxima = alturaJogo - this.elemento.clientWidth
        const larguraMaxima = larguraJogo - this.elemento.clientHeight
        this.setY(novoY)
        this.setX(novoX)
        if (novoY <= 0) {
            notificarPonto()
            this.setV("none")
            this.elemento.src = imagens[indiceImagemAtual]
            indiceImagemAtual = (indiceImagemAtual + 1) % imagens.length;
            this.setY(alturaJogo/2.3)
            this.setX(larguraJogo / 2.2)

            this.setV("inline")
            incrementoAtualX=(incrementoAtualX+1)%imagens.length

        }
        
    }

    this.setY(alturaJogo / 2.3)
    this.setX(larguraJogo / 2.2)

   
}

 
/* const b= new Barreira(false)
b.setAltura(900)
document.querySelector('[wm-flappy]').appendChild(b.elemento)  */



function ParDeBarreiras(altura, abertura, ) {
    this.elemento = novoElemento('div', 'par-de-barreiras')
    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)


     this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX =  popsicaoNaTela => this.elemento.style.left = `${popsicaoNaTela}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(popsicaoNaTela)
 } 

 /* const b= new ParDeBarreiras(550,250,500)
document.querySelector('[wm-flappy]').appendChild(b.elemento)  
 */

//qreversa ? borda : corpo
function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio
                && par.getX() < meio
            if (cruzouMeio) {
                notificarPonto()
            }
        })
    }
}

/* const barreiras = new Barreiras(500, 300, 100, 400)
const areaDoJogo = document.querySelector('[wm-flappy]') */

/* barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 

setInterval(() => {
    barreiras.animar()
},50)  
 */
function Carro(larguraJogo){
    let paraEsquerda = false;
    this.elemento = novoElemento('img','carro');
    this.src = 'img/carro.png'
    this.getX = ()=>parseInt(this.elemento.style.left.split('px'[0]))
    this.setX = x => this.elemento.style.left = `${x}px`


}

function background(area){
    
    const imagens = ['./img/dia01.png', './img/dia02.png']; // Array com os caminhos das imagens
    let indiceImagemAtual = 0;
    
    function trocarImagem() {
      area.style.backgroundImage = `url(${imagens[indiceImagemAtual]})`;
      indiceImagemAtual = (indiceImagemAtual + 1) % imagens.length;
    }
    
    setInterval(trocarImagem, 500);

}

function Passaro(alturaJogo,larguraJogo) {
    let voando = false
    let direita = false
    let esquerda = false
    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = 'img/passaro.png'

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`
    this.getX = ()=>parseInt(this.elemento.style.left.split('px'[0]))
    this.setX = x => this.elemento.style.left = `${x}px`

  /*   window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false */
    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            esquerda=true
        }
        if (e.key === 'ArrowUp') {
            voando=true
        }
        if (e.key === 'ArrowDown') {
            voando=false
        }
        if (e.key === 'ArrowRight') {
            direita=true
            
        }
    })
    window.addEventListener('keyup', e => {
        if (e.key === 'ArrowLeft') {
            esquerda=false
        }
        if (e.key === 'ArrowRight') {
            direita=false
        }
    })

   
   
    
    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        const novoX = this.getX() + (esquerda ? -10 : 0) + (direita ? 10 : 0)
        
        const alturaMaxima = alturaJogo - this.elemento.clientWidth
        const larguraMaxima = larguraJogo - this.elemento.clientHeight
        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
        if (novoX <= 160) {//se for menor está colidindo com o meio fio a esquerda
            time=1500
            this.setX(160)
        } else if (novoX >= larguraMaxima-160) {//se for maior está colidindo com o meio fio a direita
            time=1500
            this.setX(larguraMaxima-160)
        } else {
            time=500
            this.setX(novoX)
        }

    }
    this.setY(5)
    this.setX(larguraJogo / 2)
}

/* const barreiras = new Barreiras(700, 400, 200, 400)
const passaro = new Passaro(700)

const areaDoJogo = document.querySelector('[wm-flappy]')

areaDoJogo.appendChild(passaro.elemento)
barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 

setInterval(() => {
      barreiras.animar()
      passaro.animar() 
},20) */


 function Progresso() {

    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
        console.log("++1")
    }
    this.atualizarPontos(0)
}

/*  const barreiras = new Barreiras(700, 400, 200, 400)
const passaro = new Passaro(700)

const areaDoJogo = document.querySelector('[wm-flappy]')

areaDoJogo.appendChild(passaro.elemento)
barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento))  */


 function estaoSobrepostos(elementoA, elementoB) {

    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(passaro, rival) {
    let colidiu = false

    
        if (!colidiu) {
            colidiu = estaoSobrepostos(rival.elemento, passaro.elemento)
            
        }
    
    return colidiu

}

 function FlappyBird() {
    let pontos = 0
    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth
/* 
    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, 200, 400,
        () => progresso.atualizarPontos(++pontos)) */
    const progresso = new Progresso()

    const passaro = new Passaro(altura,largura)
    const rival = new Rival(altura, largura,        
        () => progresso.atualizarPontos(++pontos))
    

   /* areaDoJogo.appendChild(progresso.elemento)  */
    areaDoJogo.appendChild(passaro.elemento)
    areaDoJogo.appendChild(rival.elemento)
   /*  barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento)) */

    this.start = () => {
        const temporizador = setInterval(() => {
           /*  barreiras.animar() */
            rival.animar()
            passaro.animar()

               if(colidiu(passaro,rival)){
                 clearInterval(temporizador) 
             }  
        }, 20)
        background(areaDoJogo)
    }
}
 new FlappyBird().start() 