const NFT_COUNT = 69; // Number of NFTs in the series
const OUTPUT_FOLDER = 'nfts'; // Folder to store the generated NFTs
const METADATA_FOLDER = 'metadata'; // Folder to store the metadata

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  
  const numShapes = 50;
  
  for (let i = 0; i < numShapes; i++) {
    const shapeSize = random(50, 200);
    const x = random(width);
    const y = random(height);
    const color = color(random(255), random(255), random(255));
    
    fill(color);
    noStroke();
    rect(x, y, shapeSize, shapeSize);
  }

  // Save the canvas as an image
  const fileName = `nft-${frameCount}.png`;
  const outputPath = `${OUTPUT_FOLDER}/${fileName}`;
  saveCanvas(outputPath, 'png');

  // Generate and save metadata
  const metadata = {
    title: `NFT ${frameCount}`,
    description: 'A unique generative art NFT',
    edition: `Edition ${frameCount}`,
    artist: 'Your Name',
    // Add more metadata attributes as needed
  };
  const metadataFileName = `metadata-${frameCount}.json`;
  const metadataOutputPath = `${METADATA_FOLDER}/${metadataFileName}`;
  saveJSON(metadata, metadataOutputPath);
}

// Run the sketch
new p5();
