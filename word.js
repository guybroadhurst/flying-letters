let easing = t => t*t*t

class Word {
  constructor(x, y, text) {
    let randomAngle = random(-0.25 * PI, 0.25 * PI)
    this.mass = 0.25 + random(0, 0.5)

    this.position = createVector(x, y)
    this.speed = createVector(0, -10)
    this.speed = this.speed.rotate(randomAngle)
    this.acc = createVector(0, this.mass)

    this.friction = 0.98
    this.elastic = 0.8
    this.time = 0

    this.text = text
  }

  move() {
    this.speed = this.speed.add(this.acc)
    this.speed = this.speed.mult(this.friction)
    this.position = this.position.add(this.speed)

    if (this.position.y > windowHeight) {
      this.speed.y = this.speed.y * -1 * this.elastic
    }

    this.position.y = constrain(this.position.y, -1000, windowHeight)

    this.time = this.time + 0.005
  }

  draw() {
    this.move()

    let alpha = 255 - 255 * easing(this.time)

    noStroke()
    fill(255, 255, 255, alpha)
    textSize(128)
    textFont("Inconsolata")
    textAlign(CENTER, BASELINE)
    text(this.text, this.position.x, this.position.y)
  }
}