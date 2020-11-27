// import React, { useRef, useEffect } from "react";
// import useWindowDimensions from "../Window";

// const Canvas = (props) => {
//   const canvasRef = useRef(null);
//   const { height, width } = useWindowDimensions();
//   const imageAdress = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

//   let isLoaded = false;
//   let glitch;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     //Our first draw
//     context.fillStyle = "#000000";
//     context.fillRect(0, 0, width, height);
//   }, []);

//   return <canvas ref={canvasRef} {...props} />;
// };

// export default Canvas;
const {
  createCanvas,
  loadImage,
  floor,
  random,
  background,
  clear,
  push,
  translate,
  height,
  image,
  pop,
  width,
} = require("canvas");
let windowW = window.innerWidth;
let windowH = window.innerHeight;
let isLoaded = false;
let glitch;
let imgSrc =
  "data:image/jpeg;base64,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";
function setup() {
  background(0);
  createCanvas(windowW, windowH);
  loadImage(imgSrc, function (img) {
    glitch = new Glitch(img);
    isLoaded = true;
  });
}

function draw() {
  clear();
  background(0);

  if (isLoaded) {
    glitch.show();
  }

  // fill(255, 255, 255);
  // textSize(14);
  // text('FPS: ' + floor(frameRate()), 20, 30);
}

class Glitch {
  constructor(img) {
    this.channelLen = 4;
    this.imgOrigin = img;
    this.imgOrigin.loadPixels();
    this.copyData = [];
    this.flowLineImgs = [];
    this.shiftLineImgs = [];
    this.shiftRGBs = [];
    this.scatImgs = [];
    this.throughFlag = true;
    this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

    // flow line
    for (let i = 0; i < 1; i++) {
      let o = {
        pixels: null,
        t1: floor(random(0, 1000)),
        speed: floor(random(4, 24)),
        randX: floor(random(24, 80)),
      };
      this.flowLineImgs.push(o);
    }

    // shift line
    for (let i = 0; i < 6; i++) {
      let o = null;
      this.shiftLineImgs.push(o);
    }

    // shift RGB
    for (let i = 0; i < 1; i++) {
      let o = null;
      this.shiftRGBs.push(o);
    }

    // scat imgs
    for (let i = 0; i < 3; i++) {
      let scatImg = {
        img: null,
        x: 0,
        y: 0,
      };
      this.scatImgs.push(scatImg);
    }
  }

  replaceData(destImg, srcPixels) {
    for (let y = 0; y < destImg.height; y++) {
      for (let x = 0; x < destImg.width; x++) {
        let r, g, b, a;
        let index;
        index = (y * destImg.width + x) * this.channelLen;
        r = index;
        g = index + 1;
        b = index + 2;
        a = index + 3;
        destImg.pixels[r] = srcPixels[r];
        destImg.pixels[g] = srcPixels[g];
        destImg.pixels[b] = srcPixels[b];
        destImg.pixels[a] = srcPixels[a];
      }
    }
    destImg.updatePixels();
  }

