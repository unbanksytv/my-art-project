const p5 = require('p5');
const { createCanvas } = require('canvas');
const fs = require('fs');

for (let nftIndex = 0; nftIndex < 69; nftIndex++) {
  new p5(p => {
    let canvasWidth = 1600;
    let canvasHeight = 900;

    p.createCanvas = function(w, h) {
      p._renderer = new p.Renderer(w, h, p, false);
      p._renderer.canvas = createCanvas(w, h);
      p._renderer.drawingContext = p._renderer.canvas.getContext('2d');
      return p._renderer;
    };

    let angle = 0;
    let growth = 0;

    let colors = [
      [69, 33, 24],
      [113, 26, 29],
      [130, 79, 29],
      [59, 61, 62],
      [243, 204, 165],
      [247, 202, 24]
    ];
    
    let noiseScale = 0.02;

    p.setup = function() {
      p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
      p.pixelDensity(1);
      p.noLoop();  // Draw only one frame, then stop
    };

    p.draw = function() {
      p.background(0);
      let blockSize = 1;
      let lightIntensity = p.map(p.noise(nftIndex), 0, 1, 0, 255);  // Use Perlin noise for variation
      let zoom = p.map(p.noise(nftIndex), 0, 1, 0, 2);  // Use Perlin noise for variation

      for (let x = -canvasWidth * zoom; x < canvasWidth * zoom; x += blockSize) {
        for (let y = -canvasHeight * zoom; y < canvasHeight * zoom; y += blockSize) {
          drawLine(x, y, blockSize, lightIntensity);
        }
      }

      angle += p.noise(nftIndex) * 0.01;  // Use Perlin noise for variation
      growth += p.noise(nftIndex) * 0.01;  // Use Perlin noise for variation
      
      // Save the canvas as an image
      p.saveCanvas(`nft-${nftIndex}`, 'png');
    };

    function drawLine(x, y, size, lightIntensity) {
      p.push();
      p.rotateX(angle);
      p.rotateY(angle);

      let colorIndex = p.floor(p.random(colors.length));
      let selectedColor = colors[colorIndex];
      p.ambientLight(lightIntensity);
      p.pointLight(selectedColor[0], selectedColor[1], selectedColor[2], p.random(-p.width / 2, p.width / 2), p.random(-p.height / 2, p.height / 2), 200);

      let noiseVal = p.noise(x * noiseScale, y * noiseScale);
      p.translate(x + noiseVal * growth * 200, y + noiseVal * growth * 200);
      
      p.strokeWeight(2);
      p.stroke(selectedColor[0], selectedColor[1], selectedColor[2]);
      p.beginShape();
      p.vertex(x, y);
      p.vertex(x + size, y + size);
      p.endShape();

      p.pop();
    }

    p.keyPressed = function() {
      if (p.key === 's' || p.key === 'S') {
        // Save the canvas as an image
       
        p.saveCanvas(`nft-${nftIndex}`, 'png');
      }
    };

    // Start the sketch
    p.setup();
    p.draw();
  });
}
