class Vector2D {
  constructor(x, y) {
    this.x = x
  }

  // ---- 1 (both) -----

  scale1(k) {
    return new Vector2D(this.x * k, this.y * k)
  }
  scalar1(...arg) {
    if (arg[0] instanceof Vector2D) {
      return this.x * arg[0].x + this.y * arg[0].y
    }
    return this.x * arg[0] + this.y * arg[1]
  }
  projection1(...arg) {
    if (arg[0] instanceof Vector2D) {
      return arg[0].scale1(this.scalar1(arg[0]) / arg[0].scalar1(arg[0]))
    }
    const v = new Vector2D(arg[0], arg[1])
    return v.scale1(this.scalar1(v) / v.scalar1(v))
  }

  // ---- 2 (vector) -----
  scale2(k) {
    return new Vector2D(this.x * k, this.y * k)
  }

  scalar2(v) {
    return this.x * v.x + this.y * v.y
  }

  projection2(v) {
    return v.scale2(this.scalar2(v) / v.scalar2(v))
  }

  // ---- 3 (scalar) -----
  scale3(k) {
    return new Vector2D(this.x * k, this.y * k)
  }

  scalar3(x, y) {
    return this.x * x + this.y * y
  }

  projection3(x, y) {
    const v = new Vector2D(x, y)
    return v.scale3(this.scalar3(x, y) / v.scalar3(x, y))
  }
}
//---- 4 (winner!) -----
function scale4(x, y, k) {
  return [x * k, y * k]
}

function scalar4(x1, y1, x2, y2) {
  return x1 * x2 + y1 * y2
}

function projection4(x1, y1, x2, y2) {
  return scale4(x2, y2, scalar4(x1, y1, x2, y2) / scalar4(x2, y2, x1, y1))
}
// ---- 5 -----
function scale5(v, k) {
  return [v[0] * k, v[1] * k]
}

function scalar5(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1]
}

function projection5(v1, v2) {
  return scale5(v2, scalar5(v1, v2) / scalar5(v2, v1))
}

function test() {
   const times = 10_000_000
  setTimeout(() => {
     const v1 = [1,2]
     const v2 = [3,4]
    const t0 = performance.now()
    for (let i = 0; i < times; i++) {
      var v = projection5(v1,v2)
    }
    const t1 = performance.now()
    console.log(`projection5 (raw arr func) took ${t1 - t0} milliseconds.`)
  }, 0)
  setTimeout(() => {
    const t04 = performance.now()
    for (let i = 0; i < times; i++) {
      var v = projection4(1, 2, 3, 4)
    }
    const t14 = performance.now()
    console.log(`projection4 (raw func) took ${t14 - t04} milliseconds.`)
  }, 0)
  const v131 = new Vector2D(1, 2)
  const v132 = new Vector2D(3, 4)
  setTimeout(() => {
    const t03 = performance.now()
    for (let i = 0; i < times; i++) {
      var v = v131.projection3(3, 4)
    }
    const t13 = performance.now()
    console.log(`projection3 (scalar) took ${t13 - t03} milliseconds.`)
  }, 0)
  setTimeout(() => {
    const t02 = performance.now()
    for (let i = 0; i < times; i++) {
      var v = v131.projection2(v132)
    }
    const t12 = performance.now()
    console.log(`projection2 (vector) took ${t12 - t02} milliseconds.`)
  }, 0)
  setTimeout(() => {
    const t01 = performance.now()
    for (let i = 0; i < times; i++) {
      var v = v131.projection1(3, 4)
    }
    const t11 = performance.now()
    console.log(`projection1 (both scalar) took ${t11 - t01} milliseconds.`)
  }, 0)
  setTimeout(() => {
    const t012 = performance.now()
    for (let i = 0; i < times; i++) {
      var v = v131.projection1(v132)
    }
    const t112 = performance.now()
    console.log(`projection1 (both vector) took ${t112 - t012} milliseconds.`)
  }, 0)

}


function test2(){
   const times = 100_000_000
   console.log(`2x cos + 2x sin VS sqrt, atan2, cos, sin`)
   setTimeout(() => {
      const angle = 1.6, x = 25, y = 40;
      const t0 = performance.now()
      for (let i = 0; i < times; i++) {
         var nx = (x * Math.cos(angle)) - (y * Math.sin(angle));
         var ny = (x * Math.sin(angle)) + (y * Math.cos(angle));
   
      }
      const t1 = performance.now()
      console.log(`2x cos + 2x sin: took ${t1 - t0} milliseconds.`)
    }, 0)
   setTimeout(() => {
      const angle = 1.6, x = 25, y = 40;
      const t0 = performance.now()
      for (let i = 0; i < times; i++) {
         const length = Math.sqrt(x * x + y * y)
         const currentAngle = Math.atan2(y, x)
         const nx = Math.cos(angle) * length
         const ny = Math.sin(angle) * length
      }
      const t1 = performance.now()
      console.log(`sqrt, atan2, cos, sin: took ${t1 - t0} milliseconds.`)
    }, 0)
}

