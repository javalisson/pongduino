void setup() {
  fullScreen();
}

void draw() {
  background(0);
  ellipse(mouseX, mouseY, 50, 50);
}

void mousePressed() {
  println("Resolucao: " + width + " x " + height);
}