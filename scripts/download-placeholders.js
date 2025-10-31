/**
 * Script to download placeholder images for services
 * Run with: node scripts/download-placeholders.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'design-drafting.jpg',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&h=1200&fit=crop',
    description: 'CAD workstation with engineering drawings'
  },
  {
    name: 'fabrication.jpg',
    url: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=1600&h=1200&fit=crop',
    description: 'CNC laser cutting machine in modern facility'
  },
  {
    name: 'powder-coating.jpg',
    url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&h=1200&fit=crop',
    description: 'Industrial powder coating process'
  },
  {
    name: 'assembly-wiring.jpg',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&h=1200&fit=crop',
    description: 'Electrical wiring and component assembly'
  },
  {
    name: 'testing.jpg',
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=1200&fit=crop',
    description: 'Quality testing equipment and instruments'
  },
  {
    name: 'delivery.jpg',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=1200&fit=crop',
    description: 'Professional delivery truck and logistics'
  },
  // Gallery images
  {
    name: 'design-1.jpg',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=1600&h=1200&fit=crop',
    description: 'CAD software interface'
  },
  {
    name: 'design-2.jpg',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=1200&fit=crop',
    description: 'Technical blueprints'
  },
  {
    name: 'design-3.jpg',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=1200&fit=crop',
    description: '3D modeling workspace'
  },
  {
    name: 'design-4.jpg',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1200&fit=crop',
    description: 'Engineering team review'
  },
  {
    name: 'fab-1.jpg',
    url: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=1600&h=1200&fit=crop',
    description: 'CNC laser cutting in action'
  },
  {
    name: 'fab-2.jpg',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=1200&fit=crop',
    description: 'Press brake metal bending'
  },
  {
    name: 'fab-3.jpg',
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&h=1200&fit=crop',
    description: 'Welding process'
  },
  {
    name: 'fab-4.jpg',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&h=1200&fit=crop',
    description: 'Quality inspection'
  },
  {
    name: 'powder-1.jpg',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=1200&fit=crop',
    description: 'Surface preparation'
  },
  {
    name: 'powder-2.jpg',
    url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&h=1200&fit=crop',
    description: 'Powder application booth'
  },
  {
    name: 'powder-3.jpg',
    url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1600&h=1200&fit=crop',
    description: 'Industrial curing oven'
  },
  {
    name: 'powder-4.jpg',
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=1200&fit=crop',
    description: 'Colorful finished products'
  },
  {
    name: 'assembly-1.jpg',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&h=1200&fit=crop',
    description: 'Busbar installation'
  },
  {
    name: 'assembly-2.jpg',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=1200&fit=crop',
    description: 'Component mounting'
  },
  {
    name: 'assembly-3.jpg',
    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&h=1200&fit=crop',
    description: 'Cable routing'
  },
  {
    name: 'assembly-4.jpg',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&h=1200&fit=crop',
    description: 'Completed switchboard'
  },
  {
    name: 'testing-1.jpg',
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=1200&fit=crop',
    description: 'Testing instruments'
  },
  {
    name: 'testing-2.jpg',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=1200&fit=crop',
    description: 'High voltage equipment'
  },
  {
    name: 'testing-3.jpg',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&h=1200&fit=crop',
    description: 'IP rating verification'
  },
  {
    name: 'testing-4.jpg',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=1200&fit=crop',
    description: 'Test documentation'
  },
  {
    name: 'delivery-1.jpg',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&h=1200&fit=crop',
    description: 'Professional packaging'
  },
  {
    name: 'delivery-2.jpg',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=1200&fit=crop',
    description: 'Loading delivery truck'
  },
  {
    name: 'delivery-3.jpg',
    url: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=1600&h=1200&fit=crop',
    description: 'On-site delivery'
  },
  {
    name: 'delivery-4.jpg',
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=1200&fit=crop',
    description: 'Installation support'
  }
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'services');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('📥 Downloading placeholder images...\n');

let completed = 0;
const total = images.length;

images.forEach((image, index) => {
  const filePath = path.join(outputDir, image.name);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${image.name} (already exists)`);
    completed++;
    if (completed === total) {
      console.log('\n✅ All images processed!');
    }
    return;
  }

  const file = fs.createWriteStream(filePath);
  
  https.get(image.url, (response) => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      completed++;
      console.log(`✓ Downloaded ${image.name} - ${image.description}`);
      
      if (completed === total) {
        console.log('\n✅ All images downloaded successfully!');
        console.log(`📁 Images saved to: ${outputDir}`);
      }
    });
  }).on('error', (err) => {
    fs.unlink(filePath, () => {});
    console.error(`✗ Error downloading ${image.name}: ${err.message}`);
    completed++;
    
    if (completed === total) {
      console.log('\n⚠️  Download completed with some errors.');
    }
  });
});

