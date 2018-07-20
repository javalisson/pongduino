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
	    this.velocidade.mult(velocidade);
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

class DisplayPontuacao {}

var campo;
var bastao1, bastao2;
var distanciaBastaoCanto = 35;
var bola;

// utilizada para carregar imagens, sons e fontes
function preload() {
    
}

// chamada no inicio do programa
function setup() {
    // canvas do tamanho da tela
    createCanvas(displayWidth, displayHeight);
    
    campo = new Campo(width, height);

    bastao1 = new Bastao(distanciaBastaoCanto, distanciaBastaoCanto);
    bastao2 = new Bastao(width - distanciaBastaoCanto, distanciaBastaoCanto);

    bola = new Bola();
    bola.setPosicao(width/2, height/2);
    bola.setVelocidade(3);
    bola.setAceleracao(1.005);
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

    bola.mover();

}

function mousePressed() {
	fullscreen(true);
	console.log("Resolucao: " + width + " x " + height);
	bola.setAngulo(0);
	// bola.setVelocidade(1);
}

