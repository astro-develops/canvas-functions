let lastLoop, fps;
let getImage, image, loadImage;

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
      x[e.key] = true;  
    },false);
   
    this.listener("keyup", (e) => {
        e.preventDefault();
        x[e.key] = false;  
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
