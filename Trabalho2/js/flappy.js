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
 
/* const b= new Barreira(false)
b.setAltura(900)
document.querySelector('[wm-flappy]').appendChild(b.elemento)  */



function ParDeBarreiras(altura, abertura, popsicaoNaTela) {
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
var timebackground
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
            console.log('esquerda')
        }
        if (e.key === 'ArrowUp') {
            voando=true
        }
        if (e.key === 'ArrowDown') {
            voando=false
        }
        if (e.key === 'ArrowRight') {
            direita=true
            console.log('direita')
            
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
        const novoX = this.getX() + (esquerda ? -10 : 0) + (direita ? 5 : 0)
        
        const alturaMaxima = alturaJogo - this.elemento.clientWidth
        const larguraMaxima = larguraJogo - this.elemento.clientHeight
        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
            console.log(this.getY())
        }
        if (novoX <= 160) {//se for menor está colidindo com o meio fio a esquerda
            timebackground=1500
            this.setX(160)
            console.log('<=0')
        } else if (novoX >= larguraMaxima-160) {//se for maior está colidindo com o meio fio a direita
            timebackground=1500
            this.setX(larguraMaxima-160)
            console.log('>larguraMax')
        } else {
            timebackground=500
            this.setX(novoX)
            console.log(this.getX())
        }

    }
    this.setY(alturaJogo / 2)
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

function colidiu(passaro, barreiras) {
    let colidiu = false

    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior)
                || estaoSobrepostos(passaro.elemento, inferior)
        }
    })
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

    const passaro = new Passaro(altura,largura)

   /* areaDoJogo.appendChild(progresso.elemento)  */
    areaDoJogo.appendChild(passaro.elemento)
   /*  barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento)) */

    this.start = () => {
        const temporizador = setInterval(() => {
           /*  barreiras.animar() */
            passaro.animar()
          

              /* if(colidiu(passaro,barreiras)){
                 clearInterval(temporizador) 
             }  */
        }, 20)
        background(areaDoJogo)
    }
}
 new FlappyBird().start() 