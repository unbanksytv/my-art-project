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

// Generate NFTs
for (let i = 0; i < NFT_COUNT; i++) {
  new p5(sketch => {
    sketch.setup = () => {
      const canvasWidth = 800;
      const canvasHeight = 800;
      sketch.createCanvas(canvasWidth, canvasHeight);
      sketch.background(0);
    };

    sketch.draw = () => {
      // Generate your artwork here
      // Example: drawing a random rectangle
      const x = sketch.random(sketch.width);
      const y = sketch.random(sketch.height);
      const size = sketch.random(50, 200);
      const color = sketch.color(
        sketch.random(255),
        sketch.random(255),
        sketch.random(255)
      );

      sketch.fill(color);
      sketch.noStroke();
      sketch.rect(x, y, size, size);

      // Save the canvas as an image
      const fileName = `nft-${i}.png`;
      const outputPath = `${OUTPUT_FOLDER}/${fileName}`;
      const stream = sketch.canvas.createPNGStream();
      const out = fs.createWriteStream(outputPath);
      stream.pipe(out);

      // Generate and save metadata
      const metadata = {
        name: `NFT ${i}`,
        description: 'A unique generative art NFT',
        edition: `Edition ${i}`,
        artist: 'Your Name',
        // Add more metadata attributes as needed
      };
      const metadataFileName = `metadata-${i}.json`;
      const metadataOutputPath = `${METADATA_FOLDER}/${metadataFileName}`;
      fs.writeFileSync(metadataOutputPath, JSON.stringify(metadata, null, 2));

      sketch.noLoop(); // Stop the sketch after generating a single NFT
    };
  });
}