  flowLine(srcImg, obj) {
    let destPixels, tempY;
    destPixels = new Uint8ClampedArray(srcImg.pixels);
    obj.t1 %= srcImg.height;
    obj.t1 += obj.speed;
    //tempY = floor(noise(obj.t1) * srcImg.height);
    tempY = floor(obj.t1);
    for (let y = 0; y < srcImg.height; y++) {
      if (tempY === y) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let index;
          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          destPixels[r] = srcImg.pixels[r] + obj.randX;
          destPixels[g] = srcImg.pixels[g] + obj.randX;
          destPixels[b] = srcImg.pixels[b] + obj.randX;
          destPixels[a] = srcImg.pixels[a];
        }
      }
    }
    return destPixels;
  }

  shiftLine(srcImg) {
    let offsetX;
    let rangeMin, rangeMax;
    let destPixels;
    let rangeH;

    destPixels = new Uint8ClampedArray(srcImg.pixels);
    rangeH = srcImg.height;
    rangeMin = floor(random(0, rangeH));
    rangeMax = rangeMin + floor(random(1, rangeH - rangeMin));
    offsetX = this.channelLen * floor(random(-40, 40));

    for (let y = 0; y < srcImg.height; y++) {
      if (y > rangeMin && y < rangeMax) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let r2, g2, b2, a2;
          let index;

          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          r2 = r + offsetX;
          g2 = g + offsetX;
          b2 = b + offsetX;
          destPixels[r] = srcImg.pixels[r2];
          destPixels[g] = srcImg.pixels[g2];
          destPixels[b] = srcImg.pixels[b2];
          destPixels[a] = srcImg.pixels[a];
        }
      }
    }
    return destPixels;
  }

  shiftRGB(srcImg) {
    let randR, randG, randB;
    let destPixels;
    let range;

    range = 16;
    destPixels = new Uint8ClampedArray(srcImg.pixels);
    randR =
      (floor(random(-range, range)) * srcImg.width +
        floor(random(-range, range))) *
      this.channelLen;
    randG =
      (floor(random(-range, range)) * srcImg.width +
        floor(random(-range, range))) *
      this.channelLen;
    randB =
      (floor(random(-range, range)) * srcImg.width +
        floor(random(-range, range))) *
      this.channelLen;

    for (let y = 0; y < srcImg.height; y++) {
      for (let x = 0; x < srcImg.width; x++) {
        let r, g, b, a;
        let r2, g2, b2, a2;
        let index;

        index = (y * srcImg.width + x) * this.channelLen;
        r = index;
        g = index + 1;
        b = index + 2;
        a = index + 3;
        r2 = (r + randR) % srcImg.pixels.length;
        g2 = (g + randG) % srcImg.pixels.length;
        b2 = (b + randB) % srcImg.pixels.length;
        destPixels[r] = srcImg.pixels[r2];
        destPixels[g] = srcImg.pixels[g2];
        destPixels[b] = srcImg.pixels[b2];
        destPixels[a] = srcImg.pixels[a];
      }
    }

    return destPixels;
  }

  getRandomRectImg(srcImg) {
    let startX;
    let startY;
    let rectW;
    let rectH;
    let destImg;
    startX = floor(random(0, srcImg.width - 30));
    startY = floor(random(0, srcImg.height - 50));
    rectW = floor(random(30, srcImg.width - startX));
    rectH = floor(random(1, 50));
    destImg = srcImg.get(startX, startY, rectW, rectH);
    destImg.loadPixels();
    return destImg;
  }

  show() {
    // restore the original state
    this.replaceData(this.imgOrigin, this.copyData);

    // sometimes pass without effect processing
    let n = floor(random(100));
    if (n > 75 && this.throughFlag) {
      this.throughFlag = false;
      setTimeout(() => {
        this.throughFlag = true;
      }, floor(random(40, 400)));
    }
    if (!this.throughFlag) {
      push();
      translate(
        (width - this.imgOrigin.width) / 2,
        (height - this.imgOrigin.height) / 2
      );
      image(this.imgOrigin, 0, 0);
      pop();
      return;
    }

    // flow line
    this.flowLineImgs.forEach((v, i, arr) => {
      arr[i].pixels = this.flowLine(this.imgOrigin, v);
      if (arr[i].pixels) {
        this.replaceData(this.imgOrigin, arr[i].pixels);
      }
    });

    // shift line
    this.shiftLineImgs.forEach((v, i, arr) => {
      if (floor(random(100)) > 50) {
        arr[i] = this.shiftLine(this.imgOrigin);
        this.replaceData(this.imgOrigin, arr[i]);
      } else {
        if (arr[i]) {
          this.replaceData(this.imgOrigin, arr[i]);
        }
      }
    });

    // shift rgb
    this.shiftRGBs.forEach((v, i, arr) => {
      if (floor(random(100)) > 65) {
        arr[i] = this.shiftRGB(this.imgOrigin);
        this.replaceData(this.imgOrigin, arr[i]);
      }
    });

    push();
    translate(
      (width - this.imgOrigin.width) / 2,
      (height - this.imgOrigin.height) / 2
    );
    image(this.imgOrigin, 0, 0);
    pop();

    // scat image
    this.scatImgs.forEach((obj) => {
      push();
      translate(
        (width - this.imgOrigin.width) / 2,
        (height - this.imgOrigin.height) / 2
      );
      if (floor(random(100)) > 80) {
        obj.x = floor(
          random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7)
        );
        obj.y = floor(
          random(-this.imgOrigin.height * 0.1, this.imgOrigin.height)
        );
        obj.img = this.getRandomRectImg(this.imgOrigin);
      }
      if (obj.img) {
        image(obj.img, obj.x, obj.y);
      }
      pop();
    });
  }
}
