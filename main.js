let paint,
  rect,
  color,
  fill,
  stroke,
  strokeWeight,
  noFill,
  noStroke,
  ellipse,
  line,
  beginShape,
  endShape,
  vertex,
  bezierVertex,
  curveVertex,
  quad,
  triangle,
  ctx,
  setCanvas,
  textFont,
  textSize,
  textAlign,
  text,
  scale,
  rotate, 
  translate, 
  pushMatrix, 
  popMatrix,
  background,
  get,
  sin,
  cos,
  tan,
  log,
  pow,
  sqrt,
  lerp,
  dist,
  atan2,
  random,
  abs,
  width,
  height,
  frameCount,
  raf,
  constrain


let programData = {
  arr: [],
  text: {
    font: 'Arial',
    size: ''
  }
}

raf = (x) => {
  requestAnimationFrame(x);
}

cos = (ang) => Math.cos(ang)
sin = (ang) => Math.sin(ang)
tan = (num) => Math.tan(num)
pow = (num) => Math.pow(num)
sqrt = (num) => Math.sqrt(num)
log = (num) => Math.log(num)
atan2 = (y, x) => Math.atan2(y,x) * 180 / Math.PI
random = (min, max) => Math.random() * (max - min) + min
abs = (n) => n < 0 ? -n : n

lerp = (num1, num2, amt) => num1 + ((num2 - num1) * amt)
dist = (x1, y1, x2, y2) => Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2))
constrain = (num, min, max) => Math.max(Math.min(num, max), min)

setCanvas = (...args) => {

  const [canvas, xtc, w, h] = args

  ctx = xtc
  ctx.tabIndex = 1

  switch (args.length) {
    case 3:
      canvas.width = w;
      canvas.height = window.innerHeight;      
    break;
    case 4:
      canvas.width = w;
      canvas.height = h;
    break;
    default:
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;  
    break;    
    }

  width = canvas.width
  height = canvas.height

}
paint = () => {
  ctx.fill()
  ctx.stroke()
}
color = (...args) => {

  const [r, g, b, a] = args

  switch (args.length) {
    case 1:
      return `rgba(${r}, ${r}, ${r}, 255)`
      break
    case 2:
      return `rgba(${r}, ${r}, ${r}, ${g / 255})`
    case 3:
      return `rgba(${r}, ${g}, ${b}, 255)`
    case 4:
      return `rgba(${r}, ${g}, ${b}, ${a / 255})`
  }
}
fill = (...args) => {
  ctx.fillStyle = color(...args)
}
stroke = (...args) => {
  ctx.strokeStyle = color(...args)
}
strokeWeight = (w) => {
  ctx.lineWidth = w
}
noFill = () => {
  ctx.fillStyle = color(0, 0)
}
noStroke = () => {
  ctx.strokeStyle = color(0, 0)
}
rect = (...args) => {
  ctx.beginPath()
  ctx.roundRect(...args)
  ctx.closePath()
  paint()
}
background = (...args) => {
  ctx.save();
  fill(...args)
  ctx.fillRect(0, 0, width, height)
  ctx.restore();
}
ellipse = (x, y, w, h) => {
  ctx.beginPath()
  ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
}
line = (x, y, x2, y2) => {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x2, y2)
  ctx.closePath()
  paint()
}
beginShape = () => {
  programData.arr = []
}
vertex = (x, y) => {
  programData.arr.push([x, y])
}
bezierVertex = (cx, cy, cx2, cy2, x, y) => {
  programData.arr.push([cx, cy, cx2, cy2, x, y])
}
curveVertex = (cx, cy, x, y) => {
  programData.arr.push([cx, cy, x, y])
}
endShape = () => {
  ctx.beginPath()
  ctx.moveTo(programData.arr[0][0], programData.arr[0][1])
  for (let i = 1; i < programData.arr.length; i++) {
    switch (programData.arr[i].length) {
      case 2:
        ctx.lineTo(programData.arr[i][0], programData.arr[i][1]);
        break
      case 4:
        ctx.quadraticCurveTo(
          programData.arr[i][0],
          programData.arr[i][1],
          programData.arr[i][2],
          programData.arr[i][3]
        );
        break
      case 6:
        ctx.bezierCurveTo(
          programData.arr[i][0],
          programData.arr[i][1],
          programData.arr[i][2],
          programData.arr[i][3],
          programData.arr[i][4],
          programData.arr[i][5]
        );
        break
    }
  }
  ctx.closePath()
  paint()
}
quad = (x, y, x1, y1, x2, y2, x3, y3) => {
  beginShape()
  vertex(x, y)
  vertex(x1, y1)
  vertex(x2, y2)
  vertex(x3, y3)
  endShape()
  paint()
}
triangle = (x, y, x1, y1, x2, y2) => {
  beginShape()
  vertex(x, y)
  vertex(x1, y1)
  vertex(x2, y2)
  endShape()
  paint()
}