function test3(){
   const times = 100_000_000
   console.log(`cos VS sin VS sqrt VS atan2`)
   setTimeout(() => {
      const angle = 1.6, x = 25, y = 40;
      const t0 = performance.now()
      for (let i = 0; i < times; i++) {
         var nx = Math.cos(angle)
      }
      const t1 = performance.now()
      console.log(`cos: took ${t1 - t0} milliseconds.`)
    }, 0)
   setTimeout(() => {
      const angle = 1.6, x = 25, y = 40;
      const t0 = performance.now()
      for (let i = 0; i < times; i++) {
         const ny = Math.sin(angle)
      }
      const t1 = performance.now()
      console.log(`sin: took ${t1 - t0} milliseconds.`)
    }, 0)
   setTimeout(() => {
      const angle = 1.6, x = 25, y = 40;
      const t0 = performance.now()
      for (let i = 0; i < times; i++) {
         const currentAngle = Math.atan2(y, x)
      }
      const t1 = performance.now()
      console.log(`atan2: took ${t1 - t0} milliseconds.`)
    }, 0)
   setTimeout(() => {
      const angle = 1.6, x = 25, y = 40;
      const t0 = performance.now()
      for (let i = 0; i < times; i++) {
         const length = Math.sqrt(x * x + y * y)
      }
      const t1 = performance.now()
      console.log(`sqrt: took ${t1 - t0} milliseconds.`)
    }, 0)
}

const distanceX = function (x, y, vecX, vecY) {
   return x - vecX;
};
const distanceY = function (x, y, vecX, vecY) {
   return y - vecY;
};
const distanceSq = function (x,y, vecX, vecY) {
   var dx = distanceX(x,y, vecX, vecY), dy = distanceY(x, y, vecX, vecY);
   return dx * dx + dy * dy;
};
const distanceSq2 = function (x,y, vecX, vecY) {
   var dx = x - vecX, dy = y - vecY;
   return dx * dx + dy * dy;
};

function test4(){
   const times = 100_000_000
   console.log(`Ref method VS direct math`)

   setTimeout(() => {
      const x = 25, y = 40, vx = 25, vy = 40;
      const t0 = performance.now()
      for (let i = 0; i < times; i++) {
         const length = distanceSq(x, y, vx, vy)
      }
      const t1 = performance.now()
      console.log(`ref: took ${t1 - t0} milliseconds.`)
   }, 0)
   setTimeout(() => {
      const x = 25, y = 40, vx = 25, vy = 40;
      const t0 = performance.now()
      for (let i = 0; i < times; i++) {
         const length = distanceSq2(x, y, vx, vy)
      }
      const t1 = performance.now()
      console.log(`math: took ${t1 - t0} milliseconds.`)
    }, 0)

}

class test5_vec  {
   x
   y
   constructor(_x,_y){
      this.x = _x;
      this.y = _y;
   }
 invert (){
      this.x = -this.x
      this.y = -this.y
      return this
    }
    invertImmutable  () {
      return new test5_vec(-this.x, -this.y)
    }
}

function test5(){
   setTimeout(() => {
      const times = 1_000_000
      console.log(`Start test 5 (mutable vector VS immutable vector)`)
      let v = new test5_vec(20, 20);
      console.log(`immutable vector:`)
      let t0 = performance.now()
      for (let i = 0; i < times; i++) {
         v = v.invertImmutable()
      }
      let t1 = performance.now()
      console.log(`took ${t1 - t0} milliseconds.`)
      console.log(`mutable vector:`)
      t0 = performance.now()
      for (let i = 0; i < times; i++) {
         v.invert()
      }
      t1 = performance.now()
      console.log(`took ${t1 - t0} milliseconds.`)
    }, 0)
}


function test6_distToVariable(vec1, vec2) {
   let x = vec2.x - vec1.x
   let y = vec2.y - vec1.y
   return Math.sqrt(x * x + y * y)
   }
function test6_distTo(vec1, vec2) {
   return Math.sqrt(vec2.x - vec1.x * vec2.x - vec1.x + vec2.y - vec1.y * vec2.y - vec1.y)
 }

function test6(){
   setTimeout(() => {
      const times = 100_000_000
      console.log(`Dist:`)
      let v = {x:20,y: 20}
      let v2 = {x:40,y:40}
      console.log(`variables:`)
      let t0 = performance.now()
      for (let i = 0; i < times; i++) {
         const l = test6_distToVariable(v, v2)
      }
      let t1 = performance.now()
      console.log(`took ${t1 - t0} milliseconds.`)
      console.log(`no variable:`)
      t0 = performance.now()
      for (let i = 0; i < times; i++) {
         const l = test6_distTo(v, v2)
      }
      t1 = performance.now()
      console.log(`took ${t1 - t0} milliseconds.`)
    }, 0)
}