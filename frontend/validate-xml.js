const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

// Baca file sitemap
const xmlData = fs.readFileSync('sitemap_temp.xml', 'utf8');

// Konfigurasi parser
const options = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  allowBooleanAttributes: true,
  parseTagValue: true,
  parseAttributeValue: true,
  trimValues: true,
};

const parser = new XMLParser(options);

try {
  const result = parser.parse(xmlData);
  console.log('✅ XML Valid');
  console.log('Root element:', Object.keys(result)[0]);
  
  if (result.urlset) {
    console.log('✅ urlset element found');
    console.log('Number of URLs:', result.urlset.url ? (Array.isArray(result.urlset.url) ? result.urlset.url.length : 1) : 0);
  } else {
    console.log('❌ urlset element missing');
  }
  
} catch (error) {
  console.log('❌ XML Invalid:', error.message);
  // Temukan baris yang bermasalah
  const lines = xmlData.split('\n');
  for (let i = 0; i < lines.length; i++) {
    try {
      const partialXml = lines.slice(0, i+1).join('\n');
      parser.parse(partialXml);
    } catch (lineError) {
      if (lineError.message !== error.message) {
        console.log(`Potential issue at line ${i}:`, lines[i]);
        break;
      }
    }
  }
}