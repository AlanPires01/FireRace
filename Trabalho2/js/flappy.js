function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
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

 






let tempo=0
const imagens = ['./img/curva01.png', './img/curva02.png']; // Array com os caminhos das imagens

function background(area, pontos) {
    console.log(pontos)
    let indiceImagemAtual = 0;
    function trocarImagem() {
      if (tempo<=5) {
        dia();
        console.log('dia')
      }else if(tempo<=10) {
        noite()
        console.log('curva')
      }else if(tempo<=15){
        
        curva()
        console.log()
      }else{
        tempo=0

      }
      
      area.style.backgroundImage = `url(${imagens[indiceImagemAtual]})`;
      indiceImagemAtual = (indiceImagemAtual + 1) % imagens.length;
      tempo++;
    }
  
    function noite() {
      imagens[0] = './img/noite01.png';
      imagens[1] = './img/noite02.png';
    }
    function curva(){
        imagens[0] = './img/curva01.png'
        imagens[1] = './img/curva02.png'
    }
  
    function dia() {
      imagens[0] = './img/dia01.png';
      imagens[1] = './img/dia02.png';
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

   
   
    let tempoAtual
   let velocidade =5
    this.animar = () => {
        
        const novoY = this.getY() + (voando ? 8 : -5)
        const novoX = this.getX() + (esquerda ? -velocidade : 0) + (direita ? velocidade : 0)
        
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
            velocidade=2
            tempoAtual=tempo

        } else if (novoX >= larguraMaxima-250) {//se for maior está colidindo com o meio fio a direita
            time=1500
            this.setX(larguraMaxima-250)
            velocidade=2
            tempoAtual=tempo
        } else {
            this.setX(novoX)
            if(tempo-tempoAtual>5){
              velocidade=10
            }
        }

    }
    this.setY(5)
    this.setX(larguraJogo / 2)
}


function Progresso() {
    
    this.elemento = novoElemento('span', 'progresso')
    console.log("passeiporaqui")
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
        console.log("++1")
    }
    this.atualizarPontos(0)
}



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
    
    // const musica = document.createElement('audio','audio');
    // musica.src = 'img/musica.mp4'
    // musica.loop = true; // Para repetir a música continuamente
    // areaDoJogo.appendChild(musica);
    areaDoJogo.appendChild(progresso.elemento) 
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
        background(areaDoJogo,pontos)
    }
}
 new FlappyBird().start() 