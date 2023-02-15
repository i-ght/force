/*
**********************************************************************
** 2023 February 15
** The author disclaims copyright to this source code.  In place of
** a legal notice, here is a song:
**
** O Kali, Thou art fond of cremation grounds;
** so I have turned my heart into one
** That thou, a resident of cremation grounds,
** may dance there unceasingly.
** O Mother! I have no other fond desire in my heart;
** fire of a funeral pyre is burning there;
** O Mother! I have preserved the ashes of dead bodies all around
** that Thou may come.
** O Mother! Keeping Shiva, conqueror of Death, under Thy feet,
** Come, dancing to the tune of music;
** Prasada waits With his eyes closed
**
**********************************************************************
*/

const OptionOfXAndOrY = 
  Object.freeze({
    NONE:  0,
    X:     1,
    Y:     2
  });

class Bounds {
  static notOut(a) { return a === OptionOfXAndOrY.NONE; }
  static outX(a) { return a & OptionOfXAndOrY.X; }
  static outY(a) { return a & OptionOfXAndOrY.Y; }
  static outXY(a) { return a & OptionOfXAndOrY.X && a & OptionOfXAndOrY.Y; }
}

class Force {
  constructor(domain, momentum) {
    this.domain = domain;
    this.momentum = momentum;
  }

  reconstruct() { 
    throw new TypeError("needs definition.");
  }
  
  advance() {
    this.domain.add(this.momentum);
  }

  changeDir(dir) {
    this.momentum.mult(dir);  
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
      return OptionOfXAndOrY.X | OptionOfXAndOrY.Y;
    }
    else if (x && !y) {
      return OptionOfXAndOrY.X;
    }
    else if (y && !x) {
      return OptionOfXAndOrY.Y;
    } /*else {*/
      
    return OptionOfXAndOrY.NONE;
    
    /*}*/
  }
}

let DIR_CHANGES; 

class TwoDBouncyBall extends Force {

  constructor(domain, momentum, diameter) {
    super(domain, momentum);
    this.diameter = diameter;
  }

  reconstruct() {
    const mymy = this;
    mymy.advance();
    let xyOrNone = mymy.outOfBounds();

    if (Bounds.outXY(xyOrNone)) {
        console.log("XY");
        mymy.changeDir(
          DIR_CHANGES[OptionOfXAndOrY.X | OptionOfXAndOrY.Y]
        );  
    } else if (Bounds.outY(xyOrNone)) {
      mymy.changeDir(
          DIR_CHANGES[OptionOfXAndOrY.Y]
      );
    } else if (Bounds.outX(xyOrNone)) {
      mymy.changeDir(
          DIR_CHANGES[OptionOfXAndOrY.X]
      );
    }

    circle(
      mymy.domain.x,
      mymy.domain.y,
      mymy.diameter
    );
  }

}


function cV(x, y, z) {
  return createVector(x, y, z);
}

function constructSpeedyBouncyBall(domain) {
  const momentum =
    cV(
      PHI * 2.3,
      PHI * 1.9
    );
  
  return new TwoDBouncyBall(
      domain,
      momentum,
      66.6
  );
}

const BALLZ = 2;
const PHI = 1.618;
let bouncyBalls = [];


function setup() {
  DIR_CHANGES = 
    Object.freeze({
      [OptionOfXAndOrY.X]: cV(-1, 1),
      [OptionOfXAndOrY.Y]: cV(1, -1),
      [OptionOfXAndOrY.X | OptionOfXAndOrY.Y]: cV(-1, -1)
    });
    
  createCanvas(333 * PHI, 333);
  stroke(155, 38, 182);
  fill(155, 38, 182);

  for (let i = 0; i < BALLZ; i++) {
    bouncyBalls.push(
      constructSpeedyBouncyBall(
        cV(i*100 * PHI, i*100 * PHI)
      )
    );
  }
}

function draw() {
  background(0);
  for (let i = 0; i < BALLZ; i++) {
    let bouncyBall = bouncyBalls[i]; 
    bouncyBall.reconstruct();
  }
}