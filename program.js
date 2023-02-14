const XAndOrY = 
  Object.freeze({
    NONE:  0,
    X:     1,
    Y:     2
  });

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
      return XAndOrY.X | XAndOrY.Y;
    }
    else if (x && !y) {
      return XAndOrY.X;
    }
    else if (y && !x) {
      return XAndOrY.Y;
    } /*else {*/
      
    return XAndOrY.NONE;
    
    /*}*/
  }
}

class BouncyBall extends Force {
  
}

const X = 0;
const Y = 1;

let bouncyBall;

function constructBouncyBall() {
  
  const domainXY = [1.1618, 1];
  const domain = createVector(domainXY[X], domainXY[Y]);
  
  const momentumXY = [1.618 * 3, 3];
  const momentum = createVector(momentumXY[X], momentumXY[Y]);
  
  return new BouncyBall(
      domain,
      momentum
  );
}

function setup() {
  createCanvas(333, 333);
  stroke(255, 0, 255);
  bouncyBall = constructBouncyBall();
}

function draw() {
  background(255);
  
  let bounds = bouncyBall.outOfBounds();

  if (bounds & XAndOrY.X && bounds & XAndOrY.Y) {
      console.log("XY");
      bouncyBall.momentum.mult(-1, -1);  
  } else if (bounds & XAndOrY.Y) {
      bouncyBall.momentum.mult(1, -1);
  } else if (bounds & XAndOrY.X) {
      bouncyBall.momentum.mult(-1, 1);
  }
  
  bouncyBall.advance();
  circle(bouncyBall.domain.x, bouncyBall.domain.y, 99);
  
}