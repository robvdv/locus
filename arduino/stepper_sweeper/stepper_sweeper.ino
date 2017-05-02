/*
   BYJ48 Stepper motor code
   Connect :
   IN1 >> D8
   IN2 >> D9
   IN3 >> D10
   IN4 >> D11
   VCC ... 5V Prefer to use external 5V Source
   Gnd
   written By :Mohannad Rawashdeh
  http://www.instructables.com/member/Mohannad+Rawashdeh/
     28/9/2013
  */

#define IN1  8
#define IN2  9
#define IN3  10
#define IN4  11
int Steps = 0;
boolean Direction = true;// gre
unsigned long last_time;
unsigned long currentMillis ;
long stepsPerRevolution = 4095;
long steps_left=4095;
float rpm = 0.25;
int maxAngle = 360;
long time;

// calculated vars
int lastAngle = 0;
int currentAngle = 0;
int stepsPerSweep;
long microsPerStep;

// Comms  variables
//buffer size for NMEA compliant GPS string
//For Razor, set value to 17 instead
#define DATABUFFERSIZE      80
char dataBuffer[DATABUFFERSIZE+1]; //Add 1 for NULL terminator
byte dataBufferIndex = 0;
char startChar = '!'; // or '$', or whatever your start character is
char endChar = '\n';  // NOT /r
boolean storeString = false; //This will be our flag to put the data in our buffer


void setup()
{
  Serial.begin(9600);
  pinMode(IN1, OUTPUT); 
  pinMode(IN2, OUTPUT); 
  pinMode(IN3, OUTPUT); 
  pinMode(IN4, OUTPUT); 
  // delay(1000);
  stepsPerSweep = stepsPerRevolution / (360 / maxAngle);
  Serial.println("Steps per sweep:");
  Serial.println(String(stepsPerSweep)); 
  microsPerStep = 60L * 1000 * 1000 / stepsPerRevolution / rpm;
  Serial.println("Microseconds per step:");
  Serial.println(String(microsPerStep)); 
}

void loop()
{

  if(getSerialString()){
    //String available for parsing.  Parse it here
    Serial.println("Received buffer: ");
  }
  
  steps_left=stepsPerSweep;
 

  while(steps_left>0) {
    currentMillis = micros();

    currentAngle =  steps_left  * maxAngle / stepsPerSweep;
    if (currentAngle != lastAngle) {
      lastAngle = currentAngle;
      if (Direction) {
        Serial.println(String(maxAngle - currentAngle));    
      } else {
        Serial.println(String(currentAngle));  
      }
    }
    
    if(currentMillis-last_time>=microsPerStep){
      stepper(1); 
      time=time+micros()-last_time;
      last_time=micros();
      steps_left--;
    }
  }

  //Direction=!Direction;
 
}

void stepper(int xw){
  for (int x=0;x<xw;x++){
    switch(Steps){
       case 0:
         digitalWrite(IN1, LOW); 
         digitalWrite(IN2, LOW);
         digitalWrite(IN3, LOW);
         digitalWrite(IN4, HIGH);
       break; 
       case 1:
         digitalWrite(IN1, LOW); 
         digitalWrite(IN2, LOW);
         digitalWrite(IN3, HIGH);
         digitalWrite(IN4, HIGH);
       break; 
       case 2:
         digitalWrite(IN1, LOW); 
         digitalWrite(IN2, LOW);
         digitalWrite(IN3, HIGH);
         digitalWrite(IN4, LOW);
       break; 
       case 3:
         digitalWrite(IN1, LOW); 
         digitalWrite(IN2, HIGH);
         digitalWrite(IN3, HIGH);
         digitalWrite(IN4, LOW);
       break; 
       case 4:
         digitalWrite(IN1, LOW); 
         digitalWrite(IN2, HIGH);
         digitalWrite(IN3, LOW);
         digitalWrite(IN4, LOW);
       break; 
       case 5:
         digitalWrite(IN1, HIGH); 
         digitalWrite(IN2, HIGH);
         digitalWrite(IN3, LOW);
         digitalWrite(IN4, LOW);
       break; 
         case 6:
         digitalWrite(IN1, HIGH); 
         digitalWrite(IN2, LOW);
         digitalWrite(IN3, LOW);
         digitalWrite(IN4, LOW);
       break; 
       case 7:
         digitalWrite(IN1, HIGH); 
         digitalWrite(IN2, LOW);
         digitalWrite(IN3, LOW);
         digitalWrite(IN4, HIGH);
       break; 
       default:
         digitalWrite(IN1, LOW); 
         digitalWrite(IN2, LOW);
         digitalWrite(IN3, LOW);
         digitalWrite(IN4, LOW);
       break; 
      }
    SetDirection();
  }
} 
void SetDirection(){
  if(Direction==1){ 
    Steps++;
  }
  if(Direction==0){ 
    Steps--; 
  }
  if(Steps>7){
    Steps=0;
  }
  if(Steps<0){
    Steps=7; 
  }
}

// Serial comms: http://jhaskellsblog.blogspot.co.za/2011/05/serial-comm-fundamentals-on-arduino.html
boolean getSerialString(){
    static byte dataBufferIndex = 0;
    while(Serial.available()>0){
        char incomingbyte = Serial.read();
        if(incomingbyte==startChar){
            dataBufferIndex = 0;  //Initialize our dataBufferIndex variable
            storeString = true;
        }
        if(storeString){
            //Let's check our index here, and abort if we're outside our buffer size
            //We use our define here so our buffer size can be easily modified
            if (dataBufferIndex==DATABUFFERSIZE){
                //Oops, our index is pointing to an array element outside our buffer.
                dataBufferIndex = 0;
                break;
            }
            if(incomingbyte==endChar){
                dataBuffer[dataBufferIndex] = 0; //null terminate the C string
                //Our data string is complete.  return true
                return true;
            }
            else{
                dataBuffer[dataBufferIndex++] = incomingbyte;
                dataBuffer[dataBufferIndex] = 0; //null terminate the C string
            }
        }
        else{
        }
    }
   
    //We've read in all the available Serial data, and don't have a valid string yet, so return false
    return false;
}


