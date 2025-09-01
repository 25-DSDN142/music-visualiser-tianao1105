
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20)

  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  let starSpeed = map(bass,0,100, 1, .1);
  push();
  translate(width /3, height /4);
  rotate((frameCount / 50) + starSpeed);
  fill(242, 239, 52, 90)
  star(0, 0, 30, 70, 5);
  pop();
  
}


function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


