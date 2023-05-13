const { createCanvas } = require('canvas');
const fs = require('fs');
const p5 = require('p5');

const NFT_COUNT = 69; // Number of NFTs in the series
const OUTPUT_FOLDER = 'nfts'; // Folder to store the generated NFTs
const METADATA_FOLDER = 'metadata'; // Folder to store the metadata

// Create the output and metadata folders if they don't exist
if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER);
}

if (!fs.existsSync(METADATA_FOLDER)) {
  fs.mkdirSync(METADATA_FOLDER);
}

for (let i = 0; i < NFT_COUNT; i++) {
  new p5(p => {
    const canvasWidth = 800;
    const canvasHeight = 800;

    p.setup = function () {
      const canvas = createCanvas(canvasWidth, canvasHeight);
      canvas.parent('canvas-container'); // Replace 'canvas-container' with the ID of your HTML container
    };

    p.draw = function () {
      p.background(0);
      
      const numShapes = 50;
      
      for (let i = 0; i < numShapes; i++) {
        const shapeSize = p.random(50, 200);
        const x = p.random(canvasWidth);
        const y = p.random(canvasHeight);
        const color = p.color(p.random(255), p.random(255), p.random(255));
        
        p.fill(color);
        p.noStroke();
        p.rect(x, y, shapeSize, shapeSize);
      }
    
      // Save the canvas as an image
      const fileName = `nft-${i}.png`;
      const outputPath = `${OUTPUT_FOLDER}/${fileName}`;
      const stream = canvas.createPNGStream();
      const out = fs.createWriteStream(outputPath);
      stream.pipe(out);
    
      // Generate and save metadata
      const metadata = {
        title: `NFT ${i}`,
        description: 'A unique generative art NFT',
        edition: `Edition ${i}`,
        artist: 'Your Name',
        // Add more metadata attributes as needed
      };
      const metadataFileName = `metadata-${i}.json`;
      const metadataOutputPath = `${METADATA_FOLDER}/${metadataFileName}`;
      fs.writeFileSync(metadataOutputPath, JSON.stringify(metadata, null, 2));
    };    

      // Save the canvas as an image
      const fileName = `nft-${i}.png`;
      const outputPath = `${OUTPUT_FOLDER}/${fileName}`;
      const stream = canvas.createPNGStream();
      const out = fs.createWriteStream(outputPath);
      stream.pipe(out);

      // Generate and save metadata
      const metadata = {
        title: `NFT ${i}`,
        description: 'A unique generative art NFT',
        edition: `Edition ${i}`,
        artist: 'Your Name',
        // Add more metadata attributes as needed
      };
      const metadataFileName = `metadata-${i}.json`;
      const metadataOutputPath = `${METADATA_FOLDER}/${metadataFileName}`;
      fs.writeFileSync(metadataOutputPath, JSON.stringify(metadata, null, 2));
    };
  });
}
