class Bastao {
  public PVector posicao;
  float largura = 15, altura = 75;
  color cor = color(255);
  int numJogador = 1;

  Bastao(float x, float y) {
    posicao = new PVector(x, y);
  }

  void setJogador(int numJogador) {
    this.numJogador = numJogador;
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

  float getAngulo(float y) {
    float alturaRelativa = (y - this.posicao.y ) / this.altura;
    if (alturaRelativa < 0.1) alturaRelativa = 0.1;
    if (alturaRelativa > 0.9) alturaRelativa = 0.9;

    float a, b;

    if (this.numJogador == 1) {
      a = -HALF_PI + PI/16;
      b = HALF_PI - PI/16;
    } else {
      a = PI + HALF_PI - PI/16;
      b = HALF_PI + PI/16;
    }

    float angulo = lerp(a, b, alturaRelativa);
    return angulo;
  }
}