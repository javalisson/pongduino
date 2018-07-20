// the setup function runs once when you press reset or power the board
void setup() {
  // put your setup code here, to run once:
  
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(13, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  // put your main code here, to run repeatedly:

  digitalWrite(13, 1);   // turn the LED on (HIGH is the voltage level)
  delay(100);                       // wait for a second
  digitalWrite(13, 0);    // turn the LED off by making the voltage LOW
  delay(300); 
}
