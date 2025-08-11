
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20)
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  
   let bar_spacing = height / 10;
   let bar_height = width / 12;
   let bar_pos_x = width / 2;
  
   r=map(vocal,0,100,0,255)
   g= map(drum,0,100,0,255)
   b= map(bass,0,100,0,255)
   col=map(other,0,100,0,255)
 
   noStroke()
   fill(r,g,0)
   for(let x=0 ; x<width ; x +=80){
         ellipse(x,500,10, 10)
         rect(x, 500, 15, 8*vocal)
   }
   fill(r,0,b)
   for(let x=20 ; x<width ; x +=80){
         ellipse(x,500,10, 10)
         rect(x, 500, 15, 8*drum)
   }
   fill(0,g,b)
    for(let x=40 ; x<width ; x +=80){
         ellipse(x,500,10, 10)
         rect(x, 500, 15, 8*bass)
   }
  fill(r,g,col)
    for(let x=60 ; x<width ; x +=80){
         ellipse(x,500,10, 10)
         rect(x, 500, 15, 8*other)
   }
  

   

// // changes 
//    // vocal bar is red
//    fill(200, 0, 0);
//    rect(bar_pos_x, height / 2 + 1 * bar_spacing, 4 * vocal, bar_height);
//    fill(0);
//    text("vocals", bar_pos_x, height / 2 + 1 * bar_spacing + 8);
 
//    // drum bar is green
//    fill(0, 200, 0);
//    rect(bar_pos_x, height / 2 + 2 * bar_spacing, 4 * drum, bar_height);
//    fill(0);
//    text("drums", bar_pos_x, height / 2 + 2 * bar_spacing + 8);
 
//    // bass bar is blue
//    fill(50, 50, 240);
//    rect(bar_pos_x, height / 2 + 3 * bar_spacing, 4 * bass, bar_height);
//    fill(0);
//    text("bass", bar_pos_x, height / 2 + 3 * bar_spacing + 8);
 
//    // other bar is white
//    fill(200, 200, 200);
//    rect(bar_pos_x, height / 2 + 4 * bar_spacing, 4 * other, bar_height);
//    fill(0);
//    text("other", bar_pos_x, height / 2 + 4 * bar_spacing + 8);
//    fill(255, 255, 0);
 
//    // display "words"
//    textAlign(CENTER);
//    textSize(vocal);
//    text(words, width/2, height/3);
}