const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'spice-garden-dhaba', 'public');
const htmlFiles = ['index.html', 'menu.html', 'about.html', 'gallery.html', 'contact.html'];

const googleFonts = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@600;700&display=swap" rel="stylesheet">`;

const metaDescription = `  <meta name="description" content="Spice Garden Dhaba - Authentic Indian Restaurant serving traditional flavors of Maharashtra.">`;

const whatsappAndBackToTop = `  <a href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20from%20Spice%20Garden%20Dhaba" target="_blank" class="whatsapp-float" title="Order on WhatsApp">
    💬
  </a>
  <button class="back-to-top" id="backToTop">↑</button>
`;

htmlFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add Google Fonts if not exists
  if (!content.includes('fonts.googleapis.com')) {
    content = content.replace('</head>', `${googleFonts}\n</head>`);
  }
  
  // Add Meta description if not exists
  if (!content.includes('meta name="description"')) {
    content = content.replace(/<meta name="viewport"[^>]+>/, `$& \n${metaDescription}`);
  }
  
  // Add WhatsApp & BackToTop before </body>
  if (!content.includes('whatsapp-float')) {
    content = content.replace('</body>', `${whatsappAndBackToTop}</body>`);
  }
  
  // Add defer to scripts
  content = content.replace(/<script src="js\/([^"]+)"><\/script>/g, '<script src="js/$1" defer></script>');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
