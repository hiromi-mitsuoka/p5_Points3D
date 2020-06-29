class PointSphere {
  constructor(size = 1.0, num = 100, radius = 100) {
    this._size = size;
    this._num = num;
    this._radius = radius;
    this._pos = [this._num];
    this._rNoise = [this._num];
    this.setPos();
  }
  setPos() {
    for (let i = 0; i < this._num; i++) {
      this._ang = degrees(random(360));
      this._posZ = random(-1, 1);
      this._posX = sqrt(1 - this._posZ * this._posZ) * cos(this._ang);
      this._posY = sqrt(1 - this._posZ * this._posZ) * sin(this._ang);
      this._pos[i] = createVector(this._posX, this._posY, this._posZ);
      this._pos[i].mult(this._radius);
    }
  }
  move() {
    for (let i = 0; i < this._num; i++) {
      this._rNoise[i] = createVector(random(-0.5, 0.5), random(-0.5, 0.5), random(-0.5, 0.5));
      this._pos[i].add(this._rNoise[i]);
    }
  }
  draw() {
    for (let i = 0; i < this._num; i++) {
      push();
      translate(this._pos[i]);
      sphere(this._size);
      pop();
      // strokeWeight(this._size);
      // point(this._pos[i]);
    }
  }
}


let PointsSphere;

function setup() {
  frameRate(30);
  createCanvas(500, 500, WEBGL);
  // stroke(0);
  noStroke();

  PointsSphere = new PointSphere(2.0, 500, 50);
}

function draw() {
  background(0);
  orbitControl();
  directionalLight(200, 200, 200, 100, 300, -300, 300);
  ambientLight(200);
  pointLight(200, 10, 200, 200, 0, 0, 0);
  perspective(PI / 3.0, width / height, 0.1, 800);
  camera(300 * cos(frameCount * 0.02), 100 * sin(frameCount * 0.01), 300 * sin(frameCount * 0.02), 0, 0, 0, 0, 1.0, 0);
  specularMaterial(200, 10, 200, 200);

  //PointSphere
  PointsSphere.move();
  PointsSphere.draw();

  //box
  push();
  translate(0, 0, 0);
  fill(240, 50);
  stroke(250);
  rotateZ(PI / 4);
  box(150);
  line(0, 0, 0, 500, 0, 0);
  line(0, 0, 0, 0, -500, 0);
  line(0, 0, 0, 0, 0, 500);
  pop();
}