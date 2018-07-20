class Campo {
  float largura, altura;
  color cor = color(255);
  float larguraLinha = 4;
  float comprimentoTraco = 30;

  Campo(float largura, float altura) {
    this.largura = largura;
    this.altura = altura;
  }

  void desenhar() {
    pushStyle();
    strokeWeight(larguraLinha);
    stroke(cor);
    for (float i = this.comprimentoTraco / 2; i < this.altura; i += this.comprimentoTraco * 2) {
      line(this.largura / 2, i, this.largura / 2, i + this.comprimentoTraco);
    }
    popStyle();
  }
}