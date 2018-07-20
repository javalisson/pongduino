/**
 * p5js pongduino
 * 
 * 
 */

class Bastao {
    constructor(x, y) {
        this.largura = 15;
        this.altura = 75;
        this.posicao = createVector(x, y);
        this.cor = color(255);
        this.numJogador = 1;
    }

    setJogador(numJogador) {
        this.numJogador = numJogador;
    }

    desenhar() {
        push();
        translate(this.posicao.x, this.posicao.y);
        fill(this.cor);
        noStroke();
        rect(0, 0, this.largura, this.altura);
        pop();
    }

    getAngulo(y) {
        var alturaRelativa = (y - this.posicao.y ) / this.altura;
        if (alturaRelativa < 0.1) alturaRelativa = 0.1;
        if (alturaRelativa > 0.9) alturaRelativa = 0.9;

        var a, b;

        if (this.numJogador == 1) {
            a = -HALF_PI + PI/16;
            b = HALF_PI - PI/16;
        } else {
            a = PI + HALF_PI - PI/16;
            b = HALF_PI + PI/16;
        }

        var angulo = lerp(a, b, alturaRelativa);
        return angulo;

    }
}

class Bola {
    constructor() {
        this.posicao = createVector(0, 0);
        this.dimensoes = 30;
        this.cor = color(255);
        this.velocidade = p5.Vector.fromAngle(random(-QUARTER_PI, QUARTER_PI), 1);
        this.aceleracao = 1;
        this.velocidadeMaxima = 35;
        this.anteriorX = 0;
    }

    setBastoes(bastao1, bastao2) {
        this.bastao1 = bastao1;
        this.bastao2 = bastao2;
    }

    setPosicao(x, y) {
        this.posicao.x = x;
        this.posicao.y = y;
    }

    setVelocidade(velocidade) {
        var angulo = this.velocidade.heading();
        this.velocidade.x = 1;
        this.velocidade.y = 0;
        this.velocidade.rotate(angulo);
        this.velocidade.mult(abs(velocidade));
    }

    setAngulo(radianos) {
        var velocidade = this.velocidade.mag();
        this.velocidade.x = 1;
        this.velocidade.y = 0;
        this.velocidade.rotate(radianos);
        this.velocidade.mult(velocidade);
    }

    setAceleracao(aceleracao) {
        this.aceleracao = aceleracao;
    }

    mover() {
        if (this.posicao.y < 0) {
            this.posicao.y = 0;
            this.velocidade.y = abs(this.velocidade.y);
        }
        if (this.posicao.y > height) {
            this.posicao.y = height;
            this.velocidade.y = -abs(this.velocidade.y);
        }
        if ((this.isColisao(this.bastao1) == false && this.posicao.y > this.bastao1.posicao.y && this.posicao.y < this.bastao1.posicao.y + this.bastao1.altura && this.posicao.x < this.bastao1.posicao.x) || (this.isColisao(this.bastao2) == false && this.posicao.y > this.bastao2.posicao.y && this.posicao.y < this.bastao2.posicao.y + this.bastao2.altura && this.posicao.x > this.bastao2.posicao.x)) {
            console.log(this.velocidade.mag());
        }
        if (this.isColisao(this.bastao1)) {
            this.posicao.x = this.bastao1.posicao.x + this.bastao1.largura;
            // this.velocidade.x = -this.velocidade.x;
            this.setAngulo(this.bastao1.getAngulo(this.posicao.y));
            if (this.velocidade.mag() < this.velocidadeMaxima) this.velocidade.mult(this.aceleracao);
        }
        if (this.isColisao(this.bastao2)) {
            this.posicao.x = this.bastao2.posicao.x;
            // this.velocidade.x = -this.velocidade.x;
            this.setAngulo(this.bastao2.getAngulo(this.posicao.y));
            if (this.velocidade.mag() < this.velocidadeMaxima) this.velocidade.mult(this.aceleracao);
        }
        this.anteriorX = this.posicao.x;
        this.posicao.add(this.velocidade);
        // if (this.velocidade.mag() < this.velocidadeMaxima) this.velocidade.mult(this.aceleracao);
    }

    desenhar() {
        push();
        translate(this.posicao.x, this.posicao.y);
        fill(this.cor);
        noStroke();
        rect(-this.dimensoes/2, -this.dimensoes/2, this.dimensoes, this.dimensoes);
        pop();
    }

