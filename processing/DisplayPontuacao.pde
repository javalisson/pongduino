class DisplayPontuacao {
  PVector posicao = new PVector(0, 0);
  color cor = color(255);
  int tamanhoFonte = 64;
  int pontos = 0;

  DisplayPontuacao(float x, float y, int pontosIniciais) {
    this.posicao.x = x;
    this.posicao.y = y;
    this.pontos = pontosIniciais;
  }

  void incrementar() {
    this.pontos++;
  }

  void desenhar() {
    pushMatrix();
    pushStyle();
    translate(this.posicao.x, this.posicao.y);
    textSize(this.tamanhoFonte);
    fill(this.cor);
    noStroke();
    textAlign(CENTER, TOP);
    text(this.pontos, 0, 0);
    popStyle();
    popMatrix();
  }
}