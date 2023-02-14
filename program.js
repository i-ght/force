const XAndOrY = 
  Object.freeze({
    NONE:  0,
    X:     1,
    Y:     2,
    XANDY: 4
  });

let bouncyBall;

class Force {
  constructor(domain, momentum) {
    this.domain = domain;
    this.momentum = momentum;
  }
  
  advance() {
    this.domain.add(this.momentum);
  }
  
  outOfBounds() {
    let x = false;
    let y = false;
    
    if (this.domain.x > width || this.domain.x < 0) {
      x = true;
    }
    if (this.domain.y > height || this.domain.y < 0) {
      y = true;
    }
    
    if (x && y)  {
      return XAndOrY.XANDY;
    }
    if (x && !y) {
      return XAndOrY.X;
    }
    if (y && !x) {
      return XAndOrY.Y;
    }
    
    return XAndOrY.NONE;
  }
}

function setup() {
  createCanvas(333, 333);
  stroke(255, 0, 255);
  bouncyBall =
    new Force(
      createVector(1.618, 1),
      createVector(1.618 * 3, 1 * 3)
    );
}

function draw() {
  background(255);
  circle(bouncyBall.domain.x, bouncyBall.domain.y, 34);
  
  bouncyBall.advance();
  
  let bounds = bouncyBall.outOfBounds();

  if (bounds & XAndOrY.XANDY) {
      console.log("XY");
      bouncyBall.momentum.mult(-1, -1);  
  } else if (bounds & XAndOrY.Y) {
      bouncyBall.momentum.mult(1, -1);
  } else if (bounds & XAndOrY.X) {
      bouncyBall.momentum.mult(-1, 1);
  }
}