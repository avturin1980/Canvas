"use strict"

let ss = {
  ctx: null,
  canvas: null,
  w: window.innerWidth,
  h: window.innerHeight,
  xS: undefined,
  yS: undefined,
  xM: undefined,
  yM: undefined,
  angle: 180,
  angleInc: 0.05,
  grd: null,
  alphaChannel: 0.1,
  gradInRad: Math.PI / 180,
  timerId: undefined,

  init() {
    this.canvas = document.getElementById('canvas1')
    this.canvas.width = this.w
    this.canvas.height = this.h
    this.ctx = this.canvas.getContext('2d')
  },

  LinearGradient(){
    this.grd = this.ctx.createLinearGradient(0, 0, 0, this.h)
    this.grd.addColorStop(0,    "rgba(0,4,85,"+this.alphaChannel+")" )
    this.grd.addColorStop(0.7,  "rgba(0,0,0,"+this.alphaChannel+")")
    this.grd.addColorStop(0.95, "rgba(17,0,36,"+this.alphaChannel+")")
    this.grd.addColorStop(1,    "rgba(0,0,0,"+this.alphaChannel+")")
    this.ctx.fillStyle = this.grd
    this.ctx.fillRect(0, 0, this.w, this.h)
  },

  sunMun(xCoord, yCoord, r, colour){
    this.ctx.beginPath()
    this.ctx.fillStyle = colour
    this.ctx.arc(xCoord, yCoord, r, 0, 2 * Math.PI)
    this.ctx.shadowOffsetX = 0
    this.ctx.shadowOffsetY = 0
    this.ctx.shadowBlur = 100
    this.ctx.shadowColor = colour
    this.ctx.fill()
    this.ctx.closePath()
  }, 

  sunMunPosition(phi){  
    this.xS = this.w * (0.3 + 0.7 * Math.cos(phi * this.gradInRad))
    this.yS = this.h * (1.2 + Math.sin(phi * this.gradInRad))
    this.xM = this.w * (0.4 + 0.7 * Math.cos((phi - 180) * this.gradInRad))
    this.yM = this.h * (1.2 + Math.sin((phi - 180) * this.gradInRad))
  },

  sunriseSunset(){
    this.canvas.width = this.canvas.width
    ss.sunMunPosition(this.angle)
    if (this.yS <= this.h) { 
      this.alphaChannel = this.yS/this.h 
    } else { 
      this.alphaChannel = (1 - 10/this.yM) 
    }
    ss.LinearGradient()
    ss.sunMun(this.xS, this.yS, this.w/15 + this.yS/20, "yellow")
    ss.sunMun(this.xM, this.yM, this.w/30 + this.yM/20,  "white")
    this.angle +=this.angleInc
  }
}

window.addEventListener('load', () => {
  ss.init()
  ss.timerId = setInterval(() => ss.sunriseSunset(), 5)
})

document.addEventListener("click", function(e) {
  setTimeout(() => { 
    clearInterval(ss.timerId) 
    alert('stop') 
  }, 5)
})



