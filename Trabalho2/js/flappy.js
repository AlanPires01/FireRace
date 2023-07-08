var tempo=0 // funcao usada para contar o tempo a cada segundo
function contaTempo(){
    tempo++
    console.log("tempo" + tempo)
}
setInterval(contaTempo,1000)



function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}



function Elemento(alturaJogo,larguraJogo,notificarPonto,passaro){
    this.elemento = novoElemento('img', 'ferramenta')
    this.elemento.src = 'img/ferramenta01.png'
    const imagensE = ['./img/ferramenta01.png', './img/ferramenta03.png','./img/ferramenta04.png']; 
    const direcaoX = [2.4,-2.4,0]
    const incrementoY = [1,2,5]
    let incrementoAtualY = 0
    let incrementoAtualX = 0
    let passou=false

    this.setV = (visivel)=>this.elemento.style.display=visivel
    
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`
    this.getX = ()=>parseInt(this.elemento.style.left.split('px'[0]))
    this.setX = x => this.elemento.style.left = `${x}px`
    let indiceImagemAtual = 0;
    let contador=0
    this.animar = () => {
        const novoY = this.getY() -incrementoY[incrementoAtualY]
        const novoX = this.getX() - direcaoX[incrementoAtualX]
        incrementoAtualY=(incrementoAtualY+1)%imagensE.length
        
        const alturaMaxima = alturaJogo - this.elemento.clientWidth
        const larguraMaxima = larguraJogo - this.elemento.clientHeight
        this.setY(novoY)
        this.setX(novoX)
       
        
        if ((this.elemento.style.display.trim()==='none')&&(contador>=100)) {
            console.log("entrou")
            this.setV('inline');
            this.elemento.src = imagensE[indiceImagemAtual]
            indiceImagemAtual = (indiceImagemAtual + 1) % imagens.length;
            this.setY(alturaJogo/2.3)
            this.setX(larguraJogo / 2.2)

           
            incrementoAtualX=(incrementoAtualX+1)%imagens.length
            contador=0

        }
        if((novoX<=0)||(novoX>=larguraMaxima)||(novoY<=0)){
            this.setV("none")
        }
        contador++
       
        
        
    }
    this.setY(alturaJogo/2.3)
        this.setX(larguraJogo / 2.2)
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

 






let sentidoCurva //variavel para indicar sentido da curva 0 - nao tem curva, 1-curva para esquerda , 2 - curva para direita
const imagens = ['./img/curva01.png', './img/curva02.png']; // Array com os caminhos das imagens
let trocar=0
function background(area, pontos) {
    console.log(pontos)
    let indiceImagemAtual = 0;
    function trocarImagem() {
      if (trocar<=10) {
        dia();
      }else if(trocar<=20) {
        noite()
      }else if(trocar<=30){
        curva()
      }else{
        trocar=0

      }
      
      area.style.backgroundImage = `url(${imagens[indiceImagemAtual]})`;
      indiceImagemAtual = (indiceImagemAtual + 1) % imagens.length;
      trocar++;
    }
  
    function noite() {
      imagens[0] = './img/noite01.png';
      imagens[1] = './img/noite02.png';
      sentidoCcurva=0
    }
    function curva(){
        imagens[0] = './img/curva01.png'
        imagens[1] = './img/curva02.png'
        sentidoCurva=-2
    }
  
    function dia() {
      imagens[0] = './img/dia01.png';
      imagens[1] = './img/dia02.png';
      sentidoCurva=0
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
        const novoX = this.getX() + (esquerda ? -velocidade : 0) + (direita ? velocidade : 0) + sentidoCurva
        
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
    const elemento = new Elemento(altura, largura,        
        () => progresso.atualizarPontos(++pontos),passaro)

    
    // const musica = document.createElement('audio','audio');
    // musica.src = 'img/musica.mp4'
    // musica.loop = true; // Para repetir a música continuamente
    // areaDoJogo.appendChild(musica);
    areaDoJogo.appendChild(progresso.elemento) 
    areaDoJogo.appendChild(passaro.elemento)
    areaDoJogo.appendChild(rival.elemento)
    areaDoJogo.appendChild(elemento.elemento)

   /*  barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento)) */

    this.start = () => {
        const temporizador = setInterval(() => {
           /*  barreiras.animar() */
            rival.animar()
            passaro.animar()
            elemento.animar()
               if(colidiu(passaro,rival)){
                 clearInterval(temporizador) 
                }  
                if (colidiu(passaro,elemento)) {
                    progresso.atualizarPontos(pontos+2)

                    elemento.elemento.style.display="none"
    
                    
                }
             window.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                  location.reload();
                }
              });
        }, 20)
        background(areaDoJogo,pontos)
    }
}
 new FlappyBird().start()