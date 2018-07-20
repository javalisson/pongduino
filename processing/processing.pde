Campo campo;
Bastao bastao1, bastao2;
float distanciaBastaoCanto = 35;

void setup() {
  fullScreen();
  
  campo = new Campo(width, height);
  
  bastao1 = new Bastao(distanciaBastaoCanto, distanciaBastaoCanto);
  bastao2 = new Bastao(width - distanciaBastaoCanto, distanciaBastaoCanto);
}

void draw() {
  background(0);
  ellipse(mouseX, mouseY, 50, 50);
  campo.desenhar();
  bastao1.desenhar();
  bastao2.desenhar();
}

void mousePressed() {
  println("Resolucao: " + width + " x " + height);
}