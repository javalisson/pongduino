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
    }

    desenhar() {
        push();
        translate(this.posicao.x, this.posicao.y);
        fill(this.cor);
        noStroke();
        rect(0, 0, this.largura, this.altura);
        pop();
    }
}

class Bola {
    constructor() {
        this.posicao = createVector(0, 0);
        this.dimensoes = 30;
        this.cor = color(255);
        this.velocidade = p5.Vector.fromAngle(random(-QUARTER_PI, QUARTER_PI), 1);
        this.aceleracao = 1;
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
        this.posicao.add(this.velocidade);
        this.velocidade.mult(this.aceleracao);
    }

    desenhar() {
        push();
        translate(this.posicao.x, this.posicao.y);
        fill(this.cor);
        noStroke();
        rect(-this.dimensoes/2, -this.dimensoes/2, this.dimensoes, this.dimensoes);
        pop();
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
var velocidadeInicial = 5;
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

    angMinInicioJog1 = -QUARTER_PI;
    angMaxInicioJog1 = QUARTER_PI;
    angMinInicioJog2 = HALF_PI+QUARTER_PI;
    angMaxInicioJog2 = PI+QUARTER_PI;
        
    campo = new Campo(width, height);

    bastao1 = new Bastao(distanciaBastaoCanto, distanciaBastaoCanto);
    bastao2 = new Bastao(width - distanciaBastaoCanto, distanciaBastaoCanto);

    bola = new Bola();
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
    ellipse(mouseX, mouseY, 50, 50);
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
    bola.setAngulo(HALF_PI+PI/16);
    // bola.setVelocidade(1);
}

