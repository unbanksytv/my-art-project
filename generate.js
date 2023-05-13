const p5 = require('p5');
const { createCanvas } = require('canvas');
const fs = require('fs');

const NFT_COUNT = 69; // Number of NFTs in the series

for (let nftIndex = 0; nftIndex < NFT_COUNT; nftIndex++) {
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

    let metadata = {
      title: `NFT ${nftIndex}`,
      description: 'A unique generative art NFT',
      edition: `Edition ${nftIndex + 1}`,
      artist: 'Your Name',
      // Add more metadata attributes as needed
    };

    p.setup = function() {
      p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
      p.pixelDensity(1);
      p.noLoop();  // Draw only one frame, then stop
    };

    p.draw = function() {
      p.background(0);
      let blockSize = 1;
      let lightIntensity = p.map(p.noise(nftIndex), 0, 1, 0, 255);
      let zoom = p.map(p.noise(nftIndex), 0, 1, 0, 2);

      for (let x = -canvasWidth * zoom; x < canvasWidth * zoom; x += blockSize) {
        for (let y = -canvasHeight * zoom; y < canvasHeight * zoom; y += blockSize) {
          drawLine(x, y, blockSize, lightIntensity);
        }
      }

      angle += p.noise(nftIndex) * 0.01;
      growth += p.noise(nftIndex) * 0.01;
      
      // Save the canvas as an image
      p.saveCanvas(`nft-${nftIndex}`, 'png');

      // Generate metadata JSON
      generateMetadata();
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
      p
      p.vertex(x + size, y + size);
      p.endShape();

      p.pop();
    }

    function generateMetadata() {
      const metadataFolderPath = 'metadata'; // Folder to store metadata files
      const metadataFileName = `metadata-${nftIndex}.json`; // Metadata file name

      // Create metadata directory if it doesn't exist
      if (!fs.existsSync(metadataFolderPath)) {
        fs.mkdirSync(metadataFolderPath);
      }

      // Generate metadata JSON
      const metadataJSON = JSON.stringify(metadata, null, 2);

      // Write metadata JSON to file
      fs.writeFileSync(`${metadataFolderPath}/${metadataFileName}`, metadataJSON);
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
const fs = require('fs');

// Specify the folder name
const folderName = 'metadata';

// Create the folder if it doesn't exist
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}
