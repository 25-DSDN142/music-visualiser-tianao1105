// ===== Meteor system (multiple shooting stars) =====
let meteors = [];

function reset_music() {
  meteors = [];
}

function spawnMeteor(bass) {
  const margin = 80;
  const startY = random(-margin, height * 0.5); // 上半画布
  const startX = random(-margin, width + margin); // 顶部任意位置
  const angle = radians(random(20, 35)); // 向右下的斜率
  const speed = map(bass, 0, 100, 5, 14, true);
  return {
    x: startX,
    y: startY,
    vx: speed * cos(angle),
    vy: speed * sin(angle),
    trail: []
  };
}

function updateAndDrawMeteors(vocal, drum, bass, other) {
  push();
  blendMode(ADD);
  noFill();
  const loudnessGlobal = Math.max(vocal, drum, bass, other);
  strokeWeight(map(loudnessGlobal, 0, 100, 1.5, 3, true));
  const vanishY = height * 0.75; // 在画布高度的 3/4 处消失
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
    rotate(atan2(m.vy, m.vx));
    noStroke();
    const loudness = Math.max(vocal, drum, bass, other);
    const headSize = map(loudness, 0, 100, 6, 20, true);
    fill(242, 239, 252, 220);
    star(0, 0, headSize * 0.4, headSize * 1.2, 5);
    pop();

    if (m.x > width + 120 || m.y > height + 120) {
      meteors.splice(i, 1);
    }
  }
  pop();
}

function maybeSpawnMeteors(drum, bass, counter) {
  const maxMeteors = 20;
  let p = map(drum, 0, 100, 0.08, 0.35, true); // 提高基础生成概率
  if (random() < p) {
    meteors.push(spawnMeteor(bass));
  }
  // 提高保底频率：每 60 帧（~1 秒）生成一颗
  if (counter % 60 === 0) {
    meteors.push(spawnMeteor(bass));
  }
  // 强鼓点时额外生成
  if (drum > 75 && random() < 0.5) {
    meteors.push(spawnMeteor(bass));
  }
  // 上限保护
  if (meteors.length > maxMeteors) {
    meteors.splice(0, meteors.length - maxMeteors);
  }
}

/// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20, 24, 54)

  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);

  // let starSpeed = map(bass,0,100, 1, .1);
  // push();
  // translate(width /2, height /3);
  // rotate((frameCount / 50) + starSpeed);
  // fill(242, 239, 52, 99)
  // star(0, 0, 30+bass/2, 70+bass, 5);
  // pop();

  // display "words"
   textAlign(CENTER);
   textSize(vocal);
   text(words, width/2, height/3);
  
  // meteors: 生成与更新（更多流星）
  maybeSpawnMeteors(drum, bass, counter);
  updateAndDrawMeteors(vocal, drum, bass, other);
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


