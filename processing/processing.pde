Campo campo;
Bastao bastao1, bastao2;
Bola bola;
float distanciaBastaoCanto = 35;

void setup() {
  fullScreen();
  
  campo = new Campo(width, height);
  
  bastao1 = new Bastao(distanciaBastaoCanto, distanciaBastaoCanto);
  bastao2 = new Bastao(width - distanciaBastaoCanto, distanciaBastaoCanto);
  
  bola = new Bola();
  bola.setPosicao(width/2, height/2);
  bola.setVelocidade(1);
  bola.setAceleracao(1.005);
}

void draw() {
  background(0);
  ellipse(mouseX, mouseY, 50, 50);
  campo.desenhar();
  bastao1.desenhar();
  bastao2.desenhar();
  bola.desenhar();

  bola.mover();
}

void mousePressed() {
  println("Resolucao: " + width + " x " + height);
  bola.setAngulo(0);
  // bola.setVelocidade(1);
}