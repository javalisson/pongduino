class Bola {
  PVector posicao = new PVector(0, 0);
  float dimensoes = 30;
  color cor = color(255);
  float _angMinInicioJog1 = -QUARTER_PI;
  float _angMaxInicioJog1 = QUARTER_PI;
  public PVector velocidade = PVector.fromAngle(random(_angMinInicioJog1, _angMaxInicioJog1 ));
  float aceleracao = 1;

  void setPosicao(float x, float y) {
    this.posicao.x = x;
    this.posicao.y = y;
  }

  void setVelocidade(float velocidade) {
    float angulo = this.velocidade.heading();
    this.velocidade.x = 1;
    this.velocidade.y = 0;
    this.velocidade.rotate(angulo);
    this.velocidade.mult(abs(velocidade));
  }

  void setAceleracao(float aceleracao) {
    this.aceleracao = aceleracao;
  }

  void setAngulo(float radianos) {
    float velocidade = this.velocidade.mag();
    this.velocidade.x = 1;
    this.velocidade.y = 0;
    this.velocidade.rotate(radianos);
    this.velocidade.mult(velocidade);
  }

  void mover() {
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

  void desenhar() {
    pushMatrix();
    pushStyle();
    translate(this.posicao.x, this.posicao.y);
    fill(this.cor);
    noStroke();
    rect(-this.dimensoes/2, -this.dimensoes/2, this.dimensoes, this.dimensoes);
    pushStyle();
    popMatrix();
  }
}