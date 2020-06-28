class Point3D {
  constructor(pos, vel, size) {
    this._pos = pos;
    this._vel = vel;
    this._size = size;
  }

  move() {
    if (this._pos.x < -boxSize / 2 + this._size / 2 || this._pos.x > boxSize / 2 - this._size / 2) {
      this._vel.x *= -1;
    }
    if (this._pos.y < -boxSize / 2 + this._size / 2 || this._pos.y > boxSize / 2 - this._size / 2) {
      this._vel.y *= -1;
    }
    if (this._pos.z < -boxSize / 2 + this._size / 2 || this._pos.z > boxSize / 2 - this._size / 2) {
      this._vel.z *= -1;
    }

    this._pos.add(this._vel);
  }

  changeColor() { }

  update() {
    this.move();
  }

  draw() {
    stroke(255);
    strokeWeight(this._size);
    translate(0, 0, 0);
    point(this._pos.x, this._pos.y, this._pos.z);
  }

  get pos() {
    return this._pos;
  }

  set size(value) {
    this._size = value;
  }
}


// Points3D
let points3D = [];
const point3DNum = 100;
let pointScale;
let velScale = 3.0;
// box
let boxSize = 200;

function setup() {
  createCanvas(500, 500, WEBGL);
  perspective(PI / 3.0, width / height, 0.1, 800);
  // Points3D
  pointScale = boxSize / 2;
  for (let i = 0; i < point3DNum; i++) {
    let pos = createVector(random() * 2.0 - 1.0, random() * 2.0 - 1.0, random() * 2.0 - 1.0); //-1~1
    pos.mult(pointScale);
    let vel = createVector(random() * 2.0 - 1.0, random() * 2.0 - 1.0, random() * 2.0 - 1.0); //-1~1
    vel.mult(velScale);
    let size = random(20);
    points3D[i] = new Point3D(pos, vel, size);
  }
}

function draw() {
  background(10);
  // camera
  orbitControl();
  directionalLight(200, 200, 200, 0, 0, 400);
  ambientLight(200);
  rotateY(frameCount * 0.005);

  // Points3D
  for (let i = 0; i < point3DNum; i++) {
    points3D[i].update();
    points3D[i].draw();
  }
  // box
  fill(255, 10);
  strokeWeight(1.0);
  box(boxSize);
}