// ===== Meteor system (multiple shooting stars) =====
let meteors = [];

function reset_music() {
  meteors = [];
}

function spawnMeteor(bass) {
  const margin = 50;//The position where the edge appears
  const startY = random(-margin, height * 0.5); // Upper canvas
  const startX = random(-margin, width + margin); // Any position on the top
  const angle = radians(random(20, 35)); // There is a random range in the downward direction to the right and downward
  const speed = map(bass, 0, 100, 2, 10, true);
  return {
    x: startX,
    y: startY,//initial position
    vx: speed * cos(angle),
    vy: speed * sin(angle),
    trail: []
  }
}

function updateAndDrawMeteors(vocal, drum, bass, other) {
  push();
  blendMode(ADD);
  noFill();
  const loudnessGlobal = Math.max(vocal, drum, bass, other);
  strokeWeight(map(loudnessGlobal, 0, 100, 1.5, 3, true));
  const vanishY = height * 0.5; // The spot where the meteor disappeared on the canvas
  //Complete this for loop using QODO GEN
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    m.x += m.vx;
    m.y += m.vy;
    if (m.y >= vanishY) {
      meteors.splice(i, 1);
      continue;
    }
    m.trail.push({ x: m.x, y: m.y });
    if (m.trail.length > 24) m.trail.shift();

    // trail segments
    for (let t = 0; t < m.trail.length - 1; t++) {
      const a = map(t, 0, m.trail.length - 1, 20, 160);
      stroke(150, 180, 255, a);
      const p1 = m.trail[t];
      const p2 = m.trail[t + 1];
      line(p1.x, p1.y, p2.x, p2.y);
    }

    // head
    push();
    translate(m.x, m.y);
    rotate(frameCount / 50);
    noStroke();
    //select the largest number in the sequence
    const loudness = Math.max(vocal, drum, bass, other);
    const headSize = map(loudness, 0, 100, 6, 20, true);
    fill(255, 255, 128, 220);
    star(0, 0, headSize * 0.6, headSize * 0.9, 5);
    pop();

    if (m.x > width + 120 || m.y > height + 120) {
      meteors.splice(i, 1);
    }
  }
  pop();
}

function maybeSpawnMeteors(drum, bass, counter) {
  const maxMeteors = 20;
  let p = map(drum, 0, 100, 0.09, 0.35, true); // Increase the base generation probability(Complete this for loop using QODO GEN)
  if (random() < p) {
    meteors.push(spawnMeteor(bass));
  }
  // Increase the minimum frequency: Generate one every 60 frames (~1 second)
  if (counter / 60 === 0) {
    meteors.push(spawnMeteor(bass));
  }
  // Additional generation occurs when there is a strong drumbeat.
  if (drum > 75 && random() < 0.5) {
    meteors.push(spawnMeteor(bass));
  }
  // upscale protection(Complete this for loop using QODO GEN)
  if (meteors.length > maxMeteors) {
    meteors.splice(0, meteors.length - maxMeteors);
  }
}
// image 
let firstRun = true;
let myImage1;
let secondRun =true;
let myImage2;
let thirdRun =true;
let myImage3;
let ACTION1= true;
let sitImage;
let ACTION2= true;
let flyImage;
let ACTION3= true;
let standImage;
/// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20, 24, 54)
  //word
  textFont('Garamond'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  //Character and background
  if(secondRun){
    myImage2 = loadImage('background.png')
    secondRun = false;
  }
   image(myImage2, 0, 0, width, height);

  if(firstRun){
    myImage1 = loadImage('moon.png') 
    firstRun = false;
  }
   image(myImage1, width*0.85,  height*0.05, 160, 160);

   if(thirdRun){
    myImage3 = loadImage('tent.png') 
    thirdRun = false;
  }
   image(myImage3, width*0.3,  height*0.75, 200, 200);

   if(ACTION1){
    sitImage = loadImage('sit.png') 
    ACTION1 = false;
  }
  if(counter<2000){
   image(sitImage, width*0.5,  height*0.75, 80, 120);
  }
  if(ACTION2){
    flyImage = loadImage('fly.png') 
    ACTION2 = false;
  }
  if(counter>2000&&counter<6000){
   image(flyImage, width*0.8,  height*0.85-counter/15, 80, 120);
  }
  if(ACTION3){
    standImage = loadImage('stand.png') 
    ACTION3 = false;
  }
  if(counter>6000){
   image(standImage, width*0.8,  height*0.4, 80, 120);
  }

    //Lyrics box
    let starSpeed = map(bass,0,100, 1, .1);
    push();
    translate(width /2, height /3);
    rotate((frameCount / 50) + starSpeed);
    stroke(255, 255, 125,50);
    noFill();
    star(0, 0, 80+bass/2, 200+bass, 5);
    stroke(255, 255, 153, 80);
    star(0, 0, 120+drum, 240+drum/2, 5);
    stroke(0, 0, 0, 50);
    star(0, 0, 180+vocal, 240+vocal/2, 5);
    pop();
  
  fill(255);
  // display "words"
   textAlign(CENTER);
   
   textSize(vocal);
   text(words, width/2, height/3);
  
  // meteors: Generation and update (more meteors)
  maybeSpawnMeteors(drum, bass, counter);
  updateAndDrawMeteors(vocal, drum, bass, other);
}

//star(p5.js example)
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


