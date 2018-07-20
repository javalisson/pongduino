class Bastao {
  public PVector posicao;
  float largura = 15, altura = 75;
  
  Bastao(float x, float y) {
    posicao = new PVector(x, y);
  }
  
  void desenhar() {
    pushMatrix();
    pushStyle();
    translate(posicao.x, posicao.y);
    rect(0, 0, largura, altura);
    popStyle();
    popMatrix();
  }

}