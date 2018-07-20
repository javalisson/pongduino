class Bola {
  PVector posicao = new PVector(0, 0);
  float dimensoes = 30;
  color cor = color(255);
  float _angMinInicioJog1 = -QUARTER_PI;
  float _angMaxInicioJog1 = QUARTER_PI;
  public PVector velocidade = PVector.fromAngle(random(_angMinInicioJog1, _angMaxInicioJog1 ));
  float aceleracao = 1;
  float velocidadeMaxima = 35;
  Bastao bastao1, bastao2;
  float anteriorX = 0;

  void setBastoes(Bastao bastao1, Bastao bastao2) {
    this.bastao1 = bastao1;
    this.bastao2 = bastao2;
  }

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
    if ((this.isColisao(this.bastao1) == false && this.posicao.y > this.bastao1.posicao.y && this.posicao.y < this.bastao1.posicao.y + this.bastao1.altura && this.posicao.x < this.bastao1.posicao.x) || (this.isColisao(this.bastao2) == false && this.posicao.y > this.bastao2.posicao.y && this.posicao.y < this.bastao2.posicao.y + this.bastao2.altura && this.posicao.x > this.bastao2.posicao.x)) {
      println(this.velocidade.mag());
    }
    if (this.isColisao(this.bastao1)) {
      this.posicao.x = this.bastao1.posicao.x + this.bastao1.largura;
      // this.velocidade.x = -this.velocidade.x;
      this.setAngulo(this.bastao1.getAngulo(this.posicao.y));
      if (this.velocidade.mag() < this.velocidadeMaxima) this.velocidade.mult(this.aceleracao);
    }
    if (this.isColisao(this.bastao2)) {
      this.posicao.x = this.bastao2.posicao.x;
      // this.velocidade.x = -this.velocidade.x;
      this.setAngulo(this.bastao2.getAngulo(this.posicao.y));
      if (this.velocidade.mag() < this.velocidadeMaxima) this.velocidade.mult(this.aceleracao);
    }
    this.anteriorX = this.posicao.x;
    this.posicao.add(this.velocidade);
    if (this.velocidade.mag() < this.velocidadeMaxima) this.velocidade.mult(this.aceleracao);
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

  boolean isColisao(Bastao bastao) {
    // bastao.posicao.y = ponta de cima do bastao
    // bastao.posicao.y + bastao.altura = ponta de baixo do bastao
    if (this.posicao.y > bastao.posicao.y && this.posicao.y < bastao.posicao.y + bastao.altura) {
      if (bastao.numJogador == 1) {
        if ((this.anteriorX > bastao.posicao.x && this.posicao.x < bastao.posicao.x)) println(this.velocidade.mag());
        if (((this.posicao.x - bastao.posicao.x) > 0 && (this.posicao.x - bastao.posicao.x) < this.dimensoes/2) || (this.anteriorX > bastao.posicao.x && this.posicao.x < bastao.posicao.x)) {
          return true;
        }
      }
      if (this.anteriorX < bastao.posicao.x && this.posicao.x > bastao.posicao.x) println(this.velocidade.mag());
      ;
      if (bastao.numJogador == 2) {    
        if (((this.posicao.x - bastao.posicao.x) > 0 && (this.posicao.x - bastao.posicao.x) < this.dimensoes/2)  || (this.anteriorX < bastao.posicao.x && this.posicao.x > bastao.posicao.x)) {
          return true;
        }
      }
    }

    return false;
  }
}