const fs = require('fs');
const path = require('path');

try {
  function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFiles(fullPath));
      } else {
        if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
          results.push(fullPath);
        }
      }
    });
    return results;
  }

  const files = getFiles(path.join(__dirname, 'src'));

  const imageRegex = /['"](\/assets\/images\/[^'"]+)['"]/g;

  let missing = [];

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      const imgPath = match[1]; 
      const decodedPath = decodeURIComponent(imgPath);
      // Remove leading slash for join
      const relPath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath;
      const fullPath = path.join(__dirname, 'public', relPath);
      if (!fs.existsSync(fullPath)) {
        missing.push({ file, path: decodedPath });
      }
    }
  });

  fs.writeFileSync('results.json', JSON.stringify(missing, null, 2));
} catch(e) {
  fs.writeFileSync('results.json', JSON.stringify({error: e.message, stack: e.stack}, null, 2));
}
