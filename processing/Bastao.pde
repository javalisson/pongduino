class Bastao {
  public PVector posicao;
  float largura = 15, altura = 75;
  color cor = color(255);

  Bastao(float x, float y) {
    posicao = new PVector(x, y);
  }

  void desenhar() {
    pushMatrix();
    pushStyle();
    translate(posicao.x, posicao.y);
    fill(cor);
    noStroke();
    rect(0, 0, largura, altura);
    popStyle();
    popMatrix();
  }
}