textFont = (font) => {
  programData.text.font = font
}
textSize = (size) => {
  programData.text.size = size
}
textAlign = (align,baseline) => {
  programData.text.align = align
  programData.text.baseline = baseline
}

text = (message, x, y) => {

  ctx.textAlign = programData.text.align;
  ctx.textBaseline = programData.text.baseline;
  ctx.font = `${programData.text.size}px ${programData.text.font}`

  ctx.fillText(message, x, y)
}

scale = (x, y) => {
  ctx.scale(x, y)
}

rotate = (r) => {
  ctx.rotate(Math.PI / 180 * r);
}

translate = (x, y) => {
  ctx.translate(x, y)
}

pushMatrix = () => {
  ctx.save();
}

popMatrix = () => {
  ctx.restore();
}

get = (x, y, w, h) => {
  ctx.getImageData(x, y, w, h);
}

/*********************/

let lastLoop, fps;
let getImage, image, loadImage, clear;

let col = {
  c_c: (c,c2) => {
    return Math.pow(c.x - c2.x,2) + Math.pow(c.y - c2.y,2) <= Math.pow(c.r + c2.r,2);
  },
  c_c_phx: (c,c2) => {
        // buffer = 0.1
        c.x = c2.x + (c.r + c2.r + 0.1) * (c.x - c2.x) / dist(c.x,c.y,c2.x,c2.y);
        c.y = c2.y + (c.r + c2.r + 0.1) * (c.y - c2.y) / dist(c.x,c.y,c2.x,c2.y);
  }
};

class Event {
	constructor(id) {
  	this.id = id;
  }
  listener(type,e,option) {
  	this.id.addEventListener(type, e, option);
  }
  keyPress(x) {
    this.listener("keydown", (e) => {
      e.preventDefault();
      x[e.keyCode] = true;  
    },false);
   
    this.listener("keyup", (e) => {
        e.preventDefault();
        x[e.keyCode] = false;  
    }, false);
  }
  getMouse(x) {
    this.listener("mousemove", (e) => {
      x.x = e.clientX;
      x.y = e.clientY;
    });    
    this.listener("mousedown", (e) => {
      x.pressed = true;
    });    
    this.listener("mouseup", (e) => {
      x.pressed = false;
    });    
  }
}

fps = () => { 
    var thisLoop = Date.now();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    return fps;
}

clear = () => {
  ctx.clearRect(0,0,width,height);
}

getImage = (x,y,w,h) => {
    const imageCanvas = new OffscreenCanvas(w, h)
    const context = imageCanvas.getContext("2d")
    context.putImageData(ctx.getImageData(x, y, w, h), 0, 0)
    return imageCanvas
}

loadImage = (func,i) => {
    clear()
    func[i].draw()
    func[i] = getImage(func[i].x,func[i].y,func[i].width,func[i].height)
}

image = (...args) => {
    ctx.drawImage(...args);
}