    isColisao(bastao) {
        // bastao.posicao.y = ponta de cima do bastao
        // bastao.posicao.y + bastao.altura = ponta de baixo do bastao
        if (this.posicao.y > bastao.posicao.y && this.posicao.y < bastao.posicao.y + bastao.altura) {
            if (bastao.numJogador == 1) {
                if ((this.anteriorX > bastao.posicao.x && this.posicao.x < bastao.posicao.x)) console.log(this.velocidade.mag());
                if (((this.posicao.x - bastao.posicao.x) > 0 && (this.posicao.x - bastao.posicao.x) < this.dimensoes/2) || (this.anteriorX > bastao.posicao.x && this.posicao.x < bastao.posicao.x)) {
                    return true;
                }
            }
            if (this.anteriorX < bastao.posicao.x && this.posicao.x > bastao.posicao.x) console.log(this.velocidade.mag());;
            if (bastao.numJogador == 2) {    
                if (((this.posicao.x - bastao.posicao.x) > 0 && (this.posicao.x - bastao.posicao.x) < this.dimensoes/2)  || (this.anteriorX < bastao.posicao.x && this.posicao.x > bastao.posicao.x)) {
                    return true;
                }
            }
        }
        
        return false;
    }
}

class Campo {
    constructor(largura, altura) {
        this.largura = largura;
        this.altura = altura;
        this.cor = color(255);
        this.larguraLinha = 4;
        this.comprimentoTraco = 30;
    }

    desenhar() {
        push();
        strokeWeight(this.larguraLinha);
        stroke(this.cor);
        for (var i = this.comprimentoTraco/2; i < this.altura; i += this.comprimentoTraco*2) {
            line(this.largura/2, i, this.largura/2, i + this.comprimentoTraco);         
        }
        pop();
    }
}

class DisplayPontuacao {
    constructor(x, y, pontosIniciais) {
        this.posicao = createVector(x, y);
        this.cor = color(255);
        this.tamanhoFonte = 64;
        this.pontos = pontosIniciais;
    }

    incrementar() {
        this.pontos++;
    }

    desenhar() {
        push();
        translate(this.posicao.x, this.posicao.y);
        textSize(this.tamanhoFonte);
        fill(this.cor);
        noStroke();
        textAlign(CENTER, TOP);
        text(this.pontos, 0, 0);
        pop();
    }
}

var campo;
var bastao1, bastao2;
var bola;
var display1, display2;

var distanciaBastaoCanto = 35;
var velocidadeInicial = 10;
var aceleracao = 1.005;
var angMinInicioJog1;
var angMaxInicioJog1;
var angMinInicioJog2;
var angMaxInicioJog2;

// utilizada para carregar imagens, sons e fontes
function preload() {
    
}

// chamada no inicio do programa
function setup() {
    // canvas do tamanho da tela
    createCanvas(displayWidth, displayHeight);

    noCursor();

    angMinInicioJog1 = -QUARTER_PI;
    angMaxInicioJog1 = QUARTER_PI;
    angMinInicioJog2 = HALF_PI+QUARTER_PI;
    angMaxInicioJog2 = PI+QUARTER_PI;
        
    campo = new Campo(width, height);

    bastao1 = new Bastao(distanciaBastaoCanto, distanciaBastaoCanto);
    bastao2 = new Bastao(width - distanciaBastaoCanto, distanciaBastaoCanto);

    bastao1.setJogador(1);
    bastao2.setJogador(2);

    bola = new Bola();
    bola.setBastoes(bastao1, bastao2);
    bola.setPosicao(width/2, height/2);
    bola.setVelocidade(velocidadeInicial);
    bola.setAngulo(random(angMinInicioJog1, angMaxInicioJog1));
    bola.setAceleracao(aceleracao);

    display1 = new DisplayPontuacao(width/4, distanciaBastaoCanto, 0);
    display2 = new DisplayPontuacao(3*width/4, distanciaBastaoCanto, 0);
}

// chamada toda vez que o quadro for redesenhado
// ou seja, a cada frame da animacao
function draw() {
    // pinta o fundo de preto
    background(0, 0, 0);
    
    bastao1.posicao.y = mouseY;
    bastao2.posicao.y = mouseY;

    campo.desenhar();
    bastao1.desenhar();
    bastao2.desenhar();
    bola.desenhar();
    display1.desenhar();
    display2.desenhar();

    bola.mover();

    if (bola.posicao.x < 0 || bola.posicao.x > width) {
        if (bola.posicao.x < 0) {
            display2.incrementar();
            bola.setAngulo(random(angMinInicioJog2, angMaxInicioJog2));
        }

        if (bola.posicao.x > width) {
            display1.incrementar();
            bola.setAngulo(random(angMinInicioJog1, angMaxInicioJog1));
        }
        bola.setPosicao(width/2, height/2);
        bola.setVelocidade(velocidadeInicial);        
    }

}

function mousePressed() {
    fullscreen(true);
    console.log("Resolucao: " + width + " x " + height);
    bola.setAngulo(0);
    // bola.setVelocidade(1);
}

