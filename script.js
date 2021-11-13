(function() {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let width = canvas.width = innerWidth
    let height = canvas.height = innerHeight
    let particles = []
    let properties = {
        bgColor: 'rgba(17, 17, 19, 1)',
        particleColor: 'rgba(255, 40, 40, 1)',
        particleRadius: 3,
        particleCount: 150,
        particleMaxVelocity: 0.3,
        lineLength: 150,
        particleLife: 10
    }

    document.querySelector('body').appendChild(canvas)

    window.onresize = function() {
        width = canvas.width = innerWidth
        height = canvas.height = innerHeight
    }


    class Particle {
        constructor() {
            this.x = Math.random() * width
            this.y = Math.random() * height

            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity

            this.life = Math.random() * properties.particleLife * 60
        }

        position() {
            this.x + this.velocityX > width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX
            this.y + this.velocityY > height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY

            this.x += this.velocityX
            this.y += this.velocityY
        }

        reDraw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fillStyle = properties.particleColor
            ctx.fill()
        }

        reCalculateLife() {
            if (this.life < 1) {
                this.x = Math.random() * width
                this.y = Math.random() * height
    
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
    
                this.life = Math.random() * properties.particleLife * 60
            }
            this.life--
        }
    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor
        ctx.fillRect(0, 0, width, height)
    }

    function drawLines() {
        let x1, y1, x2, y2, length, opacity

        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x
                y1 = particles[i].y

                x2 = particles[j].x
                y2 = particles[j].y

                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

                if(length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength
                    ctx.lineWidth = '0.5'
                    ctx.strokeStyle = 'rgba(255, 40, 40, ' + opacity + ')'
                    ctx.beginPath()
                    ctx.moveTo(x1, y1)
                    ctx.lineTo(x2, y2)
                    ctx.closePath()
                    ctx.stroke()
                }
            }
        }
    }

    function reDrawParticles() {
        for (let i in particles) {
            particles[i].reCalculateLife()
            particles[i].position()
            particles[i].reDraw()
        }
    }

    function loop() {
        reDrawBackground()
        reDrawParticles()
        drawLines()
        requestAnimationFrame(loop)
    }

    function init() {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle)
        }
        loop()
    }

    init()
}())