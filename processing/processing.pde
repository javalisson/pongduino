Campo campo;
Bastao bastao1, bastao2;
Bola bola;

DisplayPontuacao display1, display2;

float distanciaBastaoCanto = 35;
float velocidadeInicial = 3;
float aceleracao = 1.005;
float angMinInicioJog1;
float angMaxInicioJog1;
float angMinInicioJog2;
float angMaxInicioJog2;

void setup() {
  fullScreen();

  angMinInicioJog1 = -QUARTER_PI;
  angMaxInicioJog1 = QUARTER_PI;
  angMinInicioJog2 = HALF_PI+QUARTER_PI;
  angMaxInicioJog2 = PI+QUARTER_PI;

  campo = new Campo(width, height);

  bastao1 = new Bastao(distanciaBastaoCanto, distanciaBastaoCanto);
  bastao2 = new Bastao(width - distanciaBastaoCanto, distanciaBastaoCanto);

  bola = new Bola();
  bola.setBastoes(bastao1, bastao2);
  bola.setPosicao(width/2, height/2);
  bola.setVelocidade(1);
  bola.setAceleracao(aceleracao);

  display1 = new DisplayPontuacao(width/4, distanciaBastaoCanto, 0);
  display2 = new DisplayPontuacao(3*width/4, distanciaBastaoCanto, 0);
}

void draw() {
  background(0);
  ellipse(mouseX, mouseY, 50, 50);
  
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

void mousePressed() {
  println("Resolucao: " + width + " x " + height);
  bola.setAngulo(0);
  // bola.setVelocidade(1);
}