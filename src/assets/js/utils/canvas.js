// #CANVAS

// #EXPORTS

    // --CLEAR
    export function canvas_clear(width, height) { this.clearRect(0, 0, width, height ?? width) }

    // --DRAW
    export function canvas_drawCircle(x, y, r)
    {
        this.beginPath()
        this.arc(x, y, r, 0, CANVAS_PIx2)
        this.fill()
        this.closePath()
    }

    export function canvas_drawTriangle(x, y, w, h, s)
    {
        this.beginPath()
        this.moveTo(x - w / 2, y)
        this.lineTo(s, y - h)
        this.lineTo(x + w / 2, y)
        this.fill()
        this.stroke()
        this.closePath()
    }

    export function canvas_drawEllipse(a, b, x, y)
    {
        this.beginPath()
        this.ellipse(x, y, a, b + 60, 0, 0, CANVAS_PIx2)
        this.fill()
        this.closePath()
    }

// #IMPORT

    // --JS
    import MATH from './math'

// #CONSTANTE

    // --ELEMENT-CANVAS
    const CANVAS_PIx2 = MATH.PI.x